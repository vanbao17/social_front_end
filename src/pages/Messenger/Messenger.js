import classnames from "classnames/bind";
import styles from "./Messenger.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClose,
  faPaperclip,
  faPaperPlane,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import FriendItem from "../../components/FriendItem/FriendItem";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const cx = classnames.bind(styles);
function Messenger() {
  const [stateSideBarList, setStateSideBarList] = useState(false);
  const isModile = useMediaQuery({ maxWidth: 670 });
  return (
    <div className={cx("wrapper")}>
      <div
        className={cx(
          "list_convensation",
          stateSideBarList == true ? "fixed" : ""
        )}
      >
        <div className={cx("action_title")}>
          <h3>Đoạn chat</h3>
          {isModile == true ? (
            <FontAwesomeIcon
              icon={faClose}
              className={cx("icon")}
              onClick={() => {
                setStateSideBarList(!stateSideBarList);
              }}
            />
          ) : (
            <></>
          )}
        </div>
        <div className={cx("search_chat")}>
          <div className={cx("container_search")}>
            <FontAwesomeIcon icon={faSearch} />
            <input type="text"></input>
          </div>
        </div>
        <div className={cx("list")}>
          <FriendItem messeage={true}></FriendItem>
          <FriendItem messeage={true}></FriendItem>
          <FriendItem messeage={true}></FriendItem>
          <FriendItem messeage={true}></FriendItem>
          <FriendItem messeage={true}></FriendItem>
          <FriendItem messeage={true}></FriendItem>
          <FriendItem messeage={true}></FriendItem>
          <FriendItem messeage={true}></FriendItem>
          <FriendItem messeage={true}></FriendItem>
          <FriendItem messeage={true}></FriendItem>
          <FriendItem messeage={true}></FriendItem>
          <FriendItem messeage={true}></FriendItem>
          <FriendItem messeage={true}></FriendItem>
        </div>
      </div>
      <div className={cx("container_chat")}>
        <div className={cx("title_chat")}>
          {isModile == true ? (
            <div
              className={cx("icon_bar")}
              onClick={() => {
                setStateSideBarList(!stateSideBarList);
              }}
            >
              <FontAwesomeIcon icon={faBars} />
            </div>
          ) : (
            <></>
          )}

          <img src="https://scontent.fdad7-2.fna.fbcdn.net/v/t39.30808-6/316174859_3310878975826680_4460039021497477848_n.jpg?stp=c19.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=100&ccb=1-7&_nc_sid=1760b9&_nc_ohc=u_pmW6bw_zYQ7kNvgG8Lpy9&_nc_ht=scontent.fdad7-2.fna&oh=00_AYAQkxEwPy3sfUF_uIQAx71Aiq_haxRcCOJrs1FEIu41AQ&oe=66AE2C95"></img>
          <span className={cx("name")}>Phamj Vawn Bpar</span>
        </div>
        <div className={cx("content_chat")}>
          <div className={cx("container_mess_item", "sender")}>
            <div className={cx("mess_item")}>
              <span> Hú</span>
            </div>
          </div>
          <div className={cx("container_mess_item", "receiver")}>
            <div className={cx("mess_item")}>
              <span> Cuts</span>
            </div>
          </div>
        </div>
        <div className={cx("input_chat")}>
          <div className={cx("container_input")}>
            <div className={cx("icon_upload", "icon")}>
              <FontAwesomeIcon icon={faPaperclip} />
            </div>
            <input placeholder="Aa" type="text"></input>
            <div className={cx("icon_upload", "icon")}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
          </div>
        </div>
      </div>
      <div className={cx("infor_receiver")}>
        <div className={cx("infor")}>
          <img src="https://scontent.fdad7-1.fna.fbcdn.net/v/t39.30808-1/377567849_122093605772046627_1065956710991700476_n.jpg?stp=dst-jpg_s200x200&_nc_cat=111&ccb=1-7&_nc_sid=10b96e&_nc_ohc=6EjN3j9STj4Q7kNvgFJqNnY&_nc_ht=scontent.fdad7-1.fna&oh=00_AYAbAoFAoOAzmrUojnFE1Bg0h_rzKNlBANmhEWtiYOzr1A&oe=66AD733F"></img>
          <span className={cx("name")}>Phạm Văn Bảo</span>
          <div className={cx("actions")}>
            <div className={cx("item_action")}>
              <div className={cx("icon")}>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <span> Trang cá nhân</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
