import { ContactSupportOutlined } from "@mui/icons-material";
import { useState,useRef } from "react";
import LessonUploadComponent from "../components/LessonUploadComponent";
import { uploadModuleApi } from "../api/coursesApi";
import Footer from "../components/Footer";
import styles from "../styles/LessonUpload.module.css";
const LessonUpload = () => {
  const [Lessons, setLessons] = useState([]);
  const [fileRefs , setFileRefs] = useState([]);
  const handleAddLesson = (e) => {
    e.preventDefault();
    let newLessons = [...Lessons , <LessonUploadComponent fileRefs = {fileRefs} setFileRefs = {setFileRefs} key={Lessons.length} id = {Lessons.length}/>];
    setLessons(newLessons);
    console.log(Lessons);
  };
  const handleUploadLessons = async(e) => {
    e.preventDefault();
    // fileRefs.map(async(ele) => {
    //   const {titleRef , descRef , videoRef , pdfRef} = ele;
    //   const moduleObj = {
    //     name:titleRef.current.value,
    //     desc:descRef.current.value,
    //     courseId:localStorage.getItem("uploadCourseId")
    //   }
    //   const videoFile = videoRef.current.files[0];
    //   const pdfFile = pdfRef.current.files[0];
    //   console.log(videoFile);
    //   console.log(pdfFile);
    //   let bodyFormData = new FormData();
    //   bodyFormData.append("courseId" , localStorage.getItem("uploadCourseId"));
    //   bodyFormData.append("module" , JSON.stringify(moduleObj));
    //   bodyFormData.append("pdfFile" , pdfFile);
    //   bodyFormData.append("videoFile" , videoFile);
    //   console.log(bodyFormData);
    //   uploadModuleApi(bodyFormData).then((resolve) => {
    //     console.log("")
    //   });
    //   if(response.status == 200) {

    //   }
    //   console.log(response);
    // });
    fileRefs.map(async (ele , idx) => {
      await uploadSingleLesson(idx);
    })
  }
  const uploadSingleLesson = async(idx) => {
    const {titleRef , descRef , videoRef , pdfRef} = fileRefs[idx];
      const moduleObj = {
        name:titleRef.current.value,
        desc:descRef.current.value,
        courseId:localStorage.getItem("uploadCourseId")
      }
      const videoFile = videoRef.current.files[0];
      const pdfFile = pdfRef.current.files[0];
      console.log(videoFile);
      console.log(pdfFile);
      let bodyFormData = new FormData();
      bodyFormData.append("courseId" , localStorage.getItem("uploadCourseId"));
      bodyFormData.append("module" , JSON.stringify(moduleObj));
      bodyFormData.append("pdfFile" , pdfFile);
      bodyFormData.append("videoFile" , videoFile);
      console.log(bodyFormData);
      uploadModuleApi(bodyFormData).then((resolve) => {
       if(resolve.status == 200) {
        console.log(`Lesson ${idx} updated successfully`);
      }
      });
  }

  return (
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
  {/* <button  className = {styles.btnPushable}role="button" onClick={(e) => handleUploadLessons(e)}>
    <span className={styles.btnShadow}></span>
    <span className={styles.btnEdge}></span>
    <span className={styles.btnFront}>
     2. Upload All
    </span>
  </button> */}
</div>
      {/* <button onClick={(e) => handleAddLesson(e)}>Add Lessons</button> */}
      {/* <input type="submit" value="Upload all" /> */}
    </form>
      <Footer/>
    </div>
    </>
  );
};
export default LessonUpload;
