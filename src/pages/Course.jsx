import { useEffect , useState , useContext } from "react";
import UserCourseDetails from "../components/UserCourseDetails";
import DoneIcon from "@mui/icons-material/Done";
import LessonList from "../components/LessonsList";
import { viewCourseApi } from "../api/CourseApi";
import { CircularSpinner } from "../components/Loaders";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";
import styles from "../styles/Course.module.css";
import { CourseContext } from "../contexts/CourseContext";
const Course = () => {
  const [course , setCourse] = useState(null);
  const [alertState , setAlertState] = useState(false);
  const [userCourseDetails , setUserCourseDetails] = useState({});
  const [isLoading , setIsLoading] = useState(false);
  const {setCurrentCourse} = useContext(CourseContext);
 useEffect(() => {
    setIsLoading(true);
    const courseId = sessionStorage.getItem('courseId');
    setCurrentCourse(courseId);
    viewCourseApi({courseId:courseId}).then((resolve) => {
      setCourse(resolve.data.course);
    }).catch((err) => {
      console.log(err);
    });
    setIsLoading(false);
  },[]);
 return (
   <>
    {isLoading ? <CircularSpinner/>:
    <div className={styles.bodyWrapper}>
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
                  {course?course.keypoints[3]:""}
                </li>
                <li>
                  <DoneIcon sx={{ marginRight: "10px" }} />
                  {course?course.keypoints[4]:""}
                </li>
                <li>
                  <DoneIcon sx={{ marginRight: "10px" }} />
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
          <p>Cost:{course?course.cost:null}</p>
          <UserCourseDetails setUserCourseDetails={setUserCourseDetails} course={course}/>
        </div>
      </div>
    </div>
    <div>
      <Reviews reviews = {course?course.reviews?course.reviews:null:null} userCourseDetails = {userCourseDetails}/>
    </div>
      <Footer/>
    </div>
    }
    </>
  );
};
export default Course;
