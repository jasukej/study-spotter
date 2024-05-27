'use client'

import { create } from 'zustand';

interface AddSpotModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
const useAddSpotModal = create<AddSpotModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useAddSpotModal;