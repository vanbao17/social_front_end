import classnames from "classnames/bind";
import styles from "./NotificationsItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
const cx = classnames.bind(styles);
function NotificationsItem() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("image_user")}>
          <img src="https://scontent.fdad8-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p56x56&_nc_cat=1&ccb=1-7&_nc_sid=22ec41&_nc_ohc=HNv6-cLkGacQ7kNvgFdcUtx&_nc_ht=scontent.fdad8-1.fna&gid=AlHdGHaxM5OhNlcGwP6PZEc&oh=00_AYBuVQB-5t2faPz7SRW2hQeIEbVK2GR_tHrVLIu9W9gS7A&oe=66CC9778"></img>
          <div className={cx("icon_comment")}>
            <FontAwesomeIcon icon={faComment} className={cx("icon")} />
          </div>
        </div>
        <div className={cx("content")}>
          <div className={cx("content_noti")}>
            <strong>Pham Van Bao</strong> va <strong>van bao</strong> đã bình
            luận vào bài viết của bạn.
          </div>
          <div className={cx("time_stap")}>52 Phút</div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsItem;
