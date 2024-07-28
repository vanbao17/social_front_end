import classnames from "classnames/bind";
import styles from "./Notifications.module.scss";
import NotificationsItem from "../NotificationsItem/NotificationsItem";
const cx = classnames.bind(styles);
function Notifications() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>
        <h3>Đoạn chat</h3>
      </div>
      <div className={cx("filter")}>
        <div className={cx("item_filter", "active")}>
          <span>Tất cả</span>
        </div>
        <div className={cx("item_filter")}>
          <span>Chưa đọc</span>
        </div>
      </div>
      <div className={cx("list_notification")}>
        <NotificationsItem />
        <NotificationsItem />
        <NotificationsItem />
        <NotificationsItem />
        <NotificationsItem />
        <NotificationsItem />
        <NotificationsItem />
        <NotificationsItem />
      </div>
    </div>
  );
}

export default Notifications;
