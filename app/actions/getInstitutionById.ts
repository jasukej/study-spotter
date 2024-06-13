import prisma from "@/app/libs/prismadb"

export default async function getInstitutionById(
    institutionId: string 
) {
    try {
        const institution = await prisma.institution.findUnique({
            where: {
                id: institutionId
            },
            include: {
                buildings: true
            }
        })

        if (!institution) {
            return null;
        }

        return institution;

    } catch (error:any) {
        throw new Error(error);
    }
}