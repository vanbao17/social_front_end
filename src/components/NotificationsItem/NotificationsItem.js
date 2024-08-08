import classnames from "classnames/bind";
import styles from "./NotificationsItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faComment,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import images from "../../assets/images";
const cx = classnames.bind(styles);
function NotificationsItem({ data }) {
  console.log(data);

  return (
    <div
      className={cx("wrapper")}
      onClick={() => {
        window.location.href = `/post?id=${data.IDPost}`;
      }}
    >
      <div className={cx("container")}>
        <div
          className={cx("image_user")}
          onClick={() => {
            window.location.href = `/personal?sinhvien=${data.MSV}`;
          }}
        >
          {data != null ? (
            <img
              src={
                data.image_user == null ? images.default_image : data.image_user
              }
            ></img>
          ) : (
            <></>
          )}

          <div className={cx("icon_comment")}>
            {data != null ? (
              data.type == "like" ? (
                <FontAwesomeIcon icon={faThumbsUp} className={cx("icon")} />
              ) : (
                <FontAwesomeIcon icon={faComment} className={cx("icon")} />
              )
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={cx("content")}>
          {data != null ? (
            <div className={cx("content_noti")}>
              <strong
                onClick={() => {
                  window.location.href = `/personal?sinhvien=${data.MSV}`;
                }}
              >
                {data.Name}
              </strong>{" "}
              {data.content}
            </div>
          ) : (
            <></>
          )}
          <div className={cx("time_stap")}>52 Phút</div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsItem;
