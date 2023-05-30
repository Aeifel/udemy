import { TextField } from "@mui/material";
import axios from "axios";
import { useState, useRef,useContext } from "react";
import styles from "../styles/Login.module.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { styled } from "@mui/material";
import { userSignupApi } from "../api/userApi";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { CircularSpinner } from "../components/Loaders";
import { AuthContext } from "../contexts/AuthContext";
import { showErrorToastNotification , showSuccessToastNotification } from "../components/Notifications";
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "var(--textSecondary)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "var(--textSecondary)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--textPrimary)",
    },
    "&:hover fieldset": {
      borderColor: "var(--textPrimary)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--textSecondary)",
    },
  },
});
const Signup = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [passwd, setPasswd] = useState(null);
  const [userType, setUserType] = useState(null);
  const [errorState, setErrorState] = useState(false);
  const [isLoading , setIsLoading] = useState(false);
  const {setAuth , setType ,setUserToken} = useContext(AuthContext);
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const handleSignup = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const imageFile = imageUploader.current.files[0];
    const formData = new FormData();
    const obj = {
      userName:name,
      userEmail:email,
      password:passwd
    }
    formData.append('user' , JSON.stringify(obj));
    formData.append('profileImg' , imageFile);
    const response = await userSignupApi(formData);
    console.log(response);
    setIsLoading(false);
    if ( response.status == 200){
      localStorage.setItem("accessToken" , response.data.accessToken);
      localStorage.setItem("type" , "student");
      window.location.href="/";
      setAuth(true);
      setUserToken(response.data.accessToken);
      setType("student");
      showSuccessToastNotification("Signup Successfull");
    }
    else {
      const message = response.response.data.msg;
      showErrorToastNotification(`${message}`);
    }
    // formData.append("file", imageFile);
    // formData.append("upload_preset", "cloudinaryUpload");
    // axios
    //   .post("https://api.cloudinary.com/v1_1/dqib9dtzz/image/upload", formData)
    //   .then((response) => {
    //     console.log(response);
    //     const imageUrl = response.data.secure_url;
    //     console.log(imageUrl);
    //     axios
    //       .post("http://localhost:4000/user/signup", {
    //         userName: name,
    //         userEmail: email,
    //         userPassword: passwd,
    //         userImg: imageUrl,
    //       })
    //       .then((response) => {
    //         console.log("Signed up successfully");
    //         const { userName, accessToken } = response.data;
    //         localStorage.setItem("accessToken", accessToken);
    //         localStorage.setItem("userName", userName);
    //         console.log(userName);
    //         console.log(accessToken);
    //         window.location.href = "/";
    //       })
    //       .catch((err) => {
    //         console.log("Sign up error");
    //         setErrorState(true);
    //       });
    //   })
    //   .catch((err) => console.error(err));
  };
  const handleGoogleSignUp = (e) => {
    e.preventDefault();
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
    <>
      {/* <form onSubmit={e => handleSignup(e)}> */}
      {isLoading && <CircularSpinner/>}
      {!isLoading && <div className={styles.container}>
        <div className={styles.heading}>Student Signup</div>
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
              height: "150px",
              width: "150px",
              border: "1px solid var(--textPrimary)",
              borderRadius: "50%",
              margin: "0px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: "7",
              position: "relative",
            }}
            onClick={() => imageUploader.current.click()}
          >
            <img
              ref={uploadedImage}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                borderRadius: "50%",
              }}
            />
            <AddAPhotoIcon sx={{ fontSize: "3rem", zIndex: "-1" }} />
            Upload profile pic
          </div>
        </div>
        <div className={styles.inputField}>
          <CssTextField
            variant="outlined"
            type="text"
            label="UserName"
            value={name}
            onChange={(newValue) => setName(newValue.target.value)}
            sx={{ width: "70%" }}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.inputField}>
          <CssTextField
            variant="outlined"
            type="email"
            label="Email"
            value={email}
            onChange={(newValue) => setEmail(newValue.target.value)}
            sx={{ width: "70%" }}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.inputField}>
          <CssTextField
            variant="outlined"
            type="password"
            label="Password"
            value={passwd}
            sx={{ width: "70%" }}
            onChange={(newValue) => setPasswd(newValue.target.value)}
            autoComplete="off"
            required
          />
        </div>
       <button className={styles.loginBtn} onClick={(e) => handleSignup(e)}>
          Signup
        </button>
       <p className={styles.text}>
          Already have an account? Login here{" "}
          <Link to="/user/Login">Login</Link>
        </p>
        {errorState == true ? (
          <p className={styles.error}>Account already exists</p>
        ) : null}
      </div>}
      {/* </form> */}
      <Footer />
    </>
  );
};
export default Signup;
