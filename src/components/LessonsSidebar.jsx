import { Link } from "react-router-dom";
import styles from "../styles/LessonElement.module.css";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PendingIcon from '@mui/icons-material/Pending';
const LessonsSidebar = (props) => {
  let { moduleList, umodulesCompleted } = props;
  console.log(umodulesCompleted);
  console.log(moduleList);
  const handleLessonChange = (e) => {
window.location.href=`/lesson/${e}`;
  }
 return (
    <div className={styles.lessonContainer}>
      {moduleList.map((ele , idx) => {
        const { moduleId, name } = ele;
        return (
            <div className={styles.lessonComponent}>
              <div onClick={(e) => handleLessonChange(moduleId)} >{idx+1} .{name}{umodulesCompleted?umodulesCompleted[0]?umodulesCompleted[0].modulesCompleted?umodulesCompleted[0].modulesCompleted[idx] == true?<TaskAltIcon/>:<PendingIcon/>:null:null:null}</div>
            </div>
        );
      })}
    </div>
  );
};
export default LessonsSidebar;
