export interface PropertyImage {
  image_id: string;
  guid: string;
  url: string;
  is_main: boolean;
  width: number;
  height: number;
  created_at: string;
}

export interface PropertyAttribute {
  id: number;
  guid: string;
  name: string;
  value: string;
  data_type: string;
  group_type: string;
  created_at: string;
}

export interface User {
  user_id: string;
  seller_name: string;
  seller_status: string;
  seller_last_seen: string;
  created_at: string;
}

export interface Property {
  guid: string;
  user_id: string;
  url: string;
  title: string;
  status: string;
  short_description: string;
  region: string;
  region_parent_name: string;
  price: string;
  price_view: string;
  price_display: string;
  image_url: string;
  date_created: string;
  date_edited: string;
  date_moderated: string;
  description: string;
  is_active: boolean;
  is_closed: boolean;
  property_type: string;
  size: number;
  property_condition: string;
  created_at: string;
  user: User;
  images: PropertyImage[];
  attributes: PropertyAttribute[];
}