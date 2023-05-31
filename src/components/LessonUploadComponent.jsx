import {useRef , useState} from "react"
import styles from "../styles/LessonUploadComponent.module.css";
import { uploadLessonApi } from "../api/CourseApi";
import { VideoUploadWidget , PdfUploadWidget } from "./UploadWidget";
import { SquareSpinner } from "./Loaders";
import { showSuccessToastNotification ,showErrorToastNotification} from "./Notifications";
const LessonUploadComponent = (props) => {
    const {id , setCount} = props;
    const [videoUrl , setVideoUrl] = useState("");
    const [pdfUrl , setPdfUrl] = useState("");
    const [isLoading , setIsLoading] = useState(false);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const handleUploadLesson = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        const module = {
            title:titleRef.current.value,
            description:descRef.current.value,
            videoUrl:videoUrl,
            pdfUrl:pdfUrl,
        }
        const response = await uploadLessonApi({courseId:localStorage.getItem("uploadCourseId") , module:module});
        if(response.status == 200) {
            showSuccessToastNotification(`Lesson ${id+1}uploaded successfully`);
            setCount(oldVal => oldVal + 1);
            setIsLoading(false);
        }
        else{
            showErrorToastNotification("Error in uploading lesson");
            setIsLoading(false);
        }
    }
   return(
    <>
    {isLoading && <SquareSpinner/>}
    {!isLoading && 
        <div className={styles.formContainer}>
            <div className={styles.row}>
                <p>Module {id+1}</p>
            </div>
            <div className={styles.row}>
                <label htmlFor="ModuleTitle"> Module Title</label>
                <input type="text" name="ModuleTitle" id="ModuleTitle" ref={titleRef} placeholder="Enter the lesson's title" key={`title${id}`}/>
            </div>
            <div className={styles.row}>
                <label htmlFor="ModuleDescription">Module's Description</label>
                <input type="text" name="ModuleDescription" id="ModuleDescription" ref={descRef} placeholder="Enter a short description of the lesson" key={`description${id}`}/>
            </div>
            <div className={styles.row}>
                <label htmlFor="Video">Lesson's Video</label>
                <VideoUploadWidget setUrl={setVideoUrl}/>
            </div>
            <div className={styles.row}>
                <label htmlFor="Pdf">Lesson's Pdf</label>
                <PdfUploadWidget setUrl={setPdfUrl}/>
            </div>
            <div>
                <button className = {styles.uploadBtn} onClick={ e => handleUploadLesson(e)}> Upload</button>
            </div>
        </div>
    }
    </>
    )
}
export default LessonUploadComponent;