import {useRef} from "react"
import styles from "../styles/LessonUploadComponent.module.css";
import { uploadModuleApi } from "../api/coursesApi";
const LessonUploadComponent = (props) => {
    const {id , fileRefs , setFileRefs} = props;
    const videoRef = useRef(0);
    const pdfRef = useRef(0);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    setFileRefs((oldVal) => [...oldVal , {titleRef , descRef , videoRef , pdfRef}]);
//   const handleUploadLessons = async(e) => {
//     e.preventDefault();
//       const moduleObj = {
//         name:titleRef.current.value,
//         desc:descRef.current.value,
//         courseId:localStorage.getItem("uploadCourseId")
//       }
//       const videoFile = videoRef.current.files[0];
//       const pdfFile = pdfRef.current.files[0];
//       console.log(videoFile);
//       console.log(pdfFile);
//       let bodyFormData = new FormData();
//       bodyFormData.append("courseId" , localStorage.getItem("uploadCourseId"));
//       bodyFormData.append("module" , JSON.stringify(moduleObj));
//       bodyFormData.append("pdfFile" , pdfFile);
//       bodyFormData.append("videoFile" , videoFile);
//       console.log(bodyFormData);
//       const response = await uploadModuleApi(bodyFormData);

//     fileRefs.map(async(ele) => {
//       const {titleRef , descRef , videoRef , pdfRef} = ele;
//       const moduleObj = {
//         name:titleRef.current.value,
//         desc:descRef.current.value,
//         courseId:localStorage.getItem("uploadCourseId")
//       }
//       const videoFile = videoRef.current.files[0];
//       const pdfFile = pdfRef.current.files[0];
//       console.log(videoFile);
//       console.log(pdfFile);
//       let bodyFormData = new FormData();
//       bodyFormData.append("courseId" , localStorage.getItem("uploadCourseId"));
//       bodyFormData.append("module" , JSON.stringify(moduleObj));
//       bodyFormData.append("pdfFile" , pdfFile);
//       bodyFormData.append("videoFile" , videoFile);
//       console.log(bodyFormData);
//       const response = await uploadModuleApi(bodyFormData);
//       if(response.status == 200) {
        
//       }
//       console.log(response);
//     });
//   }
//     const UploadLesson =(e) => {
//         e.preventDefault();
//   const moduleObj = {
//         name:titleRef.current.value,
//         desc:descRef.current.value,
//         courseId:localStorage.getItem("uploadCourseId")
//       }
//       const videoFile = videoRef.current.files[0];
//       const pdfFile = pdfRef.current.files[0];
//       console.log(videoFile);
//       console.log(pdfFile);
//       let bodyFormData = new FormData();
//       bodyFormData.append("courseId" , localStorage.getItem("uploadCourseId"));
//       bodyFormData.append("module" , JSON.stringify(moduleObj));
//       bodyFormData.append("pdfFile" , pdfFile);
//       bodyFormData.append("videoFile" , videoFile);
//       console.log(bodyFormData);
//       uploadModuleApi(bodyFormData).then((resolve) =>
//       {
//         if(resolve.status == 200) {
//             console.log("Lesson updated successfully");
//         }
//       });
//     }

    return(
        <div className={styles.formContainer}>
            <div className={styles.row}>
                <label htmlFor="ModuleTitle">Module Title</label>
                <input type="text" name="ModuleTitle" id="ModuleTitle" ref={titleRef} placeholder="Enter the lesson's title" key={`title${id}`}/>
            </div>
            <div className={styles.row}>
                <label htmlFor="ModuleDescription">Module's Description</label>
                <input type="text" name="ModuleDescription" id="ModuleDescription" ref={descRef} placeholder="Enter a short description of the lesson" key={`description${id}`}/>
            </div>
            <div className={styles.row}>
                <label htmlFor="Video">Lesson's Video</label>
                <input type="file" ref={videoRef}name={`video${id}`} id={`video${id}`} placeholder="Upload the Lesson Video" key={`lessonVideo${id}`}/>
            </div>
            <div className={styles.row}>
                <label htmlFor="Pdf">Lesson's Pdf</label>
                <input type="file" ref={pdfRef }name={`pdf${id}`} id={`pdf${id}`} placeholder="Upload the lesson pdf" key={`lessonPdf${id}`}/>
            </div>
                {/* <button className = {styles.uploadBtn} onClick={ e => UploadLesson(e)}> Upload</button> */}
        </div>
    )
}
export default LessonUploadComponent;