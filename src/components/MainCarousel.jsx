import Carousel from "react-material-ui-carousel";
import styles from "../styles/MainCarousel.module.css";
import { Paper, Button } from "@mui/material";
import { purple } from "@mui/material/colors";
const Slide1 = () => {
  return (
    <>
      <div
        className={styles.slideContainer1}
        style={{ backgroundImage: "url(/uCarouselImg.jpg)" }}
      >
        <div className={styles.content1}>
          <h2 className={styles.heading}>Learning that gets you</h2>
          <p className={styles.text}>
            Skills for your present (and your future). Get started with us.
          </p>
        </div>
      </div>
    </>
  );
};
const Slide2 = () => {
  return (
    <div
      className={styles.slideContainer1}
      style={{ backgroundImage: "url(/carousel2.png)" }}
    >
      <div>
        <div className={styles.content2}>
          <h2 className={styles.heading}>Learn Without Limits</h2>
          <p className={styles.text}>
            Start, switch, or advance your career with more than 5,000 courses,
            Professional Certificates, and degrees from world-class universities
            and companies
          </p>
        </div>
      </div>
    </div>
  );
};

const MainCarousel = () => {
  return (
    <Carousel
      indicatorContainerProps={{
        style: {
          marginTop: "-50px", // 5
        },
      }}
      autoPlay={true}
      interval={2500}
    >
      <Slide1 />
      <Slide2 />
    </Carousel>
  );
};
export default MainCarousel;