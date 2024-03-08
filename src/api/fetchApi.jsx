import axios from "axios";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const routesApi = "https://services-pyfi.onrender.com/v1";
// const routesApi = "http://localhost:8000/v1";

const api = axios.create({
  baseURL: routesApi,
  headers: {
    'Authorization': `${cookies.get('token')}`
  }
});

export const registerBySystem = async (data) => {
  const response = await api.post(routesApi + '/register/signup/', data);
  return response;
};

export const loginBySystem = async (data) => {
  try {
    const dataLogin = { email: data.email, password: data.password };
    const response = await api.post('/register/login/', dataLogin);
    return response;
  } catch (error) {
    return error;
  }
};

export const registerByGoogle = async (data) => {
  const response = await api.post('/register/signup/google', data);
  return response;
};

export const loginByGoogle = async (data) => {
  try {
    const response = await api.post('/register/login/google', data, { withCredentials: true });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getAllPost = async () => {

  //I put the headers again just because I need reload the token once users will to use the log in
  const res = await api.get("/home/post/", {
    headers: {
      'Authorization': `${cookies.get('token')}`
    }
  });
  return res.data.result;
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
  const res = await api.get("/home/post/user/" + id, {
    headers: {
      'Authorization': `${cookies.get('token')}`
    }
  });
  return res.data;
};

export const sendPost = async (data) => {
  const response = await api.post('/home/post/', data, {
    headers: {
      'Content-Type': 'form-data',
      'Authorization': `${cookies.get('token')}`
    }
  });

  if (!response.status === 200) {
    throw new Error('err send post');
  }
  else {
    Swal.fire({
      icon: "success",
      title: "success",
      showConfirmButton: false,
      timer: 1500,
    });
    return response;
  }

};

export const deletePost = async (id) => {
  const res = await api.delete("/home/post/" + id);
  return res;
};

export const updateUser = async (id, data) => {
  const response = await api.put('/user/user/' + id, data, {
    headers: {
      'Content-Type': 'form-data'
    }
  });

  if (!response.status === 200) {
    throw new Error('err update user');
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