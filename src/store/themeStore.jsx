import { create } from 'zustand';
import LightModeIcon from '@mui/icons-material/LightMode';
import { persist } from 'zustand/middleware';


export const themeStore = create(persist((set) => ({
    theme: 'Light',
    changeTheme: async (theme) => {
        set({ theme: theme });
    },
}), { name: 'theme' }));

