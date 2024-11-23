'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Property } from '@/types';
import PropertyDetail from './property-detail';
import Card from './card';

export default function PropertyList() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [showDetails, setShowDetails] = useState<boolean>(false);

    useEffect(() => {
        async function fetchProperties() {
            try {
                const response = await axios.get('/api/get-samples');
                setProperties(response.data.properties);
                // setSelectedProperty(response.data.properties[0])
            } catch (error) {
                console.error('Error fetching properties', error);
            }
        }

        fetchProperties();
    }, []);

    const handleCardClick = (property: Property) => {
        setSelectedProperty(property);
        setShowDetails(true)
    };

    const handleCancelDetail = () => {
        setShowDetails(false);
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:p-6">
            {showDetails && selectedProperty &&
                <PropertyDetail
                    property={selectedProperty}
                    handleCancelDetail={handleCancelDetail}
                />
            }
            {properties.map((property) => (
                <Card
                    key={property.guid}
                    property={property}
                    onClick={() => handleCardClick(property)}
                />
            ))}
        </div>
    );
}
