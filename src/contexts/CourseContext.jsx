import {createContext , useState , useEffect , useContext} from "react";

import { checkEnrollmentApi } from "../api/userApi";
import { AuthContext } from "./AuthContext";

export const CourseContext = createContext();
export const CourseContextProvider = ({children}) => {
    const [currentCourse , setCurrentCourse] = useState(null);
    const [lesson , setLesson] = useState(null);
    const [access , setAccess] = useState(false);
    const {auth } = useContext(AuthContext);
    useEffect(() => {
        setCurrentCourse(sessionStorage.getItem("courseId"));
        if ( auth && sessionStorage.getItem("courseId") != null) {
            checkEnrollmentApi({courseId: sessionStorage.getItem("courseId")}).then((response) => {
                if(response.status === 200) {
                    setAccess(true);
                }
                else{
                    setAccess(false);
                }
            })
        }
        else{
            setAccess(false);
        }
    },[]);
    
    useEffect(() => {
        if ( auth && sessionStorage.getItem("courseId") != null) {
            checkEnrollmentApi({courseId: sessionStorage.getItem("courseId")}).then((response) => {
                if(response.status === 200) {
                    setAccess(true);
                }
                else{
                    setAccess(false);
                }
            });
        }
        else{
            setAccess(false);
        }
    },[currentCourse]);
    return (
        <>
        <CourseContext.Provider value={{currentCourse , setCurrentCourse , lesson , setLesson , access , setAccess}}>
            {children}
        </CourseContext.Provider>
        </>
    )
}