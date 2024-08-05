import classnames from "classnames/bind";
import styles from "./Messages.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MessageItem from "../MessageItem/MessageItem";
const cx = classnames.bind(styles);
function Messages() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("title")}>
          <h3>Đoạn chat</h3>
        </div>
        <div className={cx("container_input")}>
          <FontAwesomeIcon icon={faSearch} className={cx("icon")} />
          <input type="text" placeholder="Nhập tên đoạn chat"></input>
        </div>
        <div className={cx("list_mess")}>
          <MessageItem />
        </div>
      </div>
    </div>
  );
}

export default Messages;
