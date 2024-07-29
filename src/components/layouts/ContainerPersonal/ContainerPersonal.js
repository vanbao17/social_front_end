import classnames from "classnames/bind";
import styles from "./ContainerPersonal.module.scss";
import {
  faChevronDown,
  faChevronUp,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Dropdown from "../../Dropdown/Dropdown";
const cx = classnames.bind(styles);
function ContainerPersonal({ children }) {
  const [stateDropdownOption, setStateDropdownOption] = useState(false);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container_wall_personal")}>
        <div className={cx("wall")}>
          <div className={cx("infor_user")}>
            <div className={cx("banner")}>
              <img src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/312192024_650730949904687_7331946621600416749_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=P3Gh4YkzcS0Q7kNvgGvzpGK&_nc_ht=scontent.fhan9-1.fna&oh=00_AYDnmlZPZDAgJwMxMsJgnuRHiYyomTplv2tgbuhsbaU__A&oe=66AD44D8"></img>
            </div>
            <div className={cx("infor")}>
              <div className={cx("infor_left")}>
                <div className={cx("image_user")}>
                  <img src="https://scontent.fhan9-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=HNv6-cLkGacQ7kNvgH4MWHl&_nc_ht=scontent.fhan9-1.fna&oh=00_AYCA3oIryHJ8pgk9cq9kzGOTzDI-vjZAgx2Qqw17VQGtTQ&oe=66CEC9F8"></img>
                </div>
                <div className={cx("name_friends")}>
                  <h2>Phạm Văn Bảo</h2>
                  <span>428 bạn bè</span>
                </div>
              </div>
              <div className={cx("infor_right")}>
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
