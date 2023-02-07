import axios from 'axios'
const api = axios.create({
  baseURL: 'http:localhost:4001',
  timeout: 1000,
});
const viewCourseUrl = "/course/view";
const addLessonUrl = "/course/addLesson";
const enrollCourseUrl = "/course/enrollCourse";