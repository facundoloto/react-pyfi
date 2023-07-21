import axios from "axios";
import Swal from "sweetalert2";

const routesApi = import.meta.env.VITE_URL_API;

const api = axios.create({
  baseURL: routesApi,
});


export const registerBySystem = async (data) => {
  const response = await api.post('/register/signup/', data);
  return response;
}

export const loginBySystem = async (data) => {

  try {
    const response = await api.post('/register/login/', data);
    return response;
  } catch (error) {
    return error.response;
  }

}

export const registerByGoogle = async (data) => {
  const response = await api.post('/register/signup/google', data);
  return response;
}

export const getAllPost = async () => {
  const res = await api.get("/home/post/");
  return res.data;
};

export const getUserByEmail = async (email) => {
  const res = await api.get("/user/email/" + email);
  return res.data;
};

export const getUserById = async (id) => {
  const res = await api.get("/user/id/" + id);
  return res.data;
};

export const getAllPostByUser = async (id) => {
  const res = await api.get("/home/post/" + id);
  return res.data;
};

export const sendPost = async (data) => {
  const response = await api.post('/home/post/', data, {
    headers: {
      'Content-Type': 'form-data'
    }
  });

  if (!response.status === 200) {
    throw new Error('Error al enviar el POST');
  }
  else {

    Swal.fire({
      icon: "success",
      title: "success",
      showConfirmButton: false,
      timer: 1500,
    });

  }

};


export default api;