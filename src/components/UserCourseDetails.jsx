import { useEffect,useState } from "react";
import { getUserCourseDetailsApi } from "../api/userApi";
import BuyCourse from "./BuyCourse";
const UserCourseDetails = (props) => {
    const {setUserCourseDetails , course} = props;
    const [userState , setUserState] = useState({});
    const [courseCompletionDetails , setCourseCompletionDetails] = useState(null);
    const fetchFun = async() =>{
        try{
        const response = await getUserCourseDetailsApi();
        console.log(response);
        console.log("user enrolled course");
        setUserState("enrolled");
        // setCourseCompletionDetails(response.data.completionDetails);
        setUserCourseDetails(response.data.completionDetails);
        }
        catch(err){
            console.log(err.response);
            const errResponse = err.response;
            if(errResponse.status === 403){
                setUserState("notAuthorized");
                console.log("Unauthorized");
            }
            else if (errResponse.status === 402){
                setUserState("notEnrolled");
                console.log("You have to buy this course");
            }
    }
    }
    useEffect(() => {
        fetchFun();
        console.log(courseCompletionDetails);
    } , [])
    return(
        <>
        <p>{JSON.stringify(courseCompletionDetails)}</p>
        {userState === "enrolled" && courseCompletionDetails === null? <p>{JSON.stringify(courseCompletionDetails)}</p> :
        userState ==="notAuthorized" && courseCompletionDetails=== null? <p>Login to buy this course</p>:
        userState === "notEnrolled" && courseCompletionDetails === null ?<BuyCourse course = {course} setUserCourseDetails={setUserCourseDetails} setCourseCompletionDetails= {setCourseCompletionDetails}/> : null
        }
        </>
    )
}
export default UserCourseDetails;