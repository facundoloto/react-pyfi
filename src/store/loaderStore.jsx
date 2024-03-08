import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const loaderStore = create(persist((set) => ({
    isLoading: false,
    changeLoading: async (isActive) => {
        set({ isLoading: isActive });
    },
}), { name: 'loader' }));

