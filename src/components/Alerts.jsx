import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
export const InstructorAlert = (setAlert) => {return (<Alert variant="outlined" sx ={{position:"sticky" , top:"0" , zIndex:"99",backgroundColor:"white"}}onClose = {(e )=>{setAlert(false)}}severity="warning">
    Login or Signup as a Instructor 
</Alert>)}
export const LoginAlert = (setAlert) => {return (<Alert variant="outlined" sx ={{position:"sticky" , top:"0" , zIndex:"99",backgroundColor:"white"}}onClose = {(e )=>{setAlert(false)}}severity="warning">
    Login to enroll courses <Link to ="/user/login">Login</Link>
</Alert>)}
export const InvalidUserTypeAlert = (setAlert) => {return (<Alert variant="outlined" sx ={{position:"sticky" , top:"0" , zIndex:"99",backgroundColor:"white"}}onClose = {(e )=>{setAlert(false)}}severity="warning">
    Only Students are allowed to enroll <Link to ="/user/login">Login</Link>
</Alert>)}