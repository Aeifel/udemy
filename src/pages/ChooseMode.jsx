import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ChooseMode.module.css";
import CreateIcon from "@mui/icons-material/Create";
const ChooseMode = () => {
  const [route, setRoute] = useState("/");
  const [disabled , setDisabled] = useState(true);
  const handleTeachClick = () => {
    setDisabled(false);
    setRoute("/instructor/signup");
  };
  const handleStudentClick = () => {
    setDisabled(false);
    setRoute("/user/signup");
  };
  const disabledBtn = (
    <>
    <button className={`${styles.disabled} ${styles.btn}`}>
        Continue
    </button>
    </>
  )
  const enabledBtn = (
    <Link to={route}>
        <button className={styles.btn}>Continue</button>
    </Link>
  )
  const instructorContentsDiv = (
    <>
    <div className={styles.contents}>
            <li>Upload your courses online</li>
            <li>Get funding from ulearn</li>
            <li>Get user reviews</li>
    </div>
    </>
  )
  const studentContentsDiv = (
    <>
    <div className={styles.contents}>
        <li>Enroll in thousands of courses available</li>
        <li>Complete courses</li>
        <li>Upskill yourself</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque praesentium quasi aspernatur?</li>
    </div>
    </>
  )
  return (
    <>
      <div className={styles.bodyContainer}>
        <div className={styles.leftCol}>
          <h2>
            How do you want to use
            <span style={{ color: "var(--textSecondary)" }}>U</span>learn?
          </h2>
          <input
            type="radio"
            className={styles.checkBox}
            name="type"
            id="instructor"
            onClick={ e => handleTeachClick(e)}
          />
          <label htmlFor="instructor" className={styles.label}>
            I am here to teach others
          </label>
          <input
            type="radio"
            className={styles.checkBox}
            name="type"
            id="student"
            onClick={ e => handleStudentClick(e)}
          />
          <label htmlFor="student" className={styles.label}>
            I am here to learn and improve my skills
          </label>
            {disabled? disabledBtn:
            enabledBtn}
        </div>
        <div>
          <div
            style={{
              background: 'url("/instructor.svg")',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "100%",
              position:"relative"
            }}
          >
            <div>
                {route =="/" ? null : route == "/user/signup" ? studentContentsDiv : instructorContentsDiv}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChooseMode;
