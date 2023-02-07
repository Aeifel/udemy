import LessonVideo from "../components/LessonVideo";
import PdfRenderer from "../components/PdfRenderer";
import { useState, useEffect } from "react";
import styles from "../styles/Lesson.module.css";
import { getCourseApi, getModuleApi } from "../api/coursesApi";
import { getCourseDetailsApi, markCompletedApi } from "../api/userApi";
import { Link } from "react-router-dom";
import LessonsSidebar from "../components/LessonsSidebar";
import CompletedBtn from "../components/CompletedBtn";
import Footer from "../components/Footer";
const Lesson = () => {
  const [videoState, setVideoState] = useState(true);
  const [course, setCourse] = useState({});
  const [lesson, setLesson] = useState({});
  const [moduleList, setModuleList] = useState([]);
  const [userCompletion , setUserCompletion] = useState([]);
  const [completed , setCompleted] = useState(false);
  const userId = localStorage.getItem("userId");
  console.log(userId);
  const findLessonId = () => {
    let lessonId = window.location.href;
    lessonId = lessonId.split("/");
    lessonId = lessonId[lessonId.length - 1];
    return lessonId;
  };
  const findCurrentLesson = async () => {
    const currentId = findLessonId();
    //need the course id now shite
  };
  const getSingleModule = (course , idx) => {
    // if(idx > course.modulesList.length){
    //   return;
    // }
    console.log(course);
    const {modulesList} = course;
    const ele = modulesList[idx];
    getModuleApi(ele).then((resolve) => {
      console.log("hi");
      const{moduleId , name} = resolve.data;
      console.log(resolve.data);
      setModuleList((oldVal) => oldVal?[...oldVal , {moduleId , name}] : [{moduleId,name}]);
      getSingleModule(course,idx+1);
    }).catch(err => console.log(err));
  }
  // const getModulesList = async (course) => {
  //   const { modulesList } = course;
  //   let moduleArr = [];
  //   modulesList.forEach(async (ele) => {
  //     const response = await getModuleApi(ele);
  //     const { moduleId, name } = response.data;
  //     setModuleList((oldVal) => oldVal?[...oldVal , {moduleId , name}] : [{moduleId,name}]);
  //     moduleArr.push({ moduleId, name });
  //   });
  //   return moduleArr;
  // };
  const fetchAll = async () => {
  let lessonId = window.location.href;
    lessonId = lessonId.split("/");
    lessonId = lessonId[lessonId.length - 1];
    console.log(lessonId);
    let myLesson;
    let myCourse;
    let mymoduleList;
    getModuleApi(lessonId).then((resolve) => {
      myLesson = resolve.data;
    setLesson(myLesson);
      const { courseId } = resolve.data;
      getCourseApi(courseId).then((resolve) => {
        console.log("1");
        console.log(resolve.data);
        myCourse = resolve.data;
    setCourse(myCourse);
      let bodyFormData = new FormData();
      bodyFormData.append('userId' ,localStorage.getItem("userId") );
      getCourseDetailsApi(bodyFormData).then((resolve) => {
        console.log("Deta");
        console.log(resolve.data);
        console.log(course.courseId);
        setUserCompletion(resolve.data);
        console.log(userCompletion);
      })
        // setCourse(resolve.data);
        getSingleModule(resolve.data , 0);
        console.log("2");
        // console.log(response);
      });
   });
  };
  useEffect(() => {
    fetchAll()
  },[]);
  const handleVideoClick = (e) => {
    setVideoState(true);
  };
  const handlePdfClick = (e) => {
    if (videoState) setVideoState(false);
  };
return (
    <>
      <div className={styles.header}>
        {course ? course.courseTitle: "Loading failed"} : {lesson?lesson.name:"Loading faile"}
      </div>
      <div className={styles.pageContainer}>
        <div className={styles.sidebar}>
            <LessonsSidebar moduleList={moduleList} umodulesCompleted={userCompletion.filter(ele => ele.courseId == course.courseId)}/>
          {/* {
          moduleList
            ? moduleList.map((ele , index) => <div onClick ={(e) => handleLessonChange(ele.moduleId)}>{ele.name}
      {userCompletion.map((ele , sindex) => {
            if(ele.courseId == course.courseId &&index==sindex){
                return ele.modulesCompleted.map((ele) => {
                    return ele? "true" : "false";
                })
            }
            {
                userCompletion.filter((ele , index) => {
                    ele.c
                })
            }
            return null;
        })}
            
            </div>)
            :null} */}
       
        </div>
        <div
        >
       </div>
        <div className={styles.mainContent}>
          <p className={styles.description}>
            {lesson?lesson.desc:"Loading failed"}
          </p>
          <button className={styles.btn}onClick={(e) => handleVideoClick(e)}>Video</button>
          <button className={styles.btn}onClick={(e) => handlePdfClick(e)}> Pdf Materials</button>
          <div className={styles.contentContainer}>
            {videoState ? (
              <LessonVideo
                VideoUrl={`http://localhost:6039/file/download/${lesson ? lesson.videoContent: ""}`}
              />
            ) : (
              <PdfRenderer
                PdfUrl={`http://localhost:6039/file/download/${lesson?lesson.pdfContent:""}`}
              />
            )}
          </div>
          <CompletedBtn moduleList = {moduleList} course={course} findLessonId={findLessonId} setCompleted={setCompleted} userCompletion ={userCompletion.filter(ele => ele.courseId ==course.courseId)} currentId = {findLessonId()}/>
        </div>
      </div>
      <Footer/>
    </>
  );
};
export default Lesson;
