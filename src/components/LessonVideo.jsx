import ReactPlayer from "react-player";
import screenfull from "screenfull";
import { Container } from "@mui/material";
import styles from "../styles/LessonVideo.module.css";
const LessonVideo = (props) => {
    const {VideoUrl} = props;
    return (
        <div className={styles.videoContainer}>
    <div style={{width:'100%' , position:'relative'}}>
          <ReactPlayer width={'100%'} 
        //   url="http://localhost:6039/file/download/63cad2147fb94a32aade13fd"
        url={VideoUrl}
          playing={true}
          muted={true}
          controls
          />
    </div>
    </div>
    )
}
export default LessonVideo;