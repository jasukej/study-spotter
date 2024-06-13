import prisma from '@/app/libs/prismadb';
import { Location } from '../components/search/LocationSearch';

export interface ISpotsParams {
    location?: string;
    distanceValue?: number;
    institution?: string; // ids
    building?: string;
    noiseLevel?: number;
    features?: string[];
    category?: string;
    page?: number;
    limit?: number;
}

export default async function getStudySpots(params?: ISpotsParams) {

    const { 
        page = 1, 
        limit, 
        ...filters 
    } = params || {}; 

    try {
        let query: any = {};

        if (params) {
            const {
                location,
                distanceValue,
                institution,
                building,
                noiseLevel,
                features,
                category
            } = params;


            if (category) {
                query.category = category;
            }

            if (institution) {
                query.institutionId = institution;
            }

            if (building) {
                query.buildingId = building;
            }

            if (noiseLevel) {
                query.noiseLevel = {
                    lte: +noiseLevel
                };
            }

            if (features && features.length > 0) {
                query.features = {
                    hasEvery: features
                };
            }
        }
        
        // USE CENTERSPHERE
        let filteredIds = [];
        if (params?.location && params?.distanceValue) {
            const [lat, lng] = params.location.split(", ").map(Number);

            // console.log(lat, lng);
            // console.log(params.distanceValue); // in km

            const spotsWithinLocation = await prisma.studySpot.findRaw({
                filter: {
                    location: {
                        $geoWithin: {
                            $centerSphere: [
                                [lng, lat], params.distanceValue/6378.1
                            ], 
                        }
                    }
                }
            })

            console.log(spotsWithinLocation);

            if (spotsWithinLocation && Array.isArray(spotsWithinLocation)) {
                filteredIds = spotsWithinLocation.map((spot: any) => spot._id.$oid);
            }
        }

        console.log(filteredIds);

        if (filteredIds.length > 0) {
            query.id = {
                in: filteredIds
            };
        }

        const spots = await prisma.studySpot.findMany({
            where: query,
            // @ts-ignore
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                createdAt: 'asc'
            }
        });

        const total = await prisma.studySpot.count({
            where: query
        })

        return { data: spots, total };
    } catch (error: any) {
        throw new Error(error);
    }
}