import MainCarousel from "../components/MainCarousel";
import styles from "../styles/Home.module.css";
import MultiCarousel from "../components/MultiCarousel";
import {Link} from "react-router-dom"
import { useEffect ,useState , useMemo} from "react";
import { getAllCoursesApi } from "../api/CourseApi";
import { getLoginDetailsApi } from "../api/userApi";
import { InstructorAlert, LoginAlert } from "../components/Alerts";
import Footer from "../components/Footer";
import { CircularSpinner } from "../components/Loaders";
const InstructorPanel = (props) => {
  const {instructor} = props;
  console.log(props);
  const {insName ,instructorRating , bio , course} = instructor;
  return (
    <>
    <div className={styles.instructorPanel}>
    <h2>Hello there instructor {insName}</h2>
    <p>Your average rating is {instructorRating}</p>
    <h2>Courses you have curated</h2>
    <MultiCarousel allCourses = {course}/>
    </div>
    </>
  )
}
const StudentPanel = (props) => {
  const {student} = props;
  const {userName ,userEmail , coursesEnrolled} = student;
return (
  <>
  <div className={styles.studentPanel}>
  <h2>Continue Learning {userName}</h2>
  <h3>Enrolled courses</h3>
  <MultiCarousel allCourses = {coursesEnrolled}/>
  </div>
  </>
)
}
const Home = () => {
  const [allCourses , setCourses] = useState([]);
  const [alertState , setAlertState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType , setUserType] = useState("");
  const [user , setUser] = useState({});
 useEffect(() => {
    setIsLoading(true);
    console.log("Home useEffect");
    const fetchFun = async() => {
      return await getAllCoursesApi();
    }
    fetchFun().then((response) => {
      console.log(response);
      setCourses(response.data);
      console.log(response);
      setCourses(response.data);
      getLoginDetailsApi().then((response) => {
        console.log("Login details");
        console.log(response);
        if ( response.data.userType){
          setUserType('instructor');
        }
        else {
          setUserType('student');
        }
        setUser(response.data);
      }).catch((error) => {
        console.log(error);
        setUserType('notLoggedIn');
      });
      setIsLoading(false);
    })
  },[]);
 console.log(allCourses);
  return (
    <>
    {isLoading? <CircularSpinner/>:
    <>
    {alertState?InstructorAlert(setAlertState):null}
      <MainCarousel/>
      {userType == "instructor"?<InstructorPanel instructor={user}/>:userType == "student"?<StudentPanel student={user}/>:null}
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
      <div className={styles.flexContainer}>
        <img src="/instructor.jpg" className={styles.insImg}></img>
        <div className={styles.insContent}>
          <h2>Become an instructor</h2>
          <p>
            Instructors from around the world teach millions of students on
            Udemy. We provide the tools and skills to teach what you love.
          </p>
         <Link to = "/courseRegister"><button >Upload the course</button></Link> : 
        </div>
      </div>
      <Footer/>
      </>
        }
    </>
  );
};
export default Home;