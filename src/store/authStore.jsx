import create from 'zustand';
import { persist } from 'zustand/middleware';
import Swal from "sweetalert2";
import {routes} from "./../components/register/routes/routesApi";
import {postMethod} from "./../utils/httpMethods";
/*
this code works as auth login 
if the login is success update the state
*/
export const useAuthStore = create(persist((set) => ({
  isAuthenticated: false,
  user: null,
  idUser:null,
  login: async(email, password) => {

    const data = {email:email, password:password};
    const response = await postMethod(routes.login, data);
    
  
    // const navigate = useNavigate();

    if (response.status === 200) {
        const user = await response.json();

        set({ 
            isAuthenticated: true, 
            user:  user[0].name , 
            idUser:user[0].id
        });

        Swal.fire({
            icon: "success",
            title: "success",
            showConfirmButton: false,
            timer: 1500,
        });

    }  else {

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email or Password wrong,Try again!",
        });

    }
},
  logout: () => {
    // Lógica de cierre de sesión aquí
    // Actualiza el estado para indicar que el usuario no está autenticado
    set({ isAuthenticated: false, user: null });
  },
}),{name:'auth'}));

