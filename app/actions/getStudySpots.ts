import prisma from '@/app/libs/prismadb'
import { LuSearch } from 'react-icons/lu';

export interface ISpotsParams {
    location: Location;
    distanceValue?: number;
    institution?: string; // ids
    building?: string;
    noiseLevel?: number;
    features?: string[];
    category?: string;
}

export default async function getStudySpots(
    params?: ISpotsParams
) {
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
    
            if (location && distanceValue) {
              // Logic for calculating distance to location for every spot
              // then filtering out spots with distances further than the distanceValue
            }
    
            if (institution) {
                query.institution = institution;
            }
    
            if (building) {
                query.building = building;
            }
    
            if (noiseLevel) {
                query.noiseLevel = {
                    lse: +noiseLevel
                };
            }
    
            if (features) {
                query.features = {
                    // Logic for mapping over features of each spot and making sure they include features query
                }
            }
        }

        const spots = await prisma.studySpot.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        return spots;
    } catch (error: any) {
        throw new Error(error);
    }
}