import { useState, useRef } from "react";
import DoneIcon from "@mui/icons-material/Done";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import StarIcon from '@mui/icons-material/Star';
import styles from "../styles/CourseUpload.module.css";
import { uploadCourseApi } from "../api/coursesApi";
import {Link} from "react-router-dom";
import Footer from "../components/Footer";
const CourseUpload = () => {
 const courseTitleRef = useRef(null);
  const courseDescRef = useRef(null);
  const courseLangRef = useRef(null);
  const imp1Ref = useRef(null);
  const imp2Ref = useRef(null);
  const imp3Ref = useRef(null);
  const imp4Ref = useRef(null);
  const imp5Ref = useRef(null);
  const imp6Ref = useRef(null);
  const high1Ref = useRef(null);
  const high2Ref = useRef(null);
  const high3Ref = useRef(null);
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const instructorId= localStorage.getItem("userId");
   const handleCourseRegister = async(e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    //course obj
    const courseObj = {
      "courseTitle":courseTitleRef.current.value,
      "courseDesc":courseDescRef.current.value,
      "courseLang":courseLangRef.current.value,
      "importantKeyPoints":[imp1Ref.current.value , imp2Ref.current.value , imp3Ref.current.value , imp4Ref.current.value , imp5Ref.current.value , imp6Ref.current.value],
      "highlightKeyPoints":[high1Ref.current.value , high2Ref.current.value , high3Ref.current.value],
    }
    const imageFile = imageUploader.current.files[0];
    bodyFormData.append('course' , JSON.stringify(courseObj));
    bodyFormData.append('imageFile' , imageFile);
    bodyFormData.append('instructorId' , instructorId);
    console.log(bodyFormData);
    const response = await uploadCourseApi(bodyFormData);
    localStorage.setItem("uploadCourseId" , response.data);
    console.log(`The response is ${response}`);
    console.log(courseObj);
  };
  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <form onSubmit={(e) => handleCourseRegister(e)}>
      <div className={styles.flexContainer}>
        <div className={styles.leftCol}>
          <div className={styles.header}>
            <h2>
              <input
                type="text"
                placeholder="Course Title"
                id="courseTitle"
                ref={courseTitleRef}
              ></input>
            </h2>
            <p>
              <input
                type="text"
                name="courseDescription"
                id="courseDescription"
                placeholder="Course Description"
                ref={courseDescRef}
              />
            </p>
            <div className={styles.details}>
              <input type="text" 
              name="courseLanguage"
              id="courseLanguage"
              ref={courseLangRef}
               placeholder="Course's language"/>
            </div>
          </div>
          <div className={styles.listContainer}>
            <h2 style={{ fontWeight: "bold" }}>What you'll learn</h2>
            <p>Fill up the important key points of the course</p>
            <ul>
              <li>
                <DoneIcon sx={{ marginRight: "10px" }} />
                <input type="text" name="point1" id="point1" ref={imp1Ref}/>
              </li>
              <li>
                <DoneIcon sx={{ marginRight: "10px" }} />
                <input type="text" name="point2" id="point2" ref={imp2Ref}/>
              </li>
              <li>
                <DoneIcon sx={{ marginRight: "10px" }} />
                <input type="text" name="point3" id="point3" ref={imp3Ref}/>
              </li>
              <li>
                <DoneIcon sx={{ marginRight: "10px" }} />
                <input type="text" name="point4" id="point4" ref={imp4Ref}/>
              </li>
              <li>
                <DoneIcon sx={{ marginRight: "10px" }} />
                <input type="text" name="point5" id="point5" ref={imp5Ref}/>
              </li>
              <li>
                <DoneIcon sx={{ marginRight: "10px" }} />
                <input type="text" name="point6" id="point6" ref={imp6Ref}/>
              </li>
            </ul>
          </div>
        <div className={styles.btnContainer}>
            <input type="submit" value="Register the course" className={styles.registerBtn}/>
        <Link to ="/lessonAdd" className={styles.uploadBtn}>Proceed to upload Lessons</Link>
        </div>
        </div>
       <div className={styles.rightCol}>
          <div className={styles.filler}></div>
          <div className={styles.courseCard}>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{
                  display: "none",
                }}
              />
              <div
                style={{
                  height: "200px",
                  width: "200px",
                  border: "1px solid var(--textPrimary)",
                  borderRadius:"10px",
                  margin: "0px",
                  display:"flex",
                  flexDirection:"column",
                  alignItems:"center",
                  justifyContent:"center",
                  zIndex:"7",
                  position:"relative"
                }}
                onClick={() => imageUploader.current.click()}
              >
                <img
                  ref={uploadedImage}
                  style={{
                    width: "100%",
                    height: "100%",
                     position: "absolute",
                  borderRadius:"10px",
                  }}
                />
              <AddAPhotoIcon 
              sx={{fontSize:'3rem' , zIndex:'-1'}}
              />
              Click to upload Image
              </div>
            </div>
            <p>Give us the highlighting key points of your course.These will be displayed in the cards of the homepage</p>

            <ul>
              <li><StarIcon sx={{fontSize:"1.5rem",color:"var(--dark)"}}/><input type="text" name="impPoint1" id="impPoint1" ref={high1Ref}/></li>
              <li><StarIcon sx={{fontSize:"1.5rem",color:"var(--dark)"}}/><input type="text" name="impPoint2" id="impPoint2" ref={high2Ref}/></li>
              <li><StarIcon sx={{fontSize:"1.5rem",color:"var(--dark)"}}/><input type="text" name="impPoint3" id="impPoint3" ref={high3Ref}/></li>
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </form>
  );
};
export default CourseUpload;
