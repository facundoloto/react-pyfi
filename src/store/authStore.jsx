import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Swal from "sweetalert2";
import { loginBySystem } from '../api/fetchApi';
/*
this code works as auth login 
if the login is success update the state
*/
export const useAuthStore = create(persist((set) => ({
  isAuthenticated: false,
  user: null,
  idUser: null,
  image: null,
  login: async (typeLogin, data) => {

    if (typeLogin === 'system') {

      const dataLogin = { email: data.email, password: data.password };
      const response = await loginBySystem(dataLogin);
      console.log(response.data)
      if (response.status === 200) {

        set({
          isAuthenticated: true,
          user: response.data[0].name,
          idUser: response.data[0].id,
          image: response.data[0].image_user
        });

        Swal.fire({
          icon: "success",
          title: "success",
          showConfirmButton: false,
          timer: 1500,
        });

      }
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email or Password wrong,Try again!",
        });
      }
    }

    if (typeLogin === "google") {

      set({
        isAuthenticated: true,
        user: data.name,
        idUser: data.id,
        image: data.image
      })

    }

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
        set({ isAuthenticated: false, user: null, idUser: null, image: null });
      }
    })
    // this part of code works to end user's session
  },
}), { name: 'auth' }));


