import api from "./axios";

const loginUrl = "user/login"
const signupUrl = "user/signup"
const courseEnrollUrl = "course/enrollCourse"
const getCourseDetailsUrl = "user-course-details/getall"
const markReadUrl = "user/update-module-markasread"
const getUserCoursesUrl = "user/coursesEnrolled"
const getUserDetailsUrl = "user/view";
const getUserCourseDetailsUrl = "/user/completionDetails";
const getLoginDetailsUrl = "/user/userStatus";
const checkEnrollmentUrl = "/user/checkEnrollment";

export const userLoginApi = async(payload) => {
    try{
    const response = await(api.post(loginUrl , payload));
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
export const getUserDetailsApi = async() => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
    try{
        const response = await api.get(getUserDetailsUrl);
        return response;
    }
    catch(error){
        console.log(error.message);
        return error;
    }
}
export const courseEnrollApi = async(payload) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
    try {
        const response = await api.post(courseEnrollUrl , {courseId:sessionStorage.getItem("courseId")});
        return response;
    } catch (error) {
        console.log(error.message);
        return error;
    }
}
export const getCourseDetailsApi = async(payload) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
    try {
        console.log(payload);
        const response = await api.post(getCourseDetailsUrl , payload);
        return response;
    } catch (error) {
        console.log(error.message);
        return error;
    }

}
export const markCompletedApi = async(payload) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
    try {
        console.log(payload);
        const response = await api.put(markReadUrl , payload);
        return response;
    } catch (error) {
        console.log(error.message);
        return error;
    }

}
export const getUserCoursesApi   = async() => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
    console.log(localStorage.getItem("accessToken"));
    try {
        const response = await api.get(getUserCoursesUrl);
        return response;
    } catch (error) {
        console.log(error.message);
        return error;
    }
}
export const getUserCourseDetailsApi = async(payload) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
    // try{
    const response = await api.post(getUserCourseDetailsUrl ,{courseId: sessionStorage.getItem("courseId")});
    return response;
    // }
//     catch(error) {
//         console.log('error catched')
//         console.log(error.message);
//         return error;
//     }
}
export const getLoginDetailsApi = async() => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
    try{
        const response = await api.get(getLoginDetailsUrl);
        return response;
    }
    catch(error){
        console.log(error.message);
        return error;
    }
}

export const checkEnrollmentApi = async(data) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
    try{
        const response = await api.post(checkEnrollmentUrl,data);
        return response;
    }
    catch(error){
        console.log(error.message);
        return error;
    }
}