import { create } from 'zustand';

interface UpdateInstitutionModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
const useUpdateInstitutionModal = create<UpdateInstitutionModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useUpdateInstitutionModal;