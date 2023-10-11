import axios from 'axios';


const BASE_URL = 'http://ec2-54-159-131-208.compute-1.amazonaws.com/api/'

export const GetMethod = async ({ url }) => {
    try {
        const userToken = localStorage.getItem('userToken');
        const res = await axios.get(`${BASE_URL}${url}`, { headers: { 'Authorization': `${userToken}` } });
        return res.data;
    } catch (err) {
        return err
    }
}
export const GetByIdMethod = async ({ url, id }) => {
    try {
        const userToken = localStorage.getItem('userToken');
        const res = await axios.get(`${BASE_URL}${url}/${id}`, { headers: { 'Authorization': `${userToken}` } });
        return res.data;
    } catch (err) {
        return err
    }
}
export const PostMethod = async ({ url, body }) => {
    try {
        const userToken = localStorage.getItem('userToken');
        const res = await axios.post(
            `${BASE_URL}${url}`,
            body,
            { headers: { 'Authorization': `${userToken}` } }
        );
        return res.data;
    } catch (err) {
        return err
    }
}
export const PutMethod = async ({ url, id, body }) => {
    try {
        const userToken = localStorage.getItem('userToken');
        const res = await axios.put(`${BASE_URL}${url}/${id}`,
            body,
            { headers: { 'Authorization': `${userToken}` } }
        );
        return res.data;
    } catch (err) {
        return err
    }
}
export const DeleteMethod = async ({ url, id }) => {
    try {
        const userToken = localStorage.getItem('userToken');
        const res = await axios.delete(`${BASE_URL}${url}/${id}`, { headers: { 'Authorization': `${userToken}` } });
        return res.data;
    } catch (err) {
        return err
    }
}
export const LoginMethod = async ({ url, body }) => {

    const res = await axios.post(
        `${BASE_URL}${url}`,
        body,
    );
    return res.data;

}