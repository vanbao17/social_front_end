import classnames from "classnames/bind";
import styles from "./CreatePost.module.scss";
import { useMediaQuery } from "react-responsive";

import Popup from "../Popup/Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faEarthAmerica,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import TextAreaInput from "../TextAreaInput/TextAreaInput";
import DragFile from "../DragFile/DragFile";
import { useEffect, useState } from "react";
import { addPost, updatePost } from "../../services/PostServices";
import { getUserInfoFromToken } from "../../utils/tokenUtils";
import { formatNewDate } from "../../utils/dateUtils";
import { updateFilePost, UploadFile } from "../../services/FileServices";
const cx = classnames.bind(styles);
function CreatePost({ handleClose, dataUpdate = null }) {
  const [stateUpload, setStateUpload] = useState(false);
  const [stateHandleUpload, setStateHandleUpload] = useState(false);
  const [textPost, setTextPost] = useState("");
  const [file, setFile] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 670 });
  console.log(dataUpdate);
  const user = getUserInfoFromToken();
  const handleStateUpload = (s) => {
    if (s == null) {
      setStateUpload(true);
    } else {
      setStateUpload(false);
      setFile(null);
    }
  };
  const handleFile = (fileName, filetype) => {
    if (fileName != undefined && filetype != undefined) {
      setFile({ fileName: fileName, filetype: filetype });
    }
  };
  const handleSubmit = async () => {
    setStateHandleUpload(true);
    try {
      const responeAddPost = await addPost(user.IDAccount, textPost);
      const PostId = responeAddPost.data;
      if (file != null) {
        await UploadFile(file, PostId);
        setStateHandleUpload(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleUpdate = async () => {
    const PostId = dataUpdate.IDPost;
    setStateHandleUpload(true);
    try {
      const responeUpdatePost = await updatePost(PostId, textPost);
      if (file != null && responeUpdatePost.status == 200) {
        await updateFilePost(file, dataUpdate.ID, PostId);
        setStateHandleUpload(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Popup width={isMobile == false ? "30%" : "100%"}>
      <div className={cx("wrapper")}>
        <div className={cx("title")}>
          <h2>Đăng bài</h2>
          <div
            className={cx("close")}
            onClick={() => {
              handleClose(false);
            }}
          >
            <FontAwesomeIcon icon={faClose} />
          </div>
        </div>
        <div className={cx("container_content")}>
          <div className={cx("infor_user")}>
            <div className={cx("image_user")}>
              <img src="https://scontent.fdad7-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=HNv6-cLkGacQ7kNvgFE7TFa&_nc_ht=scontent.fdad7-1.fna&gid=AnhCHh-KMS9BeXgaLfiFdEG&oh=00_AYBhBY5FurYO-mFA4ovOg5YRqCmkKySbxHKDOuiGM7OUKg&oe=66CDE8F8"></img>
            </div>
            <div className={cx("name_user")}>
              <p>Phạm Văn Bảo</p>
              <div className={cx("state_post")}>
                <FontAwesomeIcon icon={faEarthAmerica} />
                <span>Công khai</span>
              </div>
            </div>
          </div>
          <div className={cx("container_input")}>
            <TextAreaInput
              handleDataText={(e) => {
                setTextPost(e);
              }}
              textUpdate={dataUpdate}
            />
          </div>
          {stateUpload == true || dataUpdate != null ? (
            <div className={cx("container_dragfile")}>
              <DragFile
                handleClose={(state) => {
                  handleStateUpload(state);
                }}
                handleSendFile={handleFile}
                stateUpload={stateHandleUpload}
                fileUpdate={dataUpdate}
                handleStateUpload={(st) => {
                  setStateHandleUpload(st);
                }}
              />
            </div>
          ) : (
            <></>
          )}

          <div className={cx("action_for_post")}>
            <span>Thêm vào bài viết của bạn</span>
            <div
              className={cx("actions", stateUpload == true ? "active" : "")}
              onClick={() => {
                handleStateUpload(null);
              }}
            >
              <FontAwesomeIcon icon={faPaperclip} />
            </div>
          </div>
          <div className={cx("public")}>
            {dataUpdate == null ? (
              <button
                onClick={handleSubmit}
                className={cx(
                  textPost.length > 0 || file != null ? "" : "disable"
                )}
              >
                <span>Đăng</span>
              </button>
            ) : (
              <button
                onClick={handleUpdate}
                className={cx(
                  textPost.length > 0 || file != null ? "" : "disable"
                )}
              >
                <span>Sửa</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Popup>
  );
}

export default CreatePost;
