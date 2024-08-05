import classnames from "classnames/bind";
import styles from "./FriendPage.module.scss";
import ContainerPersonal from "../../components/layouts/ContainerPersonal/ContainerPersonal";
import { useEffect, useState } from "react";
import FriendItem from "../../components/FriendItem/FriendItem";
import { useMediaQuery } from "react-responsive";
import { getUserInfoFromToken } from "../../utils/tokenUtils";
const cx = classnames.bind(styles);
function FriendPage() {
  const [indexNav, setIndexNav] = useState(0);
  const [list, setList] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 670 });

  const user = getUserInfoFromToken();
  return (
    <ContainerPersonal user={user}>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("titles")}>
            <div
              className={cx("item_title", indexNav == 0 ? "active" : "")}
              onClick={() => {
                setIndexNav(0);
              }}
            >
              <span>Danh sách bạn bè</span>
            </div>
            <div
              className={cx("item_title", indexNav == 1 ? "active" : "")}
              onClick={() => {
                setIndexNav(1);
              }}
            >
              <span>Lời mời kết bạn</span>
            </div>
            <div
              className={cx("item_title", indexNav == 2 ? "active" : "")}
              onClick={() => {
                setIndexNav(2);
              }}
            >
              <span>Lời mời đã gửi</span>
            </div>
          </div>
          <div className={cx("content")}>
            <div className={cx("list")}></div>
          </div>
        </div>
      </div>
    </ContainerPersonal>
  );
}

export default FriendPage;
