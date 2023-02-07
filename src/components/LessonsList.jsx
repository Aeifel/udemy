import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "../styles/LessonElement.module.css";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PendingIcon from '@mui/icons-material/Pending';
import { LoginAlert } from "./Alerts";
import { useEffect } from "react";
const LessonList = (props) => {
  const { moduleList, moduleCompleted, setAlertState } = props;
  console.log(moduleList);
  const handleLessonClick = (moduleId) => {
    const {moduleCompleted, setAlertState } = props;
    const userId = localStorage.getItem("userId");
    console.log("From handleLesson");
    console.log(props);
    if (!moduleCompleted) {
      setAlertState(true);
    } else {
      console.log("Shit why");
      console.log(userId);
      console.log(moduleCompleted);
      window.location.href = `http://localhost:3000/lesson/${moduleId}`;
    }
  };
  return (
    <div className={styles.lessonContainer}>
      {moduleList.map((ele , idx) => {
        const { moduleId, name } = ele;
        return (
          <>
            <div
              className={styles.lessonComponent}
              onClick={(e) => handleLessonClick(moduleId)}
            >
              <p>{name}</p>
              {moduleCompleted?moduleCompleted[idx]?<TaskAltIcon
              sx={{color:"#2beb09",fontSize:"2rem",marginLeft:"auto"}}
              />:<PendingIcon/>:null}
            </div>
          </>
        );
      })}
    </div>
  );
};
export default LessonList;
