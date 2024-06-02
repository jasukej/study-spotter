'use client'

import { create } from 'zustand';

interface AddSpotModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: (resetForm?: () => void) => void;
    step: number;
    resetStep: () => void;
}
const useAddSpotModal = create<AddSpotModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: (resetForm) => { 
        if (resetForm) resetForm();
        set({isOpen: false, step: 0 });
    },
    step: 0,
    resetStep: () => set({ step: 0 })
}))

export default useAddSpotModal;