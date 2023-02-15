import { Link } from "react-router-dom";
// import styles from "../styles/LessonElement.module.css";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PendingIcon from "@mui/icons-material/Pending";
import { useEffect, useState } from "react";
import { viewCourseApi } from "../api/CourseApi";
import { CircularProgress } from "@mui/material";
const styles = {
  sidebar: {
    backgroundColor: "#f7f9fa",
    height: "100%",
    overflowY: "auto",
  },
  currentLesson: {
    padding: "10px",
    fontFamily: "PrimaryFont",
    fontWeight: "bold",
    fontSize: "1.2rem",
    borderBottom: "1px solid #edf0f2",
    borderLeft: "5px solid var(--blueDark)",
  },
  Lesson: {
    padding: "10px",
    fontFamily: "var(--PrimaryFont)",
    fontWeight: "bold",
    borderBottom: "1px solid #edf0f2",
    opacity: "0.7",
  },
};
const LessonsSidebar = (props) => {
  const { handleLessonChange } = props;
  const [modules, setModules] = useState([]);
  useEffect(() => {
    const courseId = sessionStorage.getItem("courseId");
    viewCourseApi({ courseId: courseId })
      .then((resolve) => {
        console.log(resolve.data.course.modules);
        setModules(resolve.data.course.modules);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div style={styles.sidebar}>
      {modules.map((ele, idx) => {
        const { _id, title } = ele;
        if (_id === sessionStorage.getItem("lessonId")) {
          return (
            <>
              <div
                onClick={(e) => {
                  sessionStorage.setItem("lessonId", _id);
                  handleLessonChange();
                }}
                style={styles.currentLesson}
              >
                {title}
              </div>
            </>
          );
        }
        return (
          <>
            <div
              onClick={(e) => {
                sessionStorage.setItem("lessonId", _id);
                handleLessonChange();
              }}
              style={styles.Lesson}
            >
              {title}
            </div>
          </>
        );
      })}
    </div>
  );
};
export default LessonsSidebar;
