import { useState } from "react";
import { getLessonApi } from "../api/CourseApi";
const Lesson1 = () => {
    const [completedState , setCompletedState] = useState(false);
    return (
        <>
        <div>
            Hi from lesson page
        </div>
        </>
    )
}
export default Lesson1;