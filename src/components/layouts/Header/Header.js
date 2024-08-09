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
  faFile,
  faRightFromBracket,
  faSearch,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import Notifications from "../../Notifications/Notifications";
import Messages from "../../Messages/Messages";
import { Context } from "../../../contexts/Context";
import { getUserInfoFromToken } from "../../../utils/tokenUtils";
import { getInforUser, getNoti } from "../../../services/UserServices";
import images from "../../../assets/images";
import io from "socket.io-client";
const cx = classnames.bind(styles);
function Header() {
  const { menufix } = useContext(Context);
  const [state, seState] = useState();
  const [inforUser, setInforUser] = useState(null);
  const [listNoti, setListNoti] = useState([]);
  const { dataNoti, setDataNoti } = useContext(Context);
  const [socket, setSocket] = useState(
    io("https://pycheck.xyz", {
      transports: ["websocket"],
      upgrade: true,
    })
  );
  const handleChangeState = (string) => {
    if (string == state) {
      seState("");
    } else {
      seState(string);
    }
  };
  const user = getUserInfoFromToken();
  const handleLogout = async () => {
    await localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    socket.emit("joinSocial", user.IDAccount);
    socket.on("responseNoti", (data) => {
      setDataNoti(...data);
    });
    const fetchInforUser = async () => {
      const responseUser = await getInforUser(user.MSV);
      setInforUser(responseUser.data[0]);
    };
    fetchInforUser();
  }, []);
  useEffect(() => {
    const fetchNoti = async () => {
      const responseNotis = await getNoti(user.IDAccount);
      const filter = responseNotis.data.filter((noti) => noti.is_read == 0);
      setListNoti(filter);
    };
    fetchNoti();
  }, [dataNoti]);

  return (
    // <div className={cx("wrapper", menufix == true ? "fixed" : "")}>
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <a href="/" className={cx("logo")}>
          <span>PVB</span>
        </a>
        <div className={cx("navigates")}>
          <a href="/">
            <div className={cx("container_icon")}>
              <HomeIcon className={cx("icon")} />
            </div>
          </a>
          <a href={`/personal?sinhvien=${user.MSV}`}>
            <div className={cx("container_icon")}>
              <FontAwesomeIcon
                style={{ width: "24px", height: "24px" }}
                icon={faUser}
                className={cx("icon")}
              />
            </div>
          </a>
          <a href="/search">
            <div className={cx("container_icon")}>
              <FontAwesomeIcon
                style={{ width: "24px", height: "24px" }}
                icon={faSearch}
                className={cx("icon")}
              />
            </div>
          </a>
          <div className={cx("container_icon")}>
            <FontAwesomeIcon
              style={{ width: "24px", height: "24px" }}
              icon={faFile}
              className={cx("icon")}
            />
          </div>
          <a href="/friends">
            <div className={cx("container_icon")}>
              <FontAwesomeIcon
                style={{ width: "24px", height: "24px" }}
                icon={faUserGroup}
                className={cx("icon")}
              />
            </div>
          </a>
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
            {listNoti.length != 0 ? (
              <span className={cx("index_coment")}>{listNoti.length}</span>
            ) : (
              <></>
            )}

            <NotificationIcon className={cx("icon")} />
          </div>
          <div
            className={cx("action_user")}
            onClick={() => {
              handleChangeState("user");
            }}
          >
            <img
              style={{ objectFit: "cover" }}
              className={cx("image_user")}
              src={
                inforUser != null
                  ? inforUser.image_user == null
                    ? images.default_image
                    : inforUser.image_user
                  : ""
              }
            ></img>
          </div>
          <div className={cx("container_dropdown")}>
            {state == "mess" ? (
              <Messages IDAccount={inforUser != null ? inforUser.ID : ""} />
            ) : (
              <></>
            )}
            {state == "noti" ? <Notifications /> : <></>}
            {state == "user" ? (
              <div className={cx("actions_user")}>
                <a href="#" className={cx("item_action")}>
                  <FontAwesomeIcon icon={faCircleInfo} />
                  <span>Thay đổi thông tin tài khoản</span>
                </a>
                <span className={cx("item_action")} onClick={handleLogout}>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <span>Đăng xuất</span>
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className={cx("navigates_phone")}>
        <a href="/">
          <div className={cx("container_icon")}>
            <HomeIcon className={cx("icon")} />
          </div>
        </a>
        <a href={`/personal?sinhvien=${user.MSV}`}>
          <div className={cx("container_icon")}>
            <FontAwesomeIcon
              style={{ width: "24px", height: "24px" }}
              icon={faUser}
              className={cx("icon")}
            />
          </div>
        </a>
        <a href="/files">
          <div className={cx("container_icon")}>
            <FontAwesomeIcon
              style={{ width: "24px", height: "24px" }}
              icon={faFile}
              className={cx("icon")}
            />
          </div>
        </a>
        {/* <a href="/friends">
          <div className={cx("container_icon")}>
            <FontAwesomeIcon
              style={{ width: "24px", height: "24px" }}
              icon={faUserGroup}
              className={cx("icon")}
            />
          </div>
        </a> */}
        <a href="/search">
          <div className={cx("container_icon")}>
            <FontAwesomeIcon
              style={{ width: "24px", height: "24px" }}
              icon={faSearch}
              className={cx("icon")}
            />
          </div>
        </a>
        <a href="/messenger">
          <div className={cx("container_icon")}>
            <MessIcon className={cx("icon")} />
          </div>
        </a>
        <a href="/notifications">
          <div className={cx("container_icon")}>
            {listNoti.length != 0 ? (
              <span className={cx("index_coment")}>{listNoti.length}</span>
            ) : (
              <></>
            )}
            <NotificationIcon className={cx("icon")} />
          </div>
        </a>
      </div>
    </div>
  );
}

export default Header;
