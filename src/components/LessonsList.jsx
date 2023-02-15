import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "../styles/LessonElement.module.css";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { LoginAlert } from "./Alerts";
import { useEffect } from "react";
const LessonList = (props) => {
  const { moduleList, moduleCompleted, setAlertState } = props;
  console.log(moduleList);
  const handleLessonClick = (e) => {
    console.log(e);
    const {moduleId} = e;
    sessionStorage.setItem("lessonId" , moduleId);
    const {moduleCompleted, setAlertState } = props;
    const userId = localStorage.getItem("userId");
    console.log("From handleLesson");
    console.log(props);
      console.log(moduleId);
      console.log(e);
  };
  return (
    <div className={styles.lessonContainer}>
      {moduleList.map((ele , idx) => {
        const { _id:moduleId, title:name } = ele;
        return (
          <>
          <Link onClick = {e => {
            sessionStorage.setItem("lessonId" , moduleId);
          }
        }to = "/lesson">
            <div
              className={styles.lessonComponent}
              onClick={(e) => handleLessonClick({moduleId})}
            >
              {moduleCompleted?!moduleCompleted[idx]?<CheckCircleIcon
              sx={{color:"#1d7c50",fontSize:"2rem",}}
              />:null:null}
              <p>{name}</p>
           </div>
           </Link>
          </>
        );
      })}
    </div>
  );
};
export default LessonList;
