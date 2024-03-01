import axios from 'axios';
import { getUserByEmail } from '../../../api/fetchApi';

//get info from database google
export const getInfoUser = async (response) => {

    const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`, {
        headers: {
            Authorization: `Bearer ${response.access_token}`,
            Accept: 'application/json'
        }
    }
    );

    const dataUserGoogle = { "name": res.data.name, "email": res.data.email, "image": res.data.picture };
    return dataUserGoogle;
};

//verify if the email It's already in the dateBase
export const isActiveUser = async (email) => {
    const res = await getUserByEmail(email);
    return res;
};