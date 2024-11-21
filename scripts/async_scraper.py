import aiohttp
import asyncio
import pymysql
import os
import random
import json
import signal
import sys
from colorama import Fore, Style
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_URL = os.getenv("BASE_URL")
LISTING_URL = f"{BASE_URL}/listing?slug=real-estate&init_page=true&page="
DETAILS_URL = f"{BASE_URL}/item/"
DATA_FOLDER = Path(os.getenv("DATA_FOLDER"))
DETAILS_FOLDER = Path(os.getenv("DETAILS_FOLDER"))
SCRAPED_FOLDER = Path(os.getenv("SCRAPED_FOLDER"))
PAGES_TO_SCRAPE = int(os.getenv("PAGES_TO_SCRAPE"))

DATA_FOLDER.mkdir(parents=True, exist_ok=True)
DETAILS_FOLDER.mkdir(parents=True, exist_ok=True)
SCRAPED_FOLDER.mkdir(parents=True, exist_ok=True)


def safe_db_execute(cursor, query, data):
    try:
        cursor.execute(query, data)
    except pymysql.MySQLError as e:
        print(f"{Fore.RED}Database execution error: {e}{Style.RESET_ALL}")


async def fetch_json(session, url):
    try:
        async with session.get(url) as response:
            if response.status == 200:
                return await response.json()
            else:
                print(
                    f"{Fore.RED}Failed to fetch {url}: {response.status}{Style.RESET_ALL}")
                return None
    except (aiohttp.ClientError, asyncio.TimeoutError) as e:
        print(f"{Fore.RED}Request error for {url}: {e}{Style.RESET_ALL}")
        return None
    except json.JSONDecodeError as e:
        print(f"{Fore.RED}JSON parse error for {url}: {e}{Style.RESET_ALL}")
        return None
    except Exception as e:
        print(f"{Fore.RED}Error fetching {url}: {e}{Style.RESET_ALL}")
        return None


async def scrape_property_details(session, advert, page):
    guid = advert["guid"]
    details_url = f"{DETAILS_URL}{guid}"
    details_data = await fetch_json(session, details_url)

    if not details_data:
        return None

    advert_data = details_data.get("advert", {})
    seller_data = details_data.get("seller", {})

    property_info = {
        "guid": guid,
        "user_phone": advert.get("user_phone"),
        "user_id": advert.get("user_id"),
        "url": advert.get("url"),
        "title": advert.get("title"),
        "status": advert.get("status"),
        "short_description": advert.get("short_description"),
        "region": advert.get("region"),
        "region_parent_name": advert.get("region_parent_name"),
        "price": advert.get("price_obj", {}).get("value"),
        "price_view": advert.get("price_obj", {}).get("view"),
        "price_display": advert.get("price_title", {}),
        "image_url": advert.get("image_obj", {}).get("url"),

        "date_created": advert_data.get("date_created"),
        "date_edited": advert_data.get("date_edited"),
        "date_moderated": advert_data.get("date_moderated"),
        "description": advert_data.get("description"),
        "is_active": advert_data.get("is_active"),
        "is_closed": advert_data.get("is_closed"),

        "property_type": advert_data.get("category_name"),
        "size": next((attr.get("value") for attr in advert_data.get("attrs", []) if attr.get("name") == "Square Metres"), None),
        "property_condition": next((attr.get("value") for attr in advert_data.get("attrs", []) if attr.get("name") == "Condition"), None),

        "attrs": [{"name": attr.get("name"), "value": attr.get("value"), "data_type": attr.get("data_type"), "group_type": attr.get("group_type")} for attr in advert_data.get("attrs", [])],

        "seller_name": seller_data.get("name"),
        "seller_status": seller_data.get("status"),
        "seller_last_seen": seller_data.get("last_seen"),
        "images": [{"id": img.get("id"), "url": img.get("url"), "is_main": img.get("is_main"), "width": img.get("width"), "height": img.get("height")} for img in advert_data.get("images", [])]
    }

    with open(DETAILS_FOLDER / f"page_{page}_{guid}_details.json", "w", encoding="utf-8") as f:
        json.dump(details_data, f, ensure_ascii=False, indent=4)
        print(f"{Fore.GREEN}Details saved to {f.name}{Style.RESET_ALL}", end='\t')

    return property_info


def save_to_db(properties, db_conn):
    try:
        with db_conn.cursor() as cursor:
            try:
                cursor.execute("""
                    INSERT INTO users (user_id, user_password, user_phone, seller_name, seller_status, seller_last_seen)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (
                    properties["user_id"],
                    str(random.randint(10000000, 99999999)),
                    properties["user_phone"],
                    properties["seller_name"],
                    properties["seller_status"],
                    properties["seller_last_seen"]
                ))
            except Exception as e:
                print(
                    f"{Fore.RED}Error inserting into users table: {e}{Style.RESET_ALL}")
                raise

            try:
                cursor.execute("""
                    INSERT INTO properties (guid, user_id, url, title, status, short_description, region, region_parent_name, 
                                           price, price_view, price_display, image_url, date_created, date_edited, date_moderated, 
                                           description, is_active, is_closed, property_type, size, property_condition)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    properties["guid"],
                    properties["user_id"],
                    properties["url"],
                    properties["title"],
                    properties["status"],
                    properties["short_description"],
                    properties["region"],
                    properties["region_parent_name"],
                    properties["price"],
                    properties["price_view"],
                    properties["price_display"],
                    properties["image_url"],
                    properties["date_created"],
                    # To ensure this is a string
                    str(properties["date_edited"]),
                    properties["date_moderated"],
                    properties["description"],
                    properties["is_active"],
                    properties["is_closed"],
                    properties["property_type"],
                    properties["size"] or 0,  # Default to 0 if None
                    properties["property_condition"]
                ))
            except Exception as e:
                print(
                    f"{Fore.RED}Error inserting into properties table: {e}{Style.RESET_ALL}")
                raise

            try:
                for image in properties["images"]:
                    cursor.execute("""
                        INSERT INTO property_images (image_id, guid, url, is_main, width, height)
                        VALUES (%s, %s, %s, %s, %s, %s)
                    """, (
                        image["id"],
                        properties["guid"],
                        image["url"],
                        image["is_main"],
                        image["width"],
                        image["height"]
                    ))
            except Exception as e:
                print(
                    f"{Fore.RED}Error inserting into property_images table: {e}{Style.RESET_ALL}")
                raise

            try:
                for attr in properties["attrs"]:
                    cursor.execute("""
                        INSERT INTO property_attributes (guid, name, value, data_type, group_type)
                        VALUES (%s, %s, %s, %s, %s)
                    """, (
                        properties["guid"],
                        attr["name"],
                        json.dumps(attr["value"])[:10] if isinstance(
                            attr["value"], list) else attr["value"],
                        attr["data_type"],
                        attr["group_type"]
                    ))
            except Exception as e:
                print(
                    f"{Fore.RED}Error inserting into property_attributes table: {e}{Style.RESET_ALL}")
                raise

        db_conn.commit()
        print(f"{Fore.LIGHTGREEN_EX}🛢  Saved to DB.{Style.RESET_ALL}")
    except Exception as e:
        print(f"{Fore.RED}Error saving data to DB: {e}{Style.RESET_ALL}")
        db_conn.rollback()


async def scrape_page(session, page, db_conn):
    url = f"{LISTING_URL}{page}&webp=true"
    listing_data = await fetch_json(session, url)

    if not listing_data or "adverts_list" not in listing_data or "adverts" not in listing_data["adverts_list"]:
        print(f"{Fore.YELLOW}No adverts found on page {page}{Style.RESET_ALL}")
        return
    
    with open(DATA_FOLDER / f"page_{page}.json", "w", encoding="utf-8") as f:
        json.dump(listing_data, f, ensure_ascii=False, indent=4)
        print(f"{Fore.LIGHTGREEN_EX}Page {page} saved to {f.name}{Style.RESET_ALL}")

    adverts = listing_data["adverts_list"]["adverts"]
    properties = []

    for advert in adverts:
        property_info = await scrape_property_details(session, advert, page)
        if property_info:
            save_to_db(property_info, db_conn)
            properties.append(property_info)

    with open(SCRAPED_FOLDER / f"page_{page}.json", "w", encoding="utf-8") as f:
        json.dump(properties, f, ensure_ascii=False, indent=4)
        print(f"{Fore.LIGHTGREEN_EX}Scraped Data Saved to {f.name}{Style.RESET_ALL}")

    return properties


async def main():
    db_conn = pymysql.connect(
        host=os.environ.get('DB_HOST', 'localhost'),
        user=os.environ.get('DB_USER', 'root'),
        password=os.environ.get('DB_PASSWORD', ''),
        db=os.environ.get('DB_NAME', 'landscoper'),
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

    async with aiohttp.ClientSession() as session:
        tasks = [scrape_page(session, page, db_conn)
                 for page in range(1, PAGES_TO_SCRAPE + 1)]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        all_properties = [property for page in results if isinstance(
            page, list) for property in page]
        print(f"{Fore.CYAN}Scraped {len(all_properties)} properties across {PAGES_TO_SCRAPE} pages{Style.RESET_ALL}")


def signal_handler(sig, frame):
    print(f"{Fore.YELLOW}\nProcess interrupted! Exiting gracefully...{Style.RESET_ALL}")
    sys.exit(0)


if __name__ == "__main__":
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)

    print(f"""
{Fore.MAGENTA}

          
 ░▒▓███████▓▒░░▒▓██████▓▒░░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░░▒▓███████▓▒░░▒▓████████▓▒░▒▓███████▓▒░  
░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
 ░▒▓██████▓▒░░▒▓█▓▒░      ░▒▓███████▓▒░░▒▓████████▓▒░▒▓███████▓▒░░▒▓███████▓▒░░▒▓██████▓▒░ ░▒▓███████▓▒░  
       ░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
       ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░ 
                                                                                                          

v. 0.0.0                                                                                  
{Style.RESET_ALL}
""")

    asyncio.run(main())
    print(f"{Fore.BLUE}Scraping completed!{Style.RESET_ALL}")
