import axios from "axios"

const acess_token = JSON.parse(localStorage.getItem("token"))

class Api {
    constructor() {
        this.axios = axios.create({
            baseURL: "http://localhost:8000/api/v1/",
            timeout: 30000,
            headers: {
                "Authorization": `Token ${acess_token?.token}`
            },
            withCredentials: true,
        })
        this.axios.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                if (error.response.status === 401 && acess_token.token) {
                    this.refreshToken();
                }
                return Promise.reject(error);
            }
        )
    }

 
}

const api = new Api();
export default api;