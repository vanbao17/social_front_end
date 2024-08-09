import classnames from "classnames/bind";
import styles from "./NotiPopup.module.scss";
import images from "../../assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faComment,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { Context } from "../../contexts/Context";
import { updateIsRead } from "../../services/UserServices";
const cx = classnames.bind(styles);
function NotiPopup({ data }) {
  const { setDataNoti } = useContext(Context);
  const update = async () => {
    const responseUpdateIsRead = await updateIsRead(data.IDNoti);
    if (responseUpdateIsRead.status == 200) {
      if ((data.type = "messenger")) {
        window.location.href = `/messenger?mess=${data.IDPost}`;
      } else {
        window.location.href = `/post?id=${data.IDPost}`;
      }
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper_item")} onClick={update}>
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
                  data.image_user == null
                    ? images.default_image
                    : data.image_user
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
      <div
        className={cx("close")}
        onClick={() => {
          setDataNoti(null);
        }}
      >
        <FontAwesomeIcon className={cx("icon")} icon={faClose} />
      </div>
    </div>
  );
}

export default NotiPopup;
