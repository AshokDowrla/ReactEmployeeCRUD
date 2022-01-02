import React, { useState, useRef, useEffect, useCallback } from "react";
import Dropzone from "react-dropzone";
import styles from "./UploadImg.module.scss";
import { ReactComponent as UploadImgIcon } from "../../../../assets/upload_img.svg";

const UploadImg = ({ onUpload, reset, prefillImage, formSubmitted }) => {
  const [image, setImage] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [capturing, setCapturing] = useState(false);
  const [Error, setError] = useState(false);

  console.log(image);
  const videoRef = useRef();
  const canvasRef = useRef();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      videoRef.current.srcObject = stream;
      setCapturing(true);
    } catch (err) {
      console.log(err);
      setCapturing(false);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    setCapturing(false);
  };

  const takeSelfie = async () => {
    // Get the exact size of the video element.
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    // get the context object of hidden canvas
    const ctx = canvasRef.current.getContext("2d");

    // Set the canvas to the same dimensions as the video.
    canvasRef.current.width = width;
    canvasRef.current.height = height;

    // Draw the current frame from the video on the canvas.
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    // Get an image dataURL from the canvas.
    const imageDataURL = canvasRef.current.toDataURL("image/png");

    // Set the dataURL as source of an image element, showing the captured photo.
    stopCamera();
    setImageURL(imageDataURL);
    setError(false);
    onUpload(imageDataURL);
  };

  const dropZoneLogic = (imageFile) => {
    if (imageFile.size > 1024 * 1024) {
      alert("File size should be less than 1MB");
      return;
    }

    if (imageFile) {
      setImage(imageFile);
      setImageURL(URL.createObjectURL(imageFile));
      setError(false);
      onUpload(imageFile);
    } else {
      setImageURL("");
      setError(true);
      onUpload("");
      setImage([]);
    }
  };

  const onImageChange = (e) => {
    const imageFile = e.target.files[0];
    dropZoneLogic(imageFile);
  };

  const resetImageHandler = useCallback(() => {
    setImageURL("");
    setCapturing(false);
    setError(false);
    onUpload("");
    setImage([]);
  }, [onUpload]);

  useEffect(() => {
    if (reset) {
      resetImageHandler();
    }
  }, [reset, resetImageHandler]);

  useEffect(() => {
    if (!imageURL.length && formSubmitted) {
      setError(true);
    }
  }, [imageURL, formSubmitted]);

  useEffect(() => {
    if (prefillImage.length) {
      setImageURL(prefillImage);
      setError(false);
      onUpload(prefillImage);
    }
  }, [prefillImage, onUpload]);

  return (
    <Dropzone
      onDrop={(acceptedFiles) => dropZoneLogic(acceptedFiles[0])}
      noClick={true}
      noKeyboard={true}
      accept="image/jpeg, image/png"
    >
      {({ getRootProps, getInputProps }) => (
        <div
          className={`${styles["upload--profileImg"]} ${
            Error ? "invalid" : ""
          } `}
          {...getRootProps()}
        >
          {!(imageURL.length > 0) && !capturing && (
            <div className={styles["upload--profileImg__empty"]}>
              <UploadImgIcon />
              <h4 className={styles["upload--profileImg__text"]}>
                Drag & Drop your image here or
              </h4>
              <div className={styles["upload--profileImg__btns"]}>
                <input
                  id="uploadImg"
                  type="file"
                  accept="image/png, image/jpeg"
                  {...getInputProps()}
                  onChange={onImageChange}
                />
                <label htmlFor="uploadImg">
                  <div className={styles["upload--profileImg__upload"]}>
                    Upload
                  </div>
                </label>
                <div
                  className={styles["upload--profileImg__capture"]}
                  onClick={startCamera}
                >
                  Capture
                </div>
              </div>
            </div>
          )}
          {imageURL.length > 0 && !capturing && (
            <div className={styles["upload--profileImg__preview"]}>
              <img src={imageURL} alt="" />
              <div className="progressBar-exit" onClick={resetImageHandler}>
                <div className="horizontal-plus"></div>
                <div className="vertical-plus"></div>
              </div>
            </div>
          )}
          <video
            className={`${styles["upload--profileImg__videoCapture"]} ${capturing}`}
            ref={videoRef}
            autoPlay
          ></video>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          {capturing && (
            <div className={styles["upload--profileImg__btns"]}>
              <div
                className={styles["upload--profileImg__upload"]}
                onClick={takeSelfie}
              >
                Capture
              </div>
              <div
                className={styles["upload--profileImg__capture"]}
                onClick={stopCamera}
              >
                Stop Camera
              </div>
            </div>
          )}
        </div>
      )}
    </Dropzone>
  );
};

export default React.memo(UploadImg);
