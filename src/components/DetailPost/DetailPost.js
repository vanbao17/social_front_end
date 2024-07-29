import classnames from "classnames/bind";
import styles from "./DetailPost.module.scss";
import Popup from "../Popup/Popup";
import PostItem from "../PostItem/PostItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
const cx = classnames.bind(styles);
function DetailPost({ handleClose }) {
  const isMobile = useMediaQuery({ maxWidth: 670 });
  return (
    <Popup
      width={isMobile == false ? "40%" : "100%"}
      height={isMobile == false ? "80vh" : "0vh"}
    >
      <div className={cx("wrapper")}>
        <div className={cx("title")}>
          <div className={cx("hidden")}></div>
          <h2>Bài viết của Phạm Văn Bảo</h2>
          <div
            className={cx("close")}
            onClick={() => {
              handleClose(false);
            }}
          >
            <FontAwesomeIcon icon={faClose} />
          </div>
        </div>
        <div className={cx("container_content")}>
          <PostItem fixedComment={true} />
        </div>
      </div>
    </Popup>
  );
}

export default DetailPost;
