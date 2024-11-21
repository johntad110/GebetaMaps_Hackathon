import { NextRequest } from "next/server";
import { GebetaMaps, ReverseGeocodingRequest, ForwardGeocodingRequest, MatrixRequest } from "gebeta-maps";
import db from "@/db";

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const propertyGuid = searchParams.get("guid");

    if (!propertyGuid) {
        return new Response(JSON.stringify({ error: "Property GUID is required" }), { status: 400 });
    }

    const gebetamaps = new GebetaMaps({ apiKey: process.env.GEBETA_MAPS_API_KEY as string });

    try {
        // Step 1: Fetch property details from the database
        const property: any = await db.query("SELECT * FROM properties WHERE guid = $1", [propertyGuid]);
        if (property.rowCount === 0) {
            return new Response(JSON.stringify({ error: "Property not found" }), { status: 404 });
        }

        const { address, latitude, longitude } = property.rows[0];

        // Step 2: Geocode the property (reverse geocoding for coordinates and forward for nearby amenities)
        const reverseGeocode = await gebetamaps.reverseGeocode(latitude, longitude);

        const amenities = ["school", "hospital", "park", "transport hub"];
        const forwardGeocodes: any = await Promise.all(
            amenities.map((amenity) =>
                gebetamaps.forwardGeocode(`${amenity} near ${address}`)
            )
        );

        // Step 3: Calculate distances and accessibility
        const matrixRequest = {
            json: forwardGeocodes.map((result: any) => result[0]?.coordinates).filter(Boolean),
        } as MatrixRequest;

        const matrix: any = await gebetamaps.getMatrix(matrixRequest);

        // Step 4: Compile a comprehensive report
        const report = {
            property: {
                guid: propertyGuid,
                address,
                coordinates: { latitude, longitude },
            },
            reverseGeocoding: reverseGeocode,
            amenities: amenities.map((amenity, index) => ({
                type: amenity,
                nearest: forwardGeocodes[index][0] || null,
                distance: matrix.distances?.[0]?.[index] || "N/A",
                travelTime: matrix.durations?.[0]?.[index] || "N/A",
            })),
        };

        return new Response(JSON.stringify(report), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to process property details", details: error }), { status: 500 });
    }
}
