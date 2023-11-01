import axios from "axios";

const axiosApi = axios.create({
    baseURL: "http://165.227.68.14:8080",
    headers: {
        "content-type": "application/json" 
    }
})

export default axiosApi
