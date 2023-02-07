import axios from 'axios'
const api = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 20000000000000000,
});
const addCourseUrl = "/course/add";
const signupUrl = "/instructor/add";
const loginUrl = "/instructor/login";
const viewUrl = "/instructor/view";
export const instructorSignupApi= async(payload) => {
    try{
    const response = await api.post(signupUrl , payload);
    return response;
    }
    catch(err) {
        console.log("error");
        console.log(err);
    }
}
export const instructorLoginApi = async(payload) => {
    try{
    const response = await api.post(loginUrl , payload);
    return response;
    }
    catch(err) {
        console.log(err);
    }
}
export const instructorViewApi = async(payload) => {
    try{
    const response = await api.post(viewUrl , payload);
    return response;
    }
    catch(err) {
        console.log(err);
    }
}