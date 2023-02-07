import { style } from "@mui/system";
import { markCompletedApi } from "../api/userApi";
import styles from "../styles/Btn.module.css"
import DoneIcon from "@mui/icons-material/Done";
const CompletedBtn = (props) => {
  const { moduleList, userCompletion, currentId ,setCompleted , course , findLessonId} = props;
  let idx = 0;
  moduleList.forEach((ele, i) => {
    if (ele.moduleId == currentId) {
      idx = i;
    }
  });
  let status = userCompletion[0];
  console.log(status);
  console.log(idx);
  status = status ? status.modulesCompleted[idx] : null;
  const handleCompleted = (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("userId", localStorage.getItem("userId"));
    bodyFormData.append("courseId", course.courseId);
    bodyFormData.append("moduleId", findLessonId());
    markCompletedApi(bodyFormData)
      .then((resolve) => {
        console.log(resolve);
        setCompleted(true);//only to force a reload ,failed
        const temp = window.location.href;
        window.location.href=temp;
      })
      .catch((err) => console.error(err));
  };
  const mystyles = {
    text:{
      fontFamily:"PrimaryFont",
      color:"#2beb09",
      fontSize:"1.3rem",
      display:"flex",
      alignItems:"center"
    }

  }

  return (
    <>
      {status != null
        ? status == false
          ?<button onClick={e => handleCompleted(e)} className={styles.mybtn}>Mark as completed</button> 
          : status == true
          ? <p style={mystyles.text}><DoneIcon/>Completed Lesson</p>
          : null
        : null}
    </>
  );
};
export default CompletedBtn;
