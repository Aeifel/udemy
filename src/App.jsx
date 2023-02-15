import logo from './logo.svg';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Course from './pages/Course';
import Lesson from './pages/Lesson';
import Test from './pages/Test';
import InstructorSingup from './pages/InstructorSignup';
import InstructorLogin from './pages/InstructorLogin';
import CourseUpload from './pages/CourseUpload';
import GlobalStyle from './globalStyles';
import UserProfile from './pages/UserProfile';
import './App.css'
import PrimarySearchAppBar from './components/Navbar1';
import Footer from './components/Footer';
import LessonUpload from './pages/LessonUpload';
import { useState,useEffect,useContext,useMemo } from 'react';
import { createContext } from 'react';
import { getNavOptionsApi } from './api/CourseApi';
import ChooseMode from './pages/ChooseMode';
import ChooseLogin from './pages/ChooseLogin';
import { CourseContext ,SetCourseContext} from './contexts';
function App() {
  const [navOptions , setNavOptions] = useState([]);
  const [courseInterested , setCourseInterested] = useState(null);
  useEffect (() => {
    console.log("fetching nav options");
    getNavOptionsApi().then((response) => {
     setNavOptions(response.data);
      console.log(response);
    })
  },[])
  // useMemo (() => {
  // },[navOptions])
  // navOptions = useMemo(() => {
  //   return navOptions;
  // } , [nak])
  return (
    <>
    <GlobalStyle/>
    <SetCourseContext.Provider value = {setCourseInterested}>
    <CourseContext.Provider value = {courseInterested}>
    <Router>
      <PrimarySearchAppBar navOptions={navOptions}/>
      <AllRoutes/>
    </Router>
    </CourseContext.Provider>
    </SetCourseContext.Provider>
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
      {/* <Route path="/" element={<Test/>}/> */}
      <Route path="*" element={<h1>404 Not Found</h1>}/>
    </Routes>
  )
}
export default App;
