import { useRef ,useState} from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyIcon from "@mui/icons-material/Key";
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import styles from "../styles/InstructorSignup.module.css";
import { ExpandHoverBtn } from "../components/Buttons";
import { Link } from "react-router-dom";
import { userSignupApi } from "../api/userApi";
import { CircularSpinner } from "../components/Loaders";

const UserSignup = () => {
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const userNameRef = useRef(null);
  const userEmailRef = useRef(null);
  const userPasswordRef = useRef(null);
  const [isLoading , setIsLoading] = useState(false);
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
  const handleUserSignup = async(e) => {
    setIsLoading(true);
    e.preventDefault();
    let formData = new FormData();
    const obj = {
        userName:userNameRef.current.value,
        userEmail:userEmailRef.current.value,
        password:userPasswordRef.current.value
    }
    formData.append("user" , JSON.stringify(obj));
    formData.append("profileImg" , imageUploader.current.files[0]);
    const response = await userSignupApi(formData);
    console.log(response);
    setIsLoading(false);
  }
  const pageData =(
    <>
      <div className={styles.container}>
                <h4 className={styles.title}>User Signup</h4>
        <form onSubmit={e => handleUserSignup(e)}>
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
                  <input type="text" placeholder="Full Name" ref = {userNameRef}/>
                  <div className={styles.inputIcon}>
                    {/* <i className="fa fa-user"></i> */}
                    <PersonIcon />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                  <input type="email" placeholder="Email Address" ref={userEmailRef}/>
                  <div className={styles.inputIcon}>
                    <EmailOutlinedIcon />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${styles.inputGroupIcon}`}>
                  <input type="password" placeholder="Password" ref={userPasswordRef}/>
                  <div className={styles.inputIcon}>
                    <KeyIcon />
                  </div>
                </div>
             </div>
          </div>
          <ExpandHoverBtn text="SignUp"/>
    <p>Already have an account ? <Link to="/user/login">Login</Link></p>
        </form>
      </div>
    </>
 
  )
  return (

    <>
    {isLoading ? <CircularSpinner/>: pageData}
    </>
 );
};
export default UserSignup;
