import MainCarousel from "../components/MainCarousel";
import styles from "../styles/Home.module.css";
import MultiCarousel from "../components/MultiCarousel";
import {Link} from "react-router-dom"
import { useEffect ,useState , useMemo} from "react";
import { getAllCoursesApi } from "../api/CourseApi";
import { InstructorAlert, LoginAlert } from "../components/Alerts";
import Footer from "../components/Footer";
import { CircularSpinner } from "../components/Loaders";
const Home = () => {
  const [allCourses , setCourses] = useState([]);
  const [alertState , setAlertState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userType = localStorage.getItem("userType");
 const checkInstructor = (e) => {
    //const userType = localStorage.getItem("userType");
    //console.log(userType);
    const userType = null;
    if (userType == null || userType == "Student") {
      setAlertState(true);
      return;
    }
  }
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
      <div className={styles.content}>
        {localStorage.getItem("userType") === "Student" ? <h2 style={{fontFamily:"SecondaryFont"}} >Continue Learning {localStorage.getItem("userName")}...</h2> :
        localStorage.getItem("userType") === "Instructor"?<h2 style={{fontFamily:"SecondaryFont"}}>Hello Instructor {localStorage.getItem("userName")}</h2>:
        null
        }
        <h2 className={styles.heading}>A broad selection of courses</h2>
       <p className={styles.text}>Get job ready for an in-demand career</p>
      </div>
      <div style={{ paddingLeft: "1.5rem" }}>
        <MultiCarousel allCourses = {allCourses} />
      </div>
      <div className={styles.flexContainer}>
        <img src="/instructor.jpg" className={styles.insImg}></img>
        <div className={styles.insContent}>
          <h2>Become an instructor</h2>
          <p>
            Instructors from around the world teach millions of students on
            Udemy. We provide the tools and skills to teach what you love.
          </p>
          {userType ==="Instructor" ? <Link to = "/courseRegister"><button >Upload the course</button></Link> : 
          <button onClick = {e => checkInstructor(e)}>Upload a course</button>
          }
        </div>
      </div>
      <Footer/>
      </>
        }
    </>
  );
};
export default Home;
