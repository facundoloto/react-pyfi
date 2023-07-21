const routesApi = import.meta.env.VITE_URL_API;

export const routes = {
     login: routesApi + "/register/login",
     signUp: routesApi + "/register/signup",
     signUpByGoogle: routesApi + "/register/singup/google/",
};