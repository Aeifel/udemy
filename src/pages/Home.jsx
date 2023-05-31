import { useEffect ,useState , useContext} from "react";
import {Link} from "react-router-dom"
import MainCarousel from "../components/MainCarousel";
import styles from "../styles/Home.module.css";
import MultiCarousel from "../components/MultiCarousel";
import { getAllCoursesApi } from "../api/CourseApi";
import { getLoginDetailsApi } from "../api/userApi";
import { instructorViewApi } from "../api/InstructorApi";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthContext";
import { CircularSpinner } from "../components/Loaders";
import { showErrorToastNotification } from "../components/Notifications";

const InstructorPanel = (props) => {
  const {instructor} = props;
  console.log(props);
  const {insName ,instructorRating , bio , course} = instructor;
  return (
    <>
    {course && course.length > 0 ?
    <div className={styles.instructorPanel}>
    <h2>Hello there instructor {insName}</h2>
    {instructorRating && <p>Your average rating is {instructorRating}</p>}
    <h2>Courses you have curated</h2>
    <MultiCarousel allCourses = {course}/>
    </div>:
    <div className={styles.instructorPanel}>
    <h2>Hello there instructor {insName}</h2>
    <p>Start sharing your knowledge , upload your courses</p>
    </div>}
    </>
  )
}

const StudentPanel = (props) => {
  const {student} = props;
  const {userName ,userEmail , coursesEnrolled} = student;
return (
  <>
  {coursesEnrolled && coursesEnrolled.length > 0 ?
  <div className={styles.studentPanel}>
  <h2>Continue Learning {userName}</h2>
  <h3>Enrolled courses</h3>
  <MultiCarousel allCourses = {coursesEnrolled}/>
  </div>:
  <div className={styles.studentPanel}>
  <h2>Enroll in your first course and Start Learning {userName}</h2>
  </div>}
  </>
)
}
const Home = () => {
  const [allCourses , setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user , setUser] = useState({});
  const {auth , type} = useContext(AuthContext);
 useEffect(() => {
    setIsLoading(true);
    const fetchFun = async() => {
      return await getAllCoursesApi();
    }
    fetchFun().then((response) => {
      setCourses(response.data);
      if (auth && type === "student"){
        getLoginDetailsApi().then((user) => {
          console.log(user.data);
          setUser(user.data);
        }).catch((err) => {
          // showErrorToastNotification("Error in fetching user details");
        });
      }
      else if (auth && type === "instructor"){
        instructorViewApi().then((user) => {
          setUser(user.data);
        }).catch((err) => {
          // showErrorToastNotification("Error in fetching user details");
        });
      }
     setIsLoading(false);
    }).catch((err) => {
      showErrorToastNotification("Server Error");
      setIsLoading(false);
    });
  },[]);
 console.log(allCourses);
  return (
    <>
    {isLoading? <CircularSpinner/>:
    <>
      <MainCarousel/>
      {type == "instructor"?<InstructorPanel instructor={user}/>:type == "student"?<StudentPanel student={user}/>:null}
      <div className={styles.content}>
       <h2 className={styles.heading}>A broad selection of courses</h2>
       <p className={styles.text}>Get job ready for an in-demand career</p>
      </div>
      <div style={{ paddingLeft: "1.5rem" }}>
        <MultiCarousel allCourses = {allCourses} />
      </div>
      <div>
        <h2 className={styles.heading} style={{marginLeft:'1rem'}}>Top categories</h2>
        <div className = {styles.categoryGrid}>
          <div>
            <img src = "/development.jpg" className = {styles.categoryImg}></img>
            <p>Development</p>
          </div>
          <div>
            <img src = "/business.jpg" className = {styles.categoryImg}></img>
            <p>Business</p>
          </div>
          <div>
            <img src = "/itandSoftware.jpg" className = {styles.categoryImg}></img>
            <p>IT and Software</p>
          </div>
          <div>
            <img src = "/personalDevelopment.jpg" className = {styles.categoryImg}></img>
            <p>Personal Development</p>
          </div>
          <div>
            <img src = "/design.jpg" className = {styles.categoryImg}></img>
            <p>Design</p>
          </div>
          <div>
            <img src = "/marketing.jpg" className = {styles.categoryImg}></img>
            <p>Marketing</p>
          </div>
          <div>
            <img src = "/photography.jpg" className = {styles.categoryImg}></img>
            <p>Photography</p>
          </div>
          <div>
            <img src = "/music.jpg" className = {styles.categoryImg}></img>
            <p>Music</p>
          </div>
        </div>
      </div>
      {!auth || (auth && type === "instructor") ? <div className={styles.flexContainer}>
        <img src="/instructor.jpg" className={styles.insImg}></img>
        <div className={styles.insContent}>
          <h2>Become an instructor</h2>
          <p>
            Instructors from around the world teach millions of students on
            Udemy. We provide the tools and skills to teach what you love.
          </p>
         <Link to = "/courseRegister"><button >Upload the course</button></Link> : 
        </div>
      </div>:null}
      <Footer/>
      </>
        }
    </>
  );
};
export default Home;