import classnames from "classnames/bind";
import styles from "./Notifications.module.scss";
import NotificationsItem from "../NotificationsItem/NotificationsItem";
import { useContext, useEffect, useState } from "react";
import { getUserInfoFromToken } from "../../utils/tokenUtils";
import { getNoti } from "../../services/UserServices";
import io from "socket.io-client";
const cx = classnames.bind(styles);
function Notifications() {
  const user = getUserInfoFromToken();
  const [socket, setSocket] = useState(
    io("https://pycheck.xyz", {
      transports: ["websocket"],
      upgrade: true,
    })
  );
  const [listNoti, setListNoti] = useState([]);
  useEffect(() => {
    socket.emit("joinSocial", user.IDAccount);
    socket.on("responseNoti", (data) => {
      setListNoti((prev) => [...data, ...prev]);
    });
    const fetchNoti = async () => {
      const responseNotis = await getNoti(user.IDAccount);
      setListNoti(responseNotis.data);
    };
    fetchNoti();
  }, []);
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
        {listNoti.map((noti) => {
          return <NotificationsItem data={noti} />;
        })}
      </div>
    </div>
  );
}

export default Notifications;
