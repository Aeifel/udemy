import { useRef,useState , useContext } from "react";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyIcon from "@mui/icons-material/Key";
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import styles from "../styles/InstructorSignup.module.css";
import { ExpandHoverBtn } from "../components/Buttons";
import { instructorSignupApi } from "../api/InstructorApi";
import { CircularSpinner } from "../components/Loaders";
import { AuthContext } from "../contexts/AuthContext";
import { showErrorToastNotification , showSuccessToastNotification } from "../components/Notifications";
const InstructorSingup = () => {
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
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
  const instructorNameRef = useRef(null);
  const instructorEmailRef = useRef(null);
  const instructorPasswordRef = useRef(null);
  const instructorWorkRef = useRef(null);
  const instructorAboutRef = useRef(null);
  const [isLoading , setIsLoading] = useState(false);
  const {setAuth , setType ,setUserToken} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleInstructorSignup = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    const obj = {
        insName:instructorNameRef.current.value,
        bio:{
            occupation:instructorWorkRef.current.value,
            about:instructorAboutRef.current.value
        },
        insEmail:instructorEmailRef.current.value,
        insPassword:instructorPasswordRef.current.value
    }
    console.log(obj);
    formData.append('instructor' , JSON.stringify(obj));
    formData.append('insImage' , imageUploader.current.files[0]);
    const response = await instructorSignupApi(formData);
    if(response.status === 200){
      localStorage.setItem('accessToken' , response.data.accessToken);
      localStorage.setItem('type' , 'instructor');
      setAuth(true);
      setType("instructor");
      setUserToken(response.data.accessToken);
      navigate('/');
      console.log(response);
    }
    else{
      const {msg} = response.response.data;
      showErrorToastNotification(`${msg}`);
    }
    setIsLoading(false);
  }
  return (
    <>
    {!isLoading ?<div className={styles.container}>
                <h4 className={styles.title}>Signup as an instructor</h4>
        <form>
          <div className={styles.firstRow}>
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
                    height: "160px",
                    width: "160px",
                    border: "1px solid var(--textPrimary)",
                    borderRadius: "10px",
                    margin: "0px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: "7",
                    position: "relative",
                    borderRadius: "50%",
                    background: "var(--grayLight)",
                    flex:"1 1 40%"
                  }}
                  onClick={() => imageUploader.current.click()}
                >
                  <img
                    ref={uploadedImage}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      borderRadius: "10px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      //   background:"var(--grayLight)"
                    }}
                  />
                  <AddAPhotoIcon sx={{ fontSize: "2rem", zIndex: "-1" }} />
                  Upload profile pic
                </div>
              </div>
              <div className={`${styles.row} ${styles.rightCol}`}>
                <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                  <input type="text" placeholder="Full Name" ref={instructorNameRef} />
                  <div className={styles.inputIcon}>
                    {/* <i className="fa fa-user"></i> */}
                    <PersonIcon />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                  <input type="email" placeholder="Email Address" ref={instructorEmailRef}/>
                  <div className={styles.inputIcon}>
                    <EmailOutlinedIcon />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                  <input type="password" placeholder="Password" ref={instructorPasswordRef}/>
                  <div className={styles.inputIcon}>
                    <KeyIcon />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                  <input type="text" placeholder="Work" ref={instructorWorkRef} />
                  <div className={styles.inputIcon}>
                    <WorkOutlineOutlinedIcon/>
                  </div>
                </div>
              </div>
          </div>
          <div>
            <textarea placeholder="Enter a few words about yourself" ref={instructorAboutRef}></textarea>
          </div>
          <ExpandHoverBtn text="SignUp" onClickEvent={handleInstructorSignup}/>
        </form>
      </div>
    :<CircularSpinner/>}</>
  );
};
export default InstructorSingup;
