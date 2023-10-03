import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLoginButton } from "react-social-login-buttons";
import { getInfoUser, isActiveUser } from './loginUserGoogle';
import { useAuthStore } from '../../../store/authStore';
import { registerByGoogle, loginByGoogle } from '../../../api/fetchApi';
import Cookies from 'universal-cookie';
import Loader from '../../Loader/Loader';
import "./google.css";

function GoogleLoginAuth() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const login = useAuthStore((state) => state.login);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const authUser = async (data) => {
        setLoading(true);
        /*It's type google 'cause has different auth*/
        const dataUserByGoogle = await getInfoUser(data);

        //verify if email from dataUserByGoogle is already in the data base
        const isUserActive = await isActiveUser(dataUserByGoogle.email);

        //if user It isn't found this will save in the back-end
        if (isUserActive.result.length === 0) {
            const response = await registerByGoogle(dataUserByGoogle);

            if (response.status === 200) {
                try {
                    /*this data will be save in the local storage and the id and token will be save in a cookie that the server send*/
                    cookies.set("token", response.data.token);
                    const data = { id: response.data.data.id, name: response.data.data.name, image: response.data.data.image_user };
                    login(data);
                    setLoading(false);
                    navigate("/");
                } catch (error) {
                    setLoading(false);
                    console.log(error);
                }
            }

        } else {

            try {
                /* this It's the same case to regsiter*/
                /*I should make a dto to improve the code*/
                const data = await loginByGoogle(dataUserByGoogle);
                cookies.set("token", data.data.token);
                const dataUser = { id: data.data.data.id, name: data.data.data.name, image: data.data.data.image_user };
                setLoading(false);
                login(dataUser);

                if (isAuthenticated) {
                    navigate("/home");
                }
            } catch (error) {
                setLoading(false);
            }
        }
    };

    const onSubmit = useGoogleLogin({
        onSuccess: async (codeResponse) => { await authUser(codeResponse); },
        onError: (error) => console.log('Login Failed:', error)
    });

    return (
        <div className="container">
            {loading ? <Loader isLoading={true} /> : null}
            <div>
                <GoogleLoginButton onClick={onSubmit} cookiePolicy='single-host-origin' className="google-btn">continue with Google</GoogleLoginButton>
            </div>
        </div>

    );
}

export default GoogleLoginAuth;


