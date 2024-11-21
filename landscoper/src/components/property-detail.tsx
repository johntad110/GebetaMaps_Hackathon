import { Property, PropertyImage } from "@/types";
import { LucideArrowLeft, User as UserIcon } from "lucide-react";
import { useState } from "react";

// Component for showing property assessments
function PropertyAssessmentOverlay({
  isVisible,
  onClose,
  propertyGuid,
}: {
  isVisible: boolean;
  onClose: () => void;
  propertyGuid: string;
}) {
  // Imaginary property assessment data
  const mockAssessment = {
    proximity: {
      schools: "500m",
      hospitals: "1.2km",
      parks: "700m",
    },
    accessibility: {
      public_transport: "200m",
      traffic_conditions: "Moderate",
    },
    investment_potential: "High",
    detailed_report:
      "This property has excellent proximity to essential amenities and public transportation, making it a valuable choice for families and investors.",
  };

  return isVisible ? (
    <div className="fixed z-30 w-full h-screen bg-black/80 top-0 left-0 flex items-center justify-center p-4">
      <div className="bg-gray-900 text-white p-6 rounded-2xl border border-gray-600 shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Property Assessment</h2>
          <button
            onClick={onClose}
            className="text-sm bg-gray-700 py-1 px-3 rounded hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">Proximity to Amenities</h3>
            <ul className="text-sm space-y-2">
              <li>Schools: {mockAssessment.proximity.schools}</li>
              <li>Hospitals: {mockAssessment.proximity.hospitals}</li>
              <li>Parks: {mockAssessment.proximity.parks}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Accessibility</h3>
            <ul className="text-sm space-y-2">
              <li>Public Transport: {mockAssessment.accessibility.public_transport}</li>
              <li>Traffic Conditions: {mockAssessment.accessibility.traffic_conditions}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Investment Potential</h3>
            <p className="text-sm">{mockAssessment.investment_potential}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Detailed Report</h3>
            <p className="text-sm">{mockAssessment.detailed_report}</p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

interface PropertyDetailProps {
  property: Property;
  handleCancelDetail: () => void;
}

export default function PropertyDetail({
  property,
  handleCancelDetail,
}: PropertyDetailProps) {
  const [selectedImage, setSelectedImage] = useState(property.images[0]);
  const [isAssessmentVisible, setIsAssessmentVisible] = useState(false);

  const handleImageClick = (image: PropertyImage) => {
    setSelectedImage(image);
  };

  return (
    <div className="fixed z-20 w-full h-screen bg-black/50 backdrop-blur-lg top-0 left-0 pt-24 overflow-y-scroll">
      <div className="text-white p-6 flex flex-col">
        <div className="relative z-20 flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start h-full text-center sm:text-left">
          {/* Main Image */}
          <div className="sm:w-1/2 mb-6 sm:mb-0">
            <img
              src={selectedImage.url}
              alt={selectedImage.image_id}
              className="w-full h-80 sm:h-96 object-cover rounded-3xl mb-4 border-2 border-gray-500"
            />
            <div className="flex overflow-x-auto mt-6">
              {property.images.map((image) => (
                <img
                  key={image.image_id}
                  src={image.url}
                  alt={image.image_id}
                  className="w-20 h-20 sm:w-32 sm:h-32 object-cover rounded-3xl cursor-pointer m-2 transition-transform transform hover:scale-105 border-2 border-gray-400"
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          </div>

          {/* Property Details */}
          <div className="sm:w-1/2 sm:ml-8 flex flex-col items-center sm:items-start">
            <div className="text-center sm:text-left flex space-x-4">
              <button
                onClick={handleCancelDetail}
                className="bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300 flex items-center"
              >
                <LucideArrowLeft /> Back to Listings
              </button>
              <button
                onClick={() => setIsAssessmentVisible(true)}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition duration-300 flex items-center"
              >
                Property Assessment (Powered By GebetaMap)
              </button>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold mb-4">{property.title}</h1>
            <p className="text-lg font-medium mb-4">{property.price_display}</p>
            <p className="text-base mb-4">{property.description}</p>

            {/* Attributes */}
            <div className="space-y-2 mb-4">
              <h3 className="text-xl font-semibold">Attributes</h3>
              <ul className="space-y-1">
                {property.attributes.map((attr) => (
                  <li
                    key={attr.id}
                    className="flex justify-between text-gray-300"
                  >
                    <span>{attr.name}</span>
                    <span>{attr.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* User Information */}
            <div className="flex items-center text-gray-300 mt-4 p-2 border border-gray-400 rounded-xl">
              <UserIcon className="w-6 h-6 mr-2" />
              <div>
                <p className="text-sm font-semibold text-start">{property.user.seller_name}</p>
                <p className="text-xs">{property.user.seller_status} | Last seen: {property.user.seller_last_seen}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Assessment Overlay */}
      <PropertyAssessmentOverlay
        isVisible={isAssessmentVisible}
        onClose={() => setIsAssessmentVisible(false)}
        propertyGuid={property.guid}
      />
    </div>
  );
}
