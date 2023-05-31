import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LessonUploadComponent from "../components/LessonUploadComponent";
import { uploadLessonApi } from "../api/CourseApi";
import Footer from "../components/Footer";
import styles from "../styles/LessonUpload.module.css";
import { CircularSpinner } from "../components/Loaders";
const LessonUpload = () => {
  const [Lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleAddLesson = (e) => {
    e.preventDefault();
    let newLessons = [
      ...Lessons,
      <LessonUploadComponent key={Lessons.length} id={Lessons.length} />,
    ];
    setLessons(newLessons);
    console.log(Lessons);
  };
  const pageData = (
    <>
      <div style={{ background: "rgb(240,240,240,0.7)" }}>
        <div className={styles.componentContainer}>
          {Lessons.map((Component, i) => {
            return Component;
          })}
        </div>
        <div className={styles.btnContainer}>
          <button
            className={styles.btnPushable}
            role="button"
            onClick={(e) => handleAddLesson(e)}
          >
            <span className={styles.btnShadow}></span>
            <span className={styles.btnEdge}></span>
            <span className={styles.btnFront}>Add More Lessons</span>
          </button>
          <Link to ="/">
          <button
            className={styles.btnPushable}
            role="button"
          >
            <span className={styles.btnShadow}></span>
            <span className={styles.btnEdge}></span>
            <span className={styles.btnFront}>Finish</span>
          </button>
          </Link>
       </div>
        <Footer />
      </div>
    </>
  );
  return <>{pageData}</>;
};
export default LessonUpload;
