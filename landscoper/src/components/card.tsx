import { Property } from "@/types";

interface CardProps {
    property: Property;
    onClick: () => void;
}

export default function Card({ property, onClick }: CardProps) {
    return (
        <div
            onClick={onClick}
            className="relative bg-black text-white rounded-3xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105- transition duration-300 group"
        >
            <div className="relative">
                <div className="z-50 fixed top-0 left-0 flex bg-transparent">
                    <div className="m-2 px-2 text-sm rounded-lg border border-gray-300 bg-yellow-500/20 backdrop-blur-xl">{property.status}</div>
                </div>
                <div className="z-10 absolute w-full h-full bg-amber-700/30 backdrop-blur-md hidden group-hover:flex justify-center items-center transition-all">
                    <a href="#" className="py-2 px-4 border rounded-full transition duration-300 hover:text-white">
                        View On Map
                    </a>
                </div>
                <img src={property.image_url} alt={property.title} className="w-full h-60 object-cover" />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-semibold">{property.title}</h2>
                <p className="text-gray-400 text-sm">{property.short_description}</p>
                <p className="text-lg font-semibold mt-2">{property.price_display}</p>
            </div>
        </div>
    );
}
