import axios from 'axios'
const api = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 20000000000000,
});
const viewCourseUrl = "/course/view";
const uploadLessonUrl = "/course/addLesson";
const enrollCourseUrl = "/course/enrollCourse";
const uploadCourseUrl = "/course/add";
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