import React, { useEffect } from "react";
import { showErrorToastNotification } from "./Notifications";

export const VideoUploadWidget = (props) => {
    const {setUrl} = props;
    const cloudName = "dqib9dtzz"; // replace with your own cloud name
    const uploadPreset = "ulearnProd"; // replace with your own upload preset


    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
       theme: "purple", //change to a purple theme
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setUrl(result.info.secure_url);
        }
        else if (error){
            showErrorToastNotification("Cloudinary error try again");
        }
      }
    );
    const handleButtonClick = () => {
      myWidget.open();
    };
  return (
    <button id="upload_widget" className="cloudinary-button" onClick={e => handleButtonClick()}>
      Upload
    </button>
  );
};

export const PdfUploadWidget = (props) => {
    const {setUrl} = props;
    const cloudName = "dqib9dtzz"; // replace with your own cloud name
    const uploadPreset = "ulearnProd"; // replace with your own upload preset

   //   https://cloudinary.com/documentation/upload_widget_reference

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
       theme: "purple", //change to a purple theme
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setUrl(result.info.secure_url);
        }
        else if (error){
            showErrorToastNotification("Cloudinary error try again");
        }
      }
    );
    const handleButtonClick = () => {
      myWidget.open();
    };

 return (
    <button id="pdf_upload_widget" className="cloudinary-button" onClick={e => handleButtonClick(e)}>
      Upload
    </button>
  );
};

