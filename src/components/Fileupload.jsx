import { useRef } from "react";
import { videoUploadApi } from "../api/coursesApi";
const Fileupload = () => {
    const fileRef = useRef(0);
    const handleFileUpload = async(e) => {
        e.preventDefault();
        console.log(fileRef.current.files[0]);
        let bodyFormdata = new FormData();
        bodyFormdata.append('file' , fileRef.current.files[0]);
        const response = await videoUploadApi(bodyFormdata);
        console.log(response);
    }
    return (
        <>
        <form onSubmit={e => handleFileUpload(e)}>
        <input type="file" ref={fileRef}placeholder="uploadfilecontents"/>
        <input type="submit" value="Upload"/>
        </form>
        </>
    )
}
export default Fileupload;