import LessonVideo from "../components/LessonVideo";
import PdfRenderer from "../components/PdfRenderer";
import { useState, useEffect } from "react";
import styles from "../styles/Lesson.module.css";
import LoadingButton from '@mui/lab/LoadingButton';
import { getCourseApi, getModuleApi } from "../api/coursesApi";
import { Link } from "react-router-dom";
import LessonsSidebar from "../components/LessonsSidebar";
import CompletedBtn from "../components/CompletedBtn";
import Footer from "../components/Footer";
import { getLessonApi } from "../api/CourseApi";
import { markCompletedApi } from "../api/CourseApi";
import { CircularProgress } from "@mui/material";
const Lesson = () => {
  const [videoState, setVideoState] = useState(true);
  const [lesson, setLesson] = useState(null);
  const [moduleList, setModuleList] = useState([]);
  const [completed , setCompleted] = useState(false);
   const handleMarkCompleted = async(e) => {
    e.preventDefault();
    const response = await markCompletedApi();
    if (response.status === 200) {
      setCompleted(true);
    }
    console.log(response);
  }
  const handleLessonChange = (e) =>{
  getLessonApi().then((response) => {
      console.log(response);
      setLesson(response.data.module);
      setCompleted(response.data.module.completion);
    })
  }
  useEffect(() => {
    getLessonApi().then((response) => {
      console.log(response);
      setLesson(response.data.module);
      setCompleted(response.data.module.completion);
    })
  },[]);
  const handleVideoClick = (e) => {
    setVideoState(true);
  };
  const handlePdfClick = (e) => {
    if (videoState) setVideoState(false);
  };
return (
    <>
    {lesson ? 
    <>
      <div className={styles.header}>
        {/* {course ? course.courseTitle: "Loading failed"} : {lesson?lesson.title:"Loading faile"} */}
        {lesson?lesson.title:null}
      </div>
      <div className={styles.pageContainer}>
        <div className={styles.sidebar}>
          <LessonsSidebar handleLessonChange={handleLessonChange}/> 
        </div>
        <div
        >
       </div>
        <div className={styles.mainContent}>
          <p className={styles.description}>
            {lesson?lesson.description:"Loading failed"}
          </p>
          <button className={styles.btn}onClick={(e) => handleVideoClick(e)}>Video</button>
          <button className={styles.btn}onClick={(e) => handlePdfClick(e)}> Pdf Materials</button>
          <div className={styles.contentContainer}>
            {videoState ? (
              <LessonVideo
                VideoUrl={`${lesson ? lesson.videoUrl: ""}`}
              />
            ) : (
              <PdfRenderer
                PdfUrl={`${lesson?lesson.pdfUrl:""}`}
              />
            )}
          </div>
          {/* <CompletedBtn moduleList = {moduleList} course={course} findLessonId={findLessonId} setCompleted={setCompleted} userCompletion ={userCompletion.filter(ele => ele.courseId ==course.courseId)} currentId = {findLessonId()}/> */}
          {completed == false?<div>
            <button onClick = {e => handleMarkCompleted(e)}>Mark as completed</button>
          </div>:<div>Completed</div>}
          <div>
            {lesson.prev ? <button
            onClick = { e => {
              sessionStorage.setItem("lessonId",lesson.prev);
              handleLessonChange(e);
            }}
            >Previous</button>:null}
            {lesson.next ?<button
            onClick = { e => {
              sessionStorage.setItem("lessonId",lesson.next);
              handleLessonChange(e);
            }}
            >Next</button>:null}
          </div>
        </div>
      </div>
      </>
      :<CircularProgress/>}
      <Footer/>
    </>
  );
};
export default Lesson;