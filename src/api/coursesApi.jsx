import api from './axios';
const allCoursesUrl = '/courses/searchall'
const uploadVideoUrl = '/file/upload';
const uploadCourseUrl = '/courses/create';
const uploadModuleUrl = '/modules/create'
const getCourseUrl = '/courses/get-course/'
const getModuleUrl = '/modules/get-module/'
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
export const allCoursesApi = async()=> {
    try{
    const response = await api.get(allCoursesUrl);
    return await response;
    }
    catch(err) {
        console.log(err);
        return err;
    }
}
export const videoUploadApi = async(filedata) => {
    const response = await api.post(uploadVideoUrl , filedata);
    return await response;
}
export const uploadCourseApi = async(payload) => {
    try {
        const response = await api.post(uploadCourseUrl , payload);
        return await response;
    }
    catch(err) {
        console.error(err);
        return err;
    }
}
export const uploadModuleApi = async(payload) => {
    try {
        const response = await api.post(uploadModuleUrl , payload);
        return response;
    }
    catch(err) {
        console.error(err);
        return err;
    }
}
export const getCourseApi = async(courseId) => {
    try {
        const reqUrl = getCourseUrl.concat(courseId);
        const response = await api.get(reqUrl);
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
        const response = await api.get(reqUrl);
        return response;
    } catch (err) {
        console.error(err.message);
        return err;
    }
}