import classnames from "classnames/bind";
import styles from "./FriendItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import Dropdown from "../Dropdown/Dropdown";
import { useState } from "react";
const cx = classnames.bind(styles);
function FriendItem({ messeage, width, invite, friended, sended }) {
  const [stateActionMess, setStateActionMess] = useState(false);
  return (
    <div
      className={cx("wrapper", messeage == true ? "mess" : "")}
      style={{ width: width }}
    >
      <div className={cx("image_user", messeage == true ? "image_mess" : "")}>
        <img src="https://scontent.fdad7-1.fna.fbcdn.net/v/t39.30808-1/377567849_122093605772046627_1065956710991700476_n.jpg?stp=dst-jpg_s200x200&_nc_cat=111&ccb=1-7&_nc_sid=10b96e&_nc_ohc=6EjN3j9STj4Q7kNvgFJqNnY&_nc_ht=scontent.fdad7-1.fna&oh=00_AYAbAoFAoOAzmrUojnFE1Bg0h_rzKNlBANmhEWtiYOzr1A&oe=66AD733F"></img>
      </div>
      <div className={cx("name_action")}>
        <div className={cx("name")}>
          <p>Phạm Văn Bảo</p>
        </div>
        <div className={cx("action_button")}>
          {invite == true ? (
            <button className={cx("active")}>
              <p>Xác nhận</p>
            </button>
          ) : (
            ""
          )}
          {messeage == true ? (
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
      {messeage == true ? (
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
