import prisma from "@/app/libs/prismadb";
import { User } from "@prisma/client";
import useLoginModal from "./useLoginModal";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";


interface useFavourite {
    spotId: string;
    currentUser?: User | null;
}

const useFavourite = ({
    spotId,
    currentUser,
}:useFavourite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    // Check for whether spotId is favourited alr
    const hasFavourited = useMemo(() => {
        const userFavs = currentUser?.favouriteIds || [];

        console.log(userFavs.includes(spotId))
        return userFavs.includes(spotId);
    }, [currentUser, spotId]);

    const toggleFavourite = useCallback(async (
        e: React.MouseEvent
    ) => {
        e.stopPropagation();

        // Login first
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (hasFavourited) {
                request = () => axios.delete(`/api/favourites/${spotId}`);
            } else {
                request = () => axios.post(`api/favourites/${spotId}`);
            }

            await request();
            router.refresh();
            toast ({
                title: hasFavourited ? "Removed from favourites." : "Added to favourites."
            })
        } catch (error) {
            toast ({
                title: 'Something went wrong.'
            })
        }
    }, [
        currentUser,
        spotId,
        hasFavourited,
        loginModal,
        router
    ])

    return {
        hasFavourited,
        toggleFavourite
    }
}

export default useFavourite;