import axios from 'axios';
import { getUserByEmail } from '../../../api/fetchApi';

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



export const isActiveUser = async (email) => {
    const res = await getUserByEmail(email);
    return res;
}