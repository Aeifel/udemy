import styles from "../styles/Course.module.css";
import { useEffect , useState , useContext } from "react";
import UserCourseDetails from "../components/UserCourseDetails";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import DoneIcon from "@mui/icons-material/Done";
import { getCourseApi, getModuleApi } from "../api/coursesApi";
import { courseEnrollApi, getCourseDetailsApi } from "../api/userApi";
import LessonList from "../components/LessonsList";
import { InvalidUserTypeAlert, LoginAlert } from "../components/Alerts";
import { viewCourseApi } from "../api/CourseApi";
import { DualSpinner } from "../components/Loaders";
import { CircularSpinner } from "../components/Loaders";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";
import { SetCourseContext } from "../contexts";
import BuyCourse from "../components/BuyCourse";
const Course = () => {
  const [course , setCourse] = useState(null);
  const [alertState , setAlertState] = useState(false);
  const [invalidType , setInvalidType] = useState(false);
  const [userCourseDetails , setUserCourseDetails] = useState({});
  const [enrolled , setEnrolled] = useState(false);
  const [isLoading , setIsLoading] = useState(false);
  const setCourseInterested   = useContext(SetCourseContext);
 useEffect(() => {
    setIsLoading(true);
    const courseId = sessionStorage.getItem('courseId');
    console.log(courseId);
    viewCourseApi({courseId:courseId}).then((resolve) => {
      console.log(resolve.data);
      setCourse(resolve.data.course);
      setCourseInterested(resolve.data.course);
    }).catch((err) => {
      console.log(err);
    });
    setIsLoading(false);
  },[]);
  const handleCourseEnrollment = async(e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");
    if(userId == null) {
      setAlertState(true);
      return;
    }
    if(userType === "Instructor") {
      setInvalidType(true);
    }
    if(userType === "Student") {
        let bodyFormData = new FormData();
     let courseId = window.location.href;
    courseId = courseId.split('/');
    courseId = courseId[courseId.length-1];
        bodyFormData.append('userId' , localStorage.getItem("userId"));
        bodyFormData.append('courseId' ,courseId);
        const response = await courseEnrollApi(bodyFormData);
        console.log(response);
        const temp = window.location.href;
        window.location.href = temp;
    }
  }
  return (
   <>
    {/* {alertState ? LoginAlert(setAlertState) : null} */}
    {/* {invalidType? InvalidUserTypeAlert(setInvalidType):null} */}
    {isLoading ? <CircularSpinner/>:
    <>
        <div className={styles.header}>
          <h2>{course?course.courseTitle:"Course Title"}</h2>
          <p>
            {course?course.description:"Course description"}
          </p>
          <div className={styles.details}>
            <p>Instructor:{course?course.instructor?course.instructor.insName:"Instructor point":null}</p>
            <p>Course Language:{course?course.language:"Course language"}</p>
            <p>Category:{course?course.category:"Course Category"}</p>
          </div>
        </div>
 
    <div className={styles.bodyContainer}>

      <div className={styles.leftCol}>
       <div className={styles.listContainer}>
          <h2 style={{ fontWeight: "bold" }}>What you'll learn</h2>
            <div className={styles.flexContainer}>
              <div>
                <li>
                  <DoneIcon sx={{ marginRight: "10px" }} />
                  {course?course.keypoints[0]:""}
                </li>
                <li>
                  <DoneIcon sx={{ marginRight: "10px" }} />
                  {/* {learningPoints[1]} */}
                  {course?course.keypoints[1]:""}
                </li>
                <li>
                  <DoneIcon sx={{ marginRight: "10px" }} />
                  {course?course.keypoints[2]:""}
                </li>
              </div>
              <div>
                <li>
                  <DoneIcon sx={{ marginRight: "10px" }} />
                  {/* {learningPoints[3]} */}
                  {course?course.keypoints[3]:""}
                </li>
                <li>
                  <DoneIcon sx={{ marginRight: "10px" }} />
                  {/* {learningPoints[4]} */}
                  {course?course.keypoints[4]:""}
                </li>
                <li>
                  <DoneIcon sx={{ marginRight: "10px" }} />
                  {/* {learningPoints[5]} */}
                  {course?course.keypoints[5]:""}
                </li>
              </div>
            </div>
        </div>
        <div className={styles.courseContent}>
          <h2>Course Content</h2>
        <LessonList moduleList = {course?course.modules : []} setAlertState={setAlertState} moduleCompleted = {userCourseDetails ? userCourseDetails: null}/>
        </div>
     </div>
      <div className={styles.rightCol}>
        {/* <div className={styles.filler}></div> */}
        <div className={styles.courseCard}>
          <img src={`${course ?course.courseImg:''}`} style={{
            width:"100%",
            height:"200px"
          }}></img>
          <h2>{course? course.courseTitle:'Course Title'}</h2>
          <p>Number of Enrollments:{course?course.numberOfEnrollments:null}</p>
          <ul>
            <li>{course?course.learningPoints[0]:null}</li>
            <li>{course?course.learningPoints[1]:null}</li>
            <li>{course?course.learningPoints[2]:null}</li>
          </ul>
          {/* {enrolled == false? 
          <button onClick = {(e) => handleCourseEnrollment(e)} className={styles.enrollBtn}> Enroll Now</button>:
            <p>Course completed percentage:{userCourseDetails.courseCompletedPercentage}</p>
          } */}
          <p>Cost:{course?course.cost:null}</p>
          <UserCourseDetails setUserCourseDetails={setUserCourseDetails} course={course}/>
        </div>
      </div>
    </div>
    <div>
      <Reviews reviews = {course?course.reviews?course.reviews:null:null} userCourseDetails = {userCourseDetails}/>
    </div>
      <Footer/>
    </>
    }
    </>
  );
};
export default Course;
