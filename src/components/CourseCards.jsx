//receive props and get content
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
            <h3>Python for Beginners - Learn Programming from scratch</h3>
            <p><span style={{color:"green"}}> Updated November 2022</span></p>
            <p>Python For Beginners : This course is meant for absolute beginners in programming or in python</p>
            <ul>
              <li><DoneIcon
              sx={{fontSize:"1.5rem"}}
              />To learn the python language</li>
            <li><DoneIcon
            sx={{fontSize:"1.5rem"}}
            />To learn the CORE skills to understand any programming language</li>
            </ul>
            <ExpandHoverBtn text="View Course Details" backgroundColor="white" color="var(--textSecondary)" onClickEvent={null}/>
    </div>
    </>
  )
  return (
    // <div class="card" className={styles.card}>
    //   <div class="content" className={styles.content}>
    //     <div class="front" className={styles.front}>
    //       {/* <img src={"http://localhost:6039/file/download/63cd8aa89c75d5347d2afd38"}></img> */}
    //       <div className={styles.imgContainer}>
    //         <img src={reqUrl} alt="" className={styles.img} />
    //       </div>
    //       <div className={styles.courseDetails}>
    //         <h2 className={styles.heading}>{courseTitle}</h2>
    //         <p>{courseDesc}</p>
    //       </div>
    //     </div>
    //     <div class="back" className={styles.back}>
    //       <h2 className={styles.heading}>{courseTitle ? courseTitle : null}</h2>
    //       <p>{courseDesc ? courseDesc : null}</p>
    //       <ul>
    //         <li>{highlightKeyPoints[0]}</li>
    //         <li>{highlightKeyPoints[1]}</li>
    //         <li>{highlightKeyPoints[2]}</li>
    //       </ul>
    //       <Link to={`/course/${courseId}`}>
    //         <button className={styles.viewBtn}>View Course Details</button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
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
            <img src="./trial2.jpg"></img>
          </div>
          <div className={styles.courseContent}>
            <h3>Python for Beginners - Learn Programming from scratch</h3>
            <p><span style={{color:"rgb(150,150,150"}}>Edwin Diaz</span></p>
            <Rating
              name="no-value"
              value={2.5}
              precision={0.5}
              readOnly
              size="small"
            />
            <div className={styles.price}>Rs.2,299</div>
          </div>
        </div>
      </HtmlTooltip>
    </>
  );
};
export default CourseCard;
