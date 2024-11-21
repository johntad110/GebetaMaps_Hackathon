CREATE DATABASE IF NOT EXISTS landscoper;
USE landscoper;

CREATE TABLE users (
    user_id VARCHAR(255) PRIMARY KEY,
    user_password VARCHAR(255),
    user_phone VARCHAR(20),
    seller_name VARCHAR(255),
    seller_status VARCHAR(50),
    seller_last_seen VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE properties (
    guid CHAR(36) PRIMARY KEY,
    user_id VARCHAR(255),
    url VARCHAR(255),
    title VARCHAR(255),
    status VARCHAR(50),
    short_description TEXT,
    region VARCHAR(100),
    region_parent_name VARCHAR(100),
    price VARCHAR(255),
    price_view VARCHAR(255),
    price_display TEXT,
    image_url VARCHAR(255),
    date_created VARCHAR(255),
    date_edited VARCHAR(255),
    date_moderated VARCHAR(255),
    description TEXT,
    is_active BOOLEAN,
    is_closed BOOLEAN,
    property_type VARCHAR(100),
    size DECIMAL(10, 2),
    property_condition VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE property_images (
    image_id CHAR(36) PRIMARY KEY,
    guid CHAR(36),
    url VARCHAR(255),
    is_main BOOLEAN,
    width INT,
    height INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (guid) REFERENCES properties(guid)
);

CREATE TABLE property_attributes (
    id SERIAL PRIMARY KEY,
    guid CHAR(36),
    name VARCHAR(100),
    value VARCHAR(255),
    data_type VARCHAR(50),
    group_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (guid) REFERENCES properties(guid)
);


CREATE TABLE assessments (
    assessment_id INT PRIMARY KEY AUTO_INCREMENT,      
    property_id CHAR(36),                                                -- Foreign key referencing the property being assessed
    assessment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,            -- Date and time when the assessment was conducted
    proximity_to_schools_distance INT,                              -- Distance to the nearest school in meters
    proximity_to_hospitals_distance INT,                            -- Distance to the nearest hospital in meters
    proximity_to_shopping_centers_distance INT,                     -- Distance to the nearest shopping center in meters
    proximity_to_transportation_hubs_distance INT,                  -- Distance to the nearest public transportation hub (bus/train) in meters
    crime_rate_score INT,                                           -- Crime rate score or risk (1 to 10 scale)
    safety_rating INT,                                              -- Safety rating of the area (1 to 10 scale)
    peak_traffic_time INT,                                          -- Peak traffic time in minutes (average commute)
    accessibility_score INT,                                        -- Score assessing the overall accessibility (1 to 10 scale)
    environmental_factors TEXT,                                     -- Summary of environmental factors (pollution levels, flood zones)
    proximity_to_green_spaces_distance INT,                         -- Distance to nearest park or green space in meters
    economic_growth_score INT,                                      -- Economic growth indicator (1 to 10 scale based on nearby developments)
    rental_price_trend VARCHAR(50),                                 -- Rental price trend (increasing, stable, decreasing)
    population_growth_rate DECIMAL(5,2),                            -- Population growth rate (%) of the area
    user_reviews_score INT,                                         -- Average score of user reviews for the neighborhood/businesses (if available)
    nearby_developments TEXT,                                       -- Description of nearby developments (new buildings, businesses, etc.)
    additional_notes TEXT,                                          -- Additional notes or observations from the assessment
    FOREIGN KEY (property_id) REFERENCES properties(guid)    -- Foreign key relationship with properties table
);

-- Indexes to optimize data access
CREATE INDEX idx_property_user ON properties(user_id);
CREATE INDEX idx_assessment_property ON assessments(property_id);
