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
import { useState } from "react";
const cx = classnames.bind(styles);
function CreatePost({ handleClose }) {
  const [stateUpload, setStateUpload] = useState(false);
  const [textPost, setTextPost] = useState("");

  const isMobile = useMediaQuery({ maxWidth: 670 });
  const handleStateUpload = (s) => {
    if (s == null) {
      setStateUpload(true);
    } else {
      setStateUpload(false);
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
            />
          </div>
          {stateUpload == true ? (
            <div className={cx("container_dragfile")}>
              <DragFile
                handleClose={(state) => {
                  handleStateUpload(state);
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
            <button className={cx(textPost.length > 0 ? "" : "disable")}>
              <span>Đăng</span>
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
}

export default CreatePost;
