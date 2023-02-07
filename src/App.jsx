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
import { useState } from 'react';
import ChooseMode from './pages/ChooseMode';
import ChooseLogin from './pages/ChooseLogin';
function App() {
  const [navOptions , setNavOptions] = useState([]);
  return (
    <>
    <GlobalStyle/>
    <Router>
      <PrimarySearchAppBar/>
      <AllRoutes setNavOptions={setNavOptions}/>
    </Router>
    </>
  );
}
const AllRoutes = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Home setNavOptions={props}/>} />
      <Route path="/signup" element={<ChooseMode/>}/>
      <Route path="/login" element={<ChooseLogin/>}/>
      <Route path="/student/signup" element={<Signup/>}/>
      <Route path="/student/login" element={<Login/>}/>
      <Route path="/user/profile" element={<UserProfile/>}/>
      <Route path="/instructor/login" element={<InstructorLogin/>}/>
      <Route path="/instructor/signup" element={<InstructorSingup/>}/>
      <Route path="/course/:id/" element={<Course/>}/>
      <Route path="/lesson/:id/" element={<Lesson/>}/>
      <Route path="/courseRegister/" element={<CourseUpload/>}/>
      <Route path="/lessonAdd/" element={<LessonUpload/>}/>
      {/* <Route path="/" element={<Test/>}/> */}
      <Route path="*" element={<h1>404 Not Found</h1>}/>
    </Routes>
  )
}
export default App;
