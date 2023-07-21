import React from 'react';
import { useNavigate } from "react-router-dom";

import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLoginButton } from "react-social-login-buttons";
import { getInfoUser, isActiveUser } from './loginUserGoogle';

import { useAuthStore } from '../../../store/authStore';
import { registerByGoogle, getUserByEmail } from '../../../api/fetchApi';

import "./google.css"


function GoogleLoginAuth() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const authUser = async (data) => {
        const type = 'google';
        const getUserByGoogle = await getInfoUser(data);
        const isUserActive = await isActiveUser(getUserByGoogle.email);
        const userData = { "name": getUserByGoogle.name, "email": getUserByGoogle.email, "image": getUserByGoogle.image };

        if (isUserActive.length === 0) {

            const response = await registerByGoogle(userData);

            if (response.status === 200) {
                try {
                    const data = { id: response.id, name: response.name, image: response.image_user };
                    login(type, data);
                    navigate("/");

                } catch (error) {
                    console.log(error);
                }
            }


        } else {

            try {
                const userGoogle = await getUserByEmail(getUserByGoogle.email);
                const data = { id: userGoogle[0].id, name: userGoogle[0].name, image: userGoogle[0].image_user };
                login(type, data);

                if (isAuthenticated) {
                    navigate("/home");
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    const onSubmit = useGoogleLogin({
        onSuccess: async (codeResponse) => { await authUser(codeResponse) },
        onError: (error) => console.log('Login Failed:', error)
    });

    return (
        <div>
            <GoogleLoginButton onClick={onSubmit} className="google-btn">continue with Google</GoogleLoginButton>
        </div>
    );
};

export default GoogleLoginAuth;


