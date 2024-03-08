import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useProfileStore = create(persist((set) => ({
    idProfile: null,
    profile: async (id) => {
        set({ idProfile: id });
    },
}), { name: 'profile' }));

