import axios from "axios";
const api = axios.create({
  baseURL: 'http://localhost:4000/',
  timeout: 200000,
});
const loginUrl = "user/login"
const signupUrl = "user/signup"
const courseEnrollUrl = "user/register-course"
const getCourseDetailsUrl = "user-course-details/getall"
const markReadUrl = "user/update-module-markasread"
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
export const userLoginApi = async(payload) => {
    try{
    const response = await(axios.post(loginUrl , payload));
    return response;
    }
    catch(err) {
        console.log(err);
        return err;
    }
}
export const userSignupApi = async(payload) => {
    try{
    const response = await(api.post(signupUrl, payload));
    return response;
    }
    catch(err) {
        console.log(err);
        return err;
    }
}
export const courseEnrollApi = async(payload) => {
    try {
        const response = await axios.put(courseEnrollUrl , payload);
        return response;
    } catch (error) {
        console.log(error.message);
        return error;
    }
}
export const getCourseDetailsApi = async(payload) => {
    try {
        console.log(payload);
        const response = await axios.post(getCourseDetailsUrl , payload);
        return response;
    } catch (error) {
        console.log(error.message);
        return error;
    }

}
export const markCompletedApi = async(payload) => {
    try {
        console.log(payload);
        const response = await axios.put(markReadUrl , payload);
        return response;
    } catch (error) {
        console.log(error.message);
        return error;
    }

}