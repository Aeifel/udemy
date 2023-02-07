import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { getUserCoursesApi } from "../api/userApi";
import { getUserDetailsApi } from "../api/userApi";
import { CircularSpinner } from "../components/Loaders";
import CourseCard from "../components/CourseCards";
import styles from "../styles/UserProfile.module.css";
const UserProfile = () => {
  const [coursesEnrolled, setCoursesEnrolled] = useState([]);
  const [userDetails , setUserDetails] = useState({});
  const[isLoading , setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true)
    getUserDetailsApi().then((response) =>{
        console.log(response);
        const user=response.data;
        getUserCoursesApi().then((response) =>{
            console.log(response);
            setUserDetails(user);
            setCoursesEnrolled(response.data.courses.coursesEnrolled);
            setIsLoading(false);
    })
})
    // getUserDetails();
    console.log(coursesEnrolled);
    console.log(userDetails);
  }, []);

  const pageData = (
    <>
      <div className={styles.profileCard}>
        <Avatar
          alt="Remy Sharp"
          src={userDetails.profileImg}
          sx={{ width: "100px", height: "100px",marginInline:"20px" }}
        />
        <div>
            <h2>{userDetails.userName}</h2>
            <p>{userDetails.userEmail}</p>
        </div>
      </div>
      <div className={styles.coursesEnrolled}>
        <h2>Courses you have enrolled</h2>
        <div className={styles.gridWrapper}>
            {coursesEnrolled.length >= 0? coursesEnrolled.map((course) => {
                return(
                    <>
                    <CourseCard course={course} />
                    </>
                )
            }
            ):<p>No courses enrolled</p>}
        </div>
        </div>
    </>
  )

  return (
    <>
    {isLoading ? <CircularSpinner/>:pageData}
    </>
 );
};
export default UserProfile;
