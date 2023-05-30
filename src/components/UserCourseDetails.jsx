import { useEffect,useState , useContext } from "react";
import { getUserCourseDetailsApi } from "../api/userApi";
import BuyCourse from "./BuyCourse";
import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CourseContext} from "../contexts/CourseContext";
import { AuthContext } from "../contexts/AuthContext";
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props}
      sx = {{color : "green"}}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" sx = {{
            color: "green",
        }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};
const CircularStatic = ({courseCompletionDetails}) => {
  let total = courseCompletionDetails.length;
  courseCompletionDetails = courseCompletionDetails.filter((course) => course == true);
  const percentCompleted = courseCompletionDetails.length/total * 100;
  console.log(percentCompleted);
  const [progress, setProgress] = React.useState(10);
 return <CircularProgressWithLabel value={percentCompleted } />;
}
const UserCourseDetails = (props) => {
    const {setUserCourseDetails , course} = props;
    const [userState , setUserState] = useState(null);
    const [courseCompletionDetails , setCourseCompletionDetails] = useState(null);
    const {auth , type} = useContext(AuthContext);
    const {access} = useContext(CourseContext);
    const fetchFun = async() =>{
        try{
        const response = await getUserCourseDetailsApi();
        console.log(response);
        console.log("user enrolled course");
        setUserState((oldVal) => "enrolled");
        console.log(userState); 
        setCourseCompletionDetails(response.data.completionDetails);
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
        <>{
          !auth? <p>Login to buy this course</p>:
          auth && type==="instructor" ? <p>As an instructor you can't buy this course</p>:
          auth && type === "student" && !access? <BuyCourse course={course} setCourseCompletionDetails={setCourseCompletionDetails} setUserCourseDetails={setUserCourseDetails}/>:
          access?  <p
        style = {{
            display : "flex",
            alignItems : "center",
        }}
        ><CircularStatic courseCompletionDetails={courseCompletionDetails}/>Completed</p>
        
        :null}
        </>
    )
}
export default UserCourseDetails;