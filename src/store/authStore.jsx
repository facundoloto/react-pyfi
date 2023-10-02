import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'universal-cookie';
import Swal from "sweetalert2";

const cookies = new Cookies();

export const useAuthStore = create(persist((set) => ({
  isAuthenticated: false,
  user: null,
  idUser: null,
  image: null,

  login: async (data) => {
    set({
      isAuthenticated: true,
      user: data.name,
      idUser: data.id,
      image: data.image_user
    });
  },
  updateUser: async (data) => {
    set({
      user: data.name,
      image: data.image_user
    });
  },
  logout: () => {
    Swal.fire({
      title: 'Do you want logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        cookies.remove('token');
        set({ isAuthenticated: false, user: null, idUser: null, image: null });
      }
    });
    // this part of code works to end user's session
  },
}), { name: 'auth' }));


