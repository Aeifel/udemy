import axios from 'axios'
const api = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 20000000000000,
});
const viewCourseUrl = "/course/view";
const uploadLessonUrl = "/course/addLesson";
const enrollCourseUrl = "/course/enrollCourse";
const uploadCourseUrl = "/course/add";
const getAllCoursesUrl = "/course/all"
const getLessonUrl = "/course/getLesson";
const markCompletedUrl = "/course/markCompleted";
const getNavOptionsUrl = "/course/navOptions"
const postReviewsUrl = "/course/review";
export const getNavOptionsApi = async() => {
    try{
        const response = await api.get(getNavOptionsUrl);
        return response;
    }
    catch(err) {
        console.log("Nav options failure");
        console.log(err);
    }
}
export const uploadCourseApi = async(payload) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
    try{
    const response = await(api.post(uploadCourseUrl , payload));
    return response;
    }
    catch(err) {
        console.log(err);
        return err;
    }
} 
export const uploadLessonApi = async(payload) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
    try{
    const response = await(api.post(uploadLessonUrl , payload));
    return response;
    }
    catch(err) {
        console.log(err);
        return err;
    }
}
export const getAllCoursesApi = async() => {
    try {
        const response = await api.get(getAllCoursesUrl);
        return response;
    } catch (error) {
        console.log(error.message);
        return error;
    }
}
export const viewCourseApi = async(payload) => {
    try {
        const response = await api.post(viewCourseUrl , {
            courseId:sessionStorage.getItem("courseId"),
            msg:"hi"
        });
        return response;
    } catch (error) {
        console.log(error.message);
        return error;
    }
}
export const getLessonApi = async() => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
    try{
        const response = await api.get(`${getLessonUrl}/${sessionStorage.getItem("courseId")}/${sessionStorage.getItem("lessonId")}`);
        return response;
    }
    catch(error){
        console.log(error.message);
        return error;
    }
}
export const markCompletedApi = async(payload) =>{
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
    try {
        const response = await api.post(markCompletedUrl , {
            courseId:sessionStorage.getItem("courseId"),
            lessonId:sessionStorage.getItem("lessonId"),
        });
        return response;
    }
    catch(error){
        console.log(error.message);
        return error;
    }
}
export const postReviewsApi = async(payload) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
    try {
        const response = await api.post(postReviewsUrl , payload);
        return response;
    }
    catch(error){
        console.log(error.message);
        return error;
    }
}