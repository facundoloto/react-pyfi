import { redirect } from "react-router-dom";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Swal from "sweetalert2";

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
  //   if (typeLogin === "google") {

  //     set({
  //       isAuthenticated: true,
  //       idUser: data.id,
  //       user: data.name,
  //       image: data.image
  //     });

  //   }

  // },
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
        set({ isAuthenticated: false, user: null, idUser: null, image: null });
      }
    });
    // this part of code works to end user's session
  },
}), { name: 'auth' }));


