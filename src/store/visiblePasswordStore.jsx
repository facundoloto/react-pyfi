import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export const visiblePasswordStore = create(persist((set) => ({
    isVisible: 'password',
    visibleInput: async (input) => {
        if (input == "password") {
            set({ isVisible: 'text' });

        } else {
            set({ isVisible: 'password' });
        }
    },
}), { name: 'isVisible' }));

