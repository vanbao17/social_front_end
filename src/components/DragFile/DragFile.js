import classnames from "classnames/bind";
import styles from "./DragFile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faFile } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { getFileType } from "../../utils/fileUtils";
import { UploadFile, UploadFolder } from "../../services/FileServices";
import axios from "axios";
const cx = classnames.bind(styles);
function DragFile({
  handleClose,
  handleSendFile,
  stateUpload,
  handleStateUpload,
  fileUpdate = null,
}) {
  const [previewImages, setPreviewImages] = useState(null);
  const [files, setFiles] = useState(null);
  const [file, setFile] = useState(null);
  const [update, setUpdate] = useState(fileUpdate);
  const [prediction, setPrediction] = useState();
  const refInputFile = useRef();
  const handleInputFile = () => {
    refInputFile.current.click();
  };
  useEffect(() => {
    if (stateUpload == true) {
      const formData = new FormData();
      formData.append("file", files);
      UploadFolder(formData);
      handleStateUpload(false);
      // const formData = new FormData();
      // formData.append("file", files);
      // try {
      //   const response = axios.post("http://localhost:5000/predict", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   });
      //   handleStateUpload(false);
      //   setPrediction(response);
      // } catch (error) {
      //   console.error("There was an error!", error);
      // }
    }
  }, [stateUpload]);

  const handleFileChange = async (event) => {
    setUpdate(null);
    const selectedFile = event.target.files[0];
    const filetype = getFileType(selectedFile.name);
    if (selectedFile != undefined) {
      if (filetype == "image") {
        setPreviewImages([URL.createObjectURL(selectedFile)]);
      } else {
        setFile(selectedFile);
      }
      setFiles(selectedFile);
    }
    handleSendFile(selectedFile.name, filetype);
  };
  return (
    <>
      {file != null ? (
        <div className={cx("file")}>
          <div>
            <div className={cx("icon_file")}>
              <FontAwesomeIcon icon={faFile} />
            </div>
            <span>{file.name}</span>
          </div>
          <FontAwesomeIcon
            icon={faClose}
            className={cx("icon")}
            onClick={() => {
              setFile(null);
              setFiles(null);
            }}
          />
        </div>
      ) : (
        <div className={cx("wrapper")}>
          <input
            onChange={handleFileChange}
            ref={refInputFile}
            type="file"
            hidden
          ></input>
          <div className={cx("container")}>
            <div
              className={cx("train")}
              style={
                previewImages == null && update == null
                  ? { backgroundColor: "#f2f3f4" }
                  : {
                      backgroundImage: `url(${
                        update != null ? update.Path : previewImages
                      })`,
                      backgroundSize: "cover",
                    }
              }
              onClick={handleInputFile}
            >
              {previewImages == null ? (
                <>
                  <h3>Thêm ảnh / video / file</h3>
                  <p>hoặc kéo thả</p>
                </>
              ) : (
                <></>
              )}
            </div>
            <div
              className={cx("close")}
              onClick={() => {
                handleClose(false);
              }}
            >
              <FontAwesomeIcon icon={faClose} className={cx("icon_close")} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DragFile;
