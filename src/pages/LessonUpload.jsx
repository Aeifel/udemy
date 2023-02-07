import { ContactSupportOutlined } from "@mui/icons-material";
import { useState,useRef } from "react";
import LessonUploadComponent from "../components/LessonUploadComponent";
import { uploadLessonApi } from "../api/CourseApi";
import Footer from "../components/Footer";
import styles from "../styles/LessonUpload.module.css";
import { CircularSpinner } from "../components/Loaders";
const LessonUpload = () => {
  const [Lessons, setLessons] = useState([]);
  const [fileRefs , setFileRefs] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const handleAddLesson = (e) => {
    e.preventDefault();
    let newLessons = [...Lessons , <LessonUploadComponent fileRefs = {fileRefs} setFileRefs = {setFileRefs} key={Lessons.length} id = {Lessons.length}/>];
    setLessons(newLessons);
    console.log(Lessons);
  };
  // const handleUploadLessons = async(e) => {
  //   e.preventDefault();
  //   // fileRefs.map(async(ele) => {
  //   //   const {titleRef , descRef , videoRef , pdfRef} = ele;
  //   //   const moduleObj = {
  //   //     name:titleRef.current.value,
  //   //     desc:descRef.current.value,
  //   //     courseId:localStorage.getItem("uploadCourseId")
  //   //   }
  //   //   const videoFile = videoRef.current.files[0];
  //   //   const pdfFile = pdfRef.current.files[0];
  //   //   console.log(videoFile);
  //   //   console.log(pdfFile);
  //   //   let bodyFormData = new FormData();
  //   //   bodyFormData.append("courseId" , localStorage.getItem("uploadCourseId"));
  //   //   bodyFormData.append("module" , JSON.stringify(moduleObj));
  //   //   bodyFormData.append("pdfFile" , pdfFile);
  //   //   bodyFormData.append("videoFile" , videoFile);
  //   //   console.log(bodyFormData);
  //   //   uploadModuleApi(bodyFormData).then((resolve) => {
  //   //     console.log("")
  //   //   });
  //   //   if(response.status == 200) {

  //   //   }
  //   //   console.log(response);
  //   // });
  //   fileRefs.map(async (ele , idx) => {
  //     await uploadSingleLesson(idx);
  //   })
  // }
  const handleUploadLesson = async( e , idx) => {
    e.preventDefault();
    setIsLoading(true);
    const {titleRef , descRef , videoRef , pdfRef} = fileRefs[idx];
const obj = {
  title:titleRef.current.value,
  description:descRef.current.value,
}
const formData = new FormData();
formData.append('lesson' , JSON.stringify(obj));
formData.append('pdfFile' , pdfRef.current.files[0]);
formData.append('videoFile' , videoRef.current.files[0]);
formData.append('courseId' , localStorage.getItem("uploadCourseId"));
const response = await uploadLessonApi(formData);
if(idx < fileRefs.length-1) {
  handleUploadLesson(e,idx+1);
  }
else{
  setIsLoading(false);
  return;
}
  }

  return (
    <>
    {isLoading?
    <CircularSpinner/>: 
     <>
    <div style={{background:"rgb(240,240,240,0.7)"}}>
    <form>
      <div className={styles.componentContainer}>
        {Lessons.map((Component, i) => {
          return Component;
        })}
      </div>
<div className={styles.btnContainer}>
  <button  className = {styles.btnPushable}role="button" onClick={(e) => handleAddLesson(e)}>
    <span className={styles.btnShadow}></span>
    <span className={styles.btnEdge}></span>
    <span className={styles.btnFront}>
     1. Add Lessons
    </span>
  </button>
  <button onClick={(e) => handleUploadLesson(e , 0)} className = {styles.btnPushable}role="button">
    <span className={styles.btnShadow}></span>
    <span className={styles.btnEdge}></span>
    <span className={styles.btnFront}>
     2. Upload All
    </span>
  </button>
</div>
    </form>
      <Footer/>
    </div>
    </>}
    </>
  );
};
export default LessonUpload;
