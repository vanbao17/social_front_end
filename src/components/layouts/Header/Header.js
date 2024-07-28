import classnames from "classnames/bind";
import styles from "./Header.module.scss";
import {
  HomeIcon,
  MessIcon,
  NotificationIcon,
  PersonalIcon,
} from "../../../assets/IconSvg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Notifications from "../../Notifications/Notifications";
import Messages from "../../Messages/Messages";
const cx = classnames.bind(styles);
function Header() {
  const [state, seState] = useState();
  const handleChangeState = (string) => {
    if (string == state) {
      seState("");
    } else {
      seState(string);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("logo")}>
        <span>PVB</span>
      </div>
      <div className={cx("navigates")}>
        <div className={cx("container_icon")}>
          <HomeIcon className={cx("icon")} />
        </div>
        <div className={cx("container_icon")}>
          <PersonalIcon className={cx("icon")} />
        </div>
      </div>
      <div className={cx("actions")}>
        <div
          className={cx("container_icon")}
          onClick={() => {
            handleChangeState("mess");
          }}
        >
          <MessIcon className={cx("icon")} />
        </div>
        <div
          className={cx("container_icon")}
          onClick={() => {
            handleChangeState("noti");
          }}
        >
          <NotificationIcon className={cx("icon")} />
        </div>
        <div
          className={cx("action_user")}
          onClick={() => {
            handleChangeState("user");
          }}
        >
          <img
            className={cx("image_user")}
            src="https://scontent.fdad8-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=HNv6-cLkGacQ7kNvgFdcUtx&_nc_ht=scontent.fdad8-1.fna&oh=00_AYBkhIWqpFu3pdCGdQR07OEQyfOcxaYXMpqj1QWA5qOCCw&oe=66CC9778"
          ></img>
        </div>
        <div className={cx("container_dropdown")}>
          {state == "mess" ? <Messages /> : <></>}
          {state == "noti" ? <Notifications /> : <></>}
          {state == "user" ? (
            <div className={cx("actions_user")}>
              <a href="#" className={cx("item_action")}>
                <FontAwesomeIcon icon={faCircleInfo} />
                <span>Thay đổi thông tin tài khoản</span>
              </a>
              <a href="#" className={cx("item_action")}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span>Đăng xuất</span>
              </a>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
