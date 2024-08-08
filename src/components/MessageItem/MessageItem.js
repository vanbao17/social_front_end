import classnames from "classnames/bind";
import styles from "./MessageItem.module.scss";
import images from "../../assets/images";
const cx = classnames.bind(styles);
function MessageItem({ user }) {
  return (
    <div
      className={cx("wrapper")}
      onClick={() => {
        window.location.href = `/messenger?mess=${user.IDConversations}`;
      }}
    >
      <div className={cx("image_user")}>
        <img
          src={user.image_user == null ? images.default_image : user.image_user}
        ></img>
      </div>
      <div className={cx("infor_user")}>
        <p>{user.Name}</p>
        <div className={cx("last_content")}>
          <span>Bạn: oke</span>
          <span> 12 phút trước</span>
        </div>
      </div>
    </div>
  );
}

export default MessageItem;
