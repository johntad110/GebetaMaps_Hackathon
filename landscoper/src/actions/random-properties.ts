import db from "@/db";
import { Property, PropertyImage } from "@/types";

export async function getRandomProperties(): Promise<Property[]> {
    return new Promise((resolve, reject) => {
        // Query to get 20 random properties along with their associated user, images, and attributes
        const query = `
        SELECT p.*, u.user_id, u.seller_name, u.seller_status, u.seller_last_seen, u.created_at AS user_created_at
        FROM properties p
        JOIN users u ON p.user_id = u.user_id
        WHERE p.is_active = true AND p.is_closed = false
        ORDER BY RAND()
        LIMIT 20;
      `;

        db.query(query, (err, results: any) => {
            if (err) {
                reject(err);
                return;
            }

            const properties: Property[] = [];

            // Fetch images and attributes for each property
            results.forEach((property: any) => {
                const { guid, user_id, title, status, short_description, region, region_parent_name, price, price_view, price_display, image_url, date_created, date_edited, date_moderated, description, is_active, is_closed, property_type, size, property_condition, created_at, user_id: seller_user_id, seller_name, seller_status, seller_last_seen, user_created_at } = property;

                // Fetch images for the property
                const imagesQuery = `
            SELECT image_id, guid, url, is_main, width, height, created_at
            FROM property_images
            WHERE guid = ?;
          `;

                db.query(imagesQuery, [guid], (imageErr, imageResults: any) => {
                    if (imageErr) {
                        reject(imageErr);
                        return;
                    }

                    // Fetch attributes for the property
                    const attributesQuery = `
              SELECT id, guid, name, value, data_type, group_type, created_at
              FROM property_attributes
              WHERE guid = ?;
            `;

                    db.query(attributesQuery, [guid], (attrErr, attrResults: any) => {
                        if (attrErr) {
                            reject(attrErr);
                            return;
                        }

                        // Map property data
                        const propertyData: Property = {
                            guid,
                            user_id,
                            url: property.url,
                            title,
                            status,
                            short_description,
                            region,
                            region_parent_name,
                            price,
                            price_view,
                            price_display,
                            image_url,
                            date_created,
                            date_edited,
                            date_moderated,
                            description,
                            is_active,
                            is_closed,
                            property_type,
                            size,
                            property_condition,
                            created_at,
                            user: {
                                user_id: seller_user_id,
                                seller_name,
                                seller_status,
                                seller_last_seen,
                                created_at: user_created_at,
                            },
                            images: imageResults.map((image: any) => ({
                                image_id: image.image_id,
                                guid: image.guid,
                                url: image.url,
                                is_main: image.is_main,
                                width: image.width,
                                height: image.height,
                                created_at: image.created_at,
                            })),
                            attributes: attrResults.map((attribute: any) => ({
                                id: attribute.id,
                                guid: attribute.guid,
                                name: attribute.name,
                                value: attribute.value,
                                data_type: attribute.data_type,
                                group_type: attribute.group_type,
                                created_at: attribute.created_at,
                            })),
                        };

                        properties.push(propertyData);

                        // Resolve when all properties have been processed
                        if (properties.length === results.length) {
                            resolve(properties);
                        }
                    });
                });
            });
        });
    });
}
