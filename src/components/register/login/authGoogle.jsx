import React from 'react';
import { useNavigate } from "react-router-dom";

import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLoginButton } from "react-social-login-buttons";
import { getInfoUser, isActiveUser } from './loginUserGoogle';

import { useAuthStore } from '../../../store/authStore';
import { registerByGoogle, loginByGoogle } from '../../../api/fetchApi';

import "./google.css";


function GoogleLoginAuth() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const authUser = async (data) => {
        /*It's type google 'cause has different auth*/
        const dataUserByGoogle = await getInfoUser(data);
        //verify if email from dataUserByGoogle is already in the data base
        const isUserActive = await isActiveUser(dataUserByGoogle.email);

        //if user It isn't found this will save in the back-end
        if (isUserActive.length === 0) {
            const response = await registerByGoogle(dataUserByGoogle);

            if (response.status === 200) {
                try {
                    /*this data will be save in the local storage and the id and token will be save in a cookie that the server send*/
                    const data = { name: response.name, image: response.image_user };
                    login(data);
                    navigate("/");
                } catch (error) {
                    console.log(error);
                }
            }

        } else {

            try {
                /* this It's the same case to regsiter*/
                const data = await loginByGoogle(dataUserByGoogle);
                const dataUser = { id: data.data.data.id, name: data.data.data.name, image: data.data.data.image_user };
                login(dataUser);

                if (isAuthenticated) {
                    navigate("/home");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const onSubmit = useGoogleLogin({
        onSuccess: async (codeResponse) => { await authUser(codeResponse); },
        onError: (error) => console.log('Login Failed:', error)
    });

    return (
        <div>
            <GoogleLoginButton onClick={onSubmit} cookiePolicy='single-host-origin' className="google-btn">continue with Google</GoogleLoginButton>
        </div>
    );
}

export default GoogleLoginAuth;


