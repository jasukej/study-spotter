import { create } from 'zustand';

interface AddReviewModalStore {
    isOpen: boolean;
    studySpotId: string | null;
    onOpen: (studySpotId: string) => void;
    onClose: () => void;
}
const useAddReviewModal = create<AddReviewModalStore>((set) => ({
    isOpen: false,
    studySpotId: null,
    onOpen: (studySpotId: string) => set({ isOpen: true, studySpotId }),
    onClose: () => set({ isOpen: false })
}))

export default useAddReviewModal;