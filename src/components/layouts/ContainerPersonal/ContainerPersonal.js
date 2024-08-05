import classnames from "classnames/bind";
import styles from "./ContainerPersonal.module.scss";
import {
  faChevronDown,
  faChevronUp,
  faMessage,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Dropdown from "../../Dropdown/Dropdown";
import images from "../../../assets/images";
import { getUserInfoFromToken } from "../../../utils/tokenUtils";
import CryptoJS from "crypto-js";
import {
  addConvensation,
  checkConvensation,
} from "../../../services/MessServices";
const cx = classnames.bind(styles);
function ContainerPersonal({ children, user }) {
  const [stateDropdownOption, setStateDropdownOption] = useState(false);
  const userMain = getUserInfoFromToken();
  const handleGotoMess = async () => {
    const responseCheck = await checkConvensation(user.ID);
    if (responseCheck.data.length == 0) {
      const responseAddConven = await addConvensation(
        userMain.IDAccount,
        user.ID
      );
      if (responseAddConven.status == 200) {
        window.location.href = `/messenger?mess=${responseAddConven.data[0]}`;
      }
    } else {
      window.location.href = `/messenger?mess=${responseCheck.data[0].ID}`;
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container_wall_personal")}>
        <div className={cx("wall")}>
          <div className={cx("infor_user")}>
            <div className={cx("banner")}>
              {user != undefined ? (
                <img
                  src={
                    user.image_banner == null
                      ? images.default_banner
                      : user.image_banner
                  }
                ></img>
              ) : (
                <></>
              )}
            </div>
            <div className={cx("infor")}>
              <div className={cx("infor_left")}>
                <div className={cx("image_user")}>
                  {user != undefined ? (
                    <img
                      style={{ width: "180px", height: "180px" }}
                      src={
                        user.image_user == null
                          ? images.default_image
                          : user.image_user
                      }
                    ></img>
                  ) : (
                    <></>
                  )}
                </div>
                <div className={cx("name_friends")}>
                  <h2>{user != undefined ? user.Name : ""}</h2>
                  <span>428 bạn bè</span>
                </div>
              </div>
              <div className={cx("infor_right")}>
                {user &&
                ((user.ID && user.ID !== userMain.IDAccount) ||
                  (user.ID === undefined &&
                    user.IDAccount !== userMain.IDAccount)) ? (
                  <div className={cx("messeger")} onClick={handleGotoMess}>
                    <FontAwesomeIcon icon={faMessage} />
                    <span>Gửi tin nhắn</span>
                  </div>
                ) : null}

                <div className={cx("update_infor")}>
                  <FontAwesomeIcon icon={faPen} />
                  <span>Chỉnh sửa trang cá nhân</span>
                </div>
                <div className={cx("container_action_other")}>
                  <div
                    className={cx("icon_chervon", "update_infor")}
                    onClick={() => {
                      setStateDropdownOption(!stateDropdownOption);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={
                        stateDropdownOption == false
                          ? faChevronDown
                          : faChevronUp
                      }
                    />
                  </div>
                  {stateDropdownOption == true ? (
                    <Dropdown width={"200px"} right={"0"}>
                      <ul className={cx("list_option")}>
                        <li>
                          <a href="#">1</a>
                        </li>
                        <li>
                          <a href="#">1</a>
                        </li>
                        <li>
                          <a href="#">1</a>
                        </li>
                        <li>
                          <a href="#">1</a>
                        </li>
                      </ul>
                    </Dropdown>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default ContainerPersonal;
