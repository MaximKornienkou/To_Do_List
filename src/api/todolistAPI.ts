import axios from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "59351494-37f1-4114-8206-923aa7d46da6",
    },
});

export const todolistAPI = () => {

}