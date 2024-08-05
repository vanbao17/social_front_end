import classnames from "classnames/bind";
import styles from "./FriendItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import Dropdown from "../Dropdown/Dropdown";
import { useState } from "react";
import images from "../../assets/images";
const cx = classnames.bind(styles);
function FriendItem({
  onClick = null,
  messeage = null,
  width,
  invite,
  friended,
  sended,
  active,
}) {
  const [stateActionMess, setStateActionMess] = useState(false);
  return (
    <div
      className={cx(
        "wrapper",
        messeage != null ? "mess" : "",
        active == true ? "active" : ""
      )}
      style={{ width: width }}
      onClick={() => {
        onClick(messeage);
      }}
    >
      <div className={cx("image_user", messeage != null ? "image_mess" : "")}>
        <img
          src={
            messeage.image_user == null
              ? images.default_image
              : messeage.image_user
          }
        ></img>
      </div>
      <div className={cx("name_action")}>
        <div className={cx("name")}>
          <p>{messeage.Name}</p>
        </div>
        <div className={cx("action_button")}>
          {invite == true ? (
            <button className={cx("active")}>
              <p>Xác nhận</p>
            </button>
          ) : (
            ""
          )}
          {messeage != null ? (
            <span className={cx("last_mess")}>Bạn:oke </span>
          ) : (
            <></>
          )}
          <button className={cx("non_active")}>
            {invite == true ? <p>Xóa</p> : ""}
            {friended == true ? <p>Hủy kết bạn</p> : ""}
            {sended == true ? <p>Hủy lời mời</p> : ""}
          </button>
        </div>
      </div>
      {messeage != null ? (
        <div className={cx("action_mess_container")}>
          <div
            className={cx("icon_action")}
            onClick={() => {
              setStateActionMess(!stateActionMess);
            }}
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
          {stateActionMess == true ? (
            <Dropdown top={"100%"} right={0}>
              <ul>
                <li>
                  <span>Xóa</span>
                </li>
              </ul>
            </Dropdown>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default FriendItem;
