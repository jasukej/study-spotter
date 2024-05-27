import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb"

export default async function getCurrentUser() {
    try {
        const session = await getServerSession(authOptions);

        // CHECK 1
        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        // CHECK 2
        if (!currentUser) {
            return null;
        }

        // Returning prisma user object
        return currentUser;

    } catch (error: any) {
        return null;
    }
}