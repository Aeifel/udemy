import axios from 'axios'
const allCoursesUrl = 'http://localhost:6039/courses/searchall'
const uploadVideoUrl = 'http://localhost:6039/file/upload';
const uploadCourseUrl = 'http://localhost:6039/courses/create';
const uploadModuleUrl = 'http://localhost:6039/modules/create'
const getCourseUrl = 'http://localhost:6039/courses/get-course/'
const getModuleUrl = 'http://localhost:6039/modules/get-module/'
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
export const allCoursesApi = async()=> {
    try{
    const response = await axios.get(allCoursesUrl);
    return await response;
    }
    catch(err) {
        console.log(err);
        return err;
    }
}
export const videoUploadApi = async(filedata) => {
    const response = await axios.post(uploadVideoUrl , filedata);
    return await response;
}
export const uploadCourseApi = async(payload) => {
    try {
        const response = await axios.post(uploadCourseUrl , payload);
        return await response;
    }
    catch(err) {
        console.error(err);
        return err;
    }
}
export const uploadModuleApi = async(payload) => {
    try {
        const response = await axios.post(uploadModuleUrl , payload);
        return await response;
    }
    catch(err) {
        console.error(err);
        return err;
    }
}
export const getCourseApi = async(courseId) => {
    try {
        const reqUrl = getCourseUrl.concat(courseId);
        const response = await axios.get(reqUrl);
        return response;
    }
    catch(err) {
        console.error(err.message);
        return err;
    }
}
export const getModuleApi = async(moduleId) => {
    try {
        const reqUrl = getModuleUrl.concat(moduleId);
        const response = await axios.get(reqUrl);
        return response;
    } catch (err) {
        console.error(err.message);
        return err;
    }
}