import classnames from "classnames/bind";
import styles from "./MessageItem.module.scss";
const cx = classnames.bind(styles);
function MessageItem() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("image_user")}>
        <img src="https://scontent.fdad8-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=HNv6-cLkGacQ7kNvgFdcUtx&_nc_ht=scontent.fdad8-1.fna&oh=00_AYBkhIWqpFu3pdCGdQR07OEQyfOcxaYXMpqj1QWA5qOCCw&oe=66CC9778"></img>
      </div>
      <div className={cx("infor_user")}>
        <p>Pham Van Bao</p>
        <div className={cx("last_content")}>
          <span>Bạn: oke</span>
          <span> 12 phút trước</span>
        </div>
      </div>
    </div>
  );
}

export default MessageItem;
