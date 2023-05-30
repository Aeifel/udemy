import styles from "../styles/CourseCard.module.css";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Rating } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import Typography from "@mui/material/Typography";
import React from "react";
import { ExpandHoverBtn } from "./Buttons";

const CourseCard = (props) => {
  // const { course } = props;
  // console.log(course);
  // const { courseTitle, courseDesc, courseId, highlightKeyPoints, imageId } =
  //   course;
  // console.log("here");
  // console.log({ props });
  // const baseUrl1 = "http://localhost:6039/file/download/";
  // const reqUrl = baseUrl1.concat(imageId);
  //function to get the month and year from json date format
  const {course} = props;
  const getMonthYear = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "long" });
    const year = dateObj.getFullYear();
    return `${month} ${year}`;
  };
    const {_id,courseTitle,description,language,keypoints,updatedDate,cost,courseImg,category,instructor,numberOfEnrollments,rating} = course;
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "white",
      color: "rgba(0, 0, 0, 0.87)",
       maxWidth: 320,
       padding:"20px",
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));
  const TooltipValue = (
    <>
    <div className={`${styles.courseContent} ${styles.tooltip}`}>
            <h3>{courseTitle}</h3>
            <p><span style={{color:"green"}}> Updated {getMonthYear(updatedDate)}</span></p>
            <p>{description}</p>
            <ul>
              <li><DoneIcon
              sx={{fontSize:"1.5rem"}}
              />To learn the python language</li>
            <li><DoneIcon
            sx={{fontSize:"1.5rem"}}
            />To learn the CORE skills to understand any programming language</li>
            </ul>
            {/* <ExpandHoverBtn text="View Course Details" backgroundColor="white" color="var(--textSecondary)" onClickEvent={}/> */}
            <Link onClick={ (e) => {
              sessionStorage.setItem("courseId",_id);
            }} to="/course">View Course Details</Link>
    </div>
    </>
  )
  return (
   <>
      <HtmlTooltip arrow
      placement="right"
        title={
          TooltipValue
        }
        sx ={{
          backgroundColor:"white"
        }}
      >
        <div className={styles.courseCard}>
          <div className={styles.courseImg}>
            <img src={courseImg}></img>
          </div>
          <div className={styles.courseContent}>
            <h3>{courseTitle}</h3>
            <p><span style={{color:"rgb(150,150,150"}}>{instructor.insName}</span></p>
            <Rating
              name={rating}
              value={2.5}
              precision={0.5}
              readOnly
              size="small"
            />
            <div className={styles.price}>{cost}</div>
          </div>
        </div>
      </HtmlTooltip>
    </>
  );
};
export default CourseCard;
