import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useNavigate } from "react-router-dom";

export const useProfileStore = create(persist((set) => ({
    idProfile: null,
    profile: async (id) => {
        set({ idProfile: id });
    },
}), { name: 'profile' }));

