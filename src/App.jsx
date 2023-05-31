import logo from './logo.svg';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Course from './pages/Course';
import Lesson from './pages/Lesson';
import Test from './pages/Test';

import { ToastContainer } from 'react-toastify';
import InstructorSingup from './pages/InstructorSignup';
import InstructorLogin from './pages/InstructorLogin';
import CourseUpload from './pages/CourseUpload';
import GlobalStyle from './globalStyles';
import UserProfile from './pages/UserProfile';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import PrimarySearchAppBar from './components/Navbar1';
import LessonUpload from './pages/LessonUpload';
import { useState,useEffect,useContext,useMemo } from 'react';
import { getNavOptionsApi } from './api/CourseApi';
import ChooseMode from './pages/ChooseMode';
import ChooseLogin from './pages/ChooseLogin';
import { AuthProvider } from './contexts/AuthContext';
import { CourseContextProvider } from './contexts/CourseContext';
function App() {
  const [navOptions , setNavOptions] = useState([]);
  const [courseInterested , setCourseInterested] = useState(null);
  useEffect (() => {
    getNavOptionsApi().then((response) => {
     setNavOptions(response.data);
      console.log(response);
    })
  },[])
 return (
    <>
    <GlobalStyle/>
    <AuthProvider>
    <CourseContextProvider>
    <Router>
      <PrimarySearchAppBar navOptions={navOptions}/>
      <ToastContainer/>
      <AllRoutes/>
    </Router>
    </CourseContextProvider>
    </AuthProvider>
    </>
  );
}
const AllRoutes = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Home instance={1}/>} />
      <Route path="/signup" element={<ChooseMode/>}/>
      <Route path="/login" element={<ChooseLogin/>}/>
      <Route path="/student/signup" element={<Signup/>}/>
      <Route path="/student/login" element={<Login/>}/>
      <Route path="/user/profile" element={<UserProfile/>}/>
      <Route path="/instructor/login" element={<InstructorLogin/>}/>
      <Route path="/instructor/signup" element={<InstructorSingup/>}/>
      <Route path="/course/" element={<Course/>}/>
      <Route path="/lesson/" element={<Lesson/>}/>
      <Route path="/courseRegister/" element={<CourseUpload/>}/>
      <Route path="/lessonAdd/" element={<LessonUpload/>}/>
      <Route path="/test" element={<Test/>}/>
      <Route path="*" element={<h1>404 Not Found</h1>}/>
    </Routes>
  )
}
export default App;
