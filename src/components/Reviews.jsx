import { useEffect, useState,useRef } from "react";
import { Avatar } from "@mui/material";
import styles from "../styles/Reviews.module.css";
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { postReviewsApi } from "../api/CourseApi";
const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};
function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
const AddRating = (props) => {
  const {ratingValue , setRatingValue} = props;
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={ratingValue}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setRatingValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : ratingValue]}</Box>
      )}
    </Box>
  );
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const AddReviewDialogBox = () => {
  const [open, setOpen] = React.useState(false);
  const [ratingValue , setRatingValue] = useState(0);
  const commentRef = useRef(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleAddReview = () => {
    const obj = {
      rating:ratingValue,
      courseId:sessionStorage.getItem("courseId"),
      comment:commentRef.current.value,
    }
    postReviewsApi(obj).then((response) => {
      console.log(response);
    })
    setOpen(false);
  }
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add a review
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Post your rating
        </BootstrapDialogTitle>
        <DialogContent>
          <Box
          sx = {{
            display:'flex',
            flexDirection:'column',
          }}
          >
          <AddRating ratingValue={ratingValue} setRatingValue={setRatingValue} />
          <input type = "text" placeholder = "Enter your comment"
          ref = {commentRef}
          style={{
            display:"inline-block",
            padding:"1rem",
          }}
          />
          </Box>
       </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleAddReview}>
            Post Rating
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
const Reviews = (props) => {
  const { reviews } = props;
  console.log(reviews);
  console.log(props);
  if (reviews == null) {
    return <p>Be the first to review the course</p>;
  } else {
    return(
      <>
      <div className = {styles.wrapper}>
        <h2
          styles={{
            fontFamily: "PrimaryFont",
            fontSize: "1.2rem",
          }}
        >
          See what student's have to say about the course
          <AddReviewDialogBox/>
        </h2>
        <div className={styles.reviewContainer}>
      {reviews.map((review) => {
        const {user,rating,comment} = review;
        return(
          <div className={styles.reviewCard}>
            <p
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "0px",
              }}
            >
              <Avatar
                alt="User"
                src={"url('/carousel2.png')"}
                sx={{
                  width: "50px",
                  height: "50px",
                  margin: "0px 5px 0px 10px",
                }}
              />
              {user.userName}
            </p>
            <div
              style={{
                margin: "0px 0px 0px 10px",
              }}
            >
              <Rating
                name={"comment"}
                value={rating}
                precision={0.5}
                readOnly
                size="small"
              />
              <p>{comment}</p>
            </div>
          </div>
        )
      }
      )}
      </div>
      </div>
    </>
    )
  }
};
export default Reviews;
