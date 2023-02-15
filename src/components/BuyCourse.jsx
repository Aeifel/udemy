import * as React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { courseEnrollApi } from '../api/userApi';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const BuyCourse = (props) => {
  const {course  , setCourseCompletionDetails , setUserCourseDetails} = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleBuy = () => {
    courseEnrollApi().then((response) => {
      console.log(response);
      setCourseCompletionDetails(response.data.courseDetails);
      setUserCourseDetails (response.data.courseDetails);
    setOpen(false);
    }).catch((err) => {
      console.log("Error occured");
      console.log(err);
    })
  }
  return (
    <>
    {course ?
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Buy Course
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Preview what you are buying"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Box sx={{ }}>
            <p>Course:{course.courseTitle}</p>
            <p>{course.description}</p>
            <p>Cost:{course.cost}</p>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick = {handleBuy}>Buy Course</Button>
        </DialogActions>
      </Dialog>
    </div>:null}
    </>
  );
}
export default BuyCourse;