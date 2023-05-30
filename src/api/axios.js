import axios from "axios";
const api = axios.create({
    baseURL:`${process.env.REACT_APP_API_URL}`,
    timeout:200000000000000,
});
export default api;