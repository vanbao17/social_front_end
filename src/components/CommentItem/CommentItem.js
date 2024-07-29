import classnames from "classnames/bind";
import styles from "./CommentItem.module.scss";
import { useState } from "react";
import CommentInput from "../CommentInput/CommentInput";
const cx = classnames.bind(styles);
function CommentItem({ root, idRoot, list }) {
  const [seeMoreComment, setSeeMoreComment] = useState(false);
  const [stateReply, setStateReply] = useState(false);
  return (
    <div
      className={cx("wrapper")}
      style={{ marginLeft: root.level * 30 + "px" }}
    >
      <div className={cx("item")}>
        <div className={cx("image_user")}>
          <img src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-1/442511857_1023388895881941_3408531752184613502_n.jpg?stp=dst-jpg_p100x100&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=Gt1aLJ0WVSoQ7kNvgEdij5o&_nc_ht=scontent.fhan9-1.fna&oh=00_AYC4ADXbmzwoJsR7bRyYlUS3O0lfnn7z74S0YyrI5qQ0Sw&oe=66AD049D"></img>
        </div>
        <div className={cx("name_content")}>
          <div className={cx("text")}>
            <p className={cx("name")}>Phạm Văn Bảo</p>
            <span className={cx("content")}>Phạm Văn Bảo đẹp trai nhất</span>
          </div>
          <span
            onClick={() => {
              setStateReply(!stateReply);
            }}
          >
            Trả lời
          </span>
          <div
            className={cx("container_reply")}
            style={
              stateReply == true
                ? {
                    padding: "12px",
                    width: `calc(100% - ${root.level * 30 + 20}px)`,
                  }
                : { padding: "0" }
            }
          >
            {stateReply == true ? <CommentInput /> : <></>}
          </div>
        </div>
      </div>
      {root.replies.length >= 2 && root.level == 0 ? (
        seeMoreComment == false ? (
          <span
            style={{
              marginLeft: 50 + "px",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onClick={() => {
              setSeeMoreComment(true);
            }}
          >
            Xem bình luận
          </span>
        ) : (
          <p>
            <div className={cx("container_list_reply")}>
              {root.replies.map((cm) => {
                return <CommentItem root={cm} />;
              })}
            </div>
            <span
              style={{
                marginLeft: 50 + "px",
                fontSize: "14px",
                cursor: "pointer",
              }}
              onClick={() => {
                setSeeMoreComment(false);
              }}
            >
              Thu gọn
            </span>
          </p>
        )
      ) : (
        <div className={cx("container_list_reply")}>
          {root.replies.map((cm) => {
            return <CommentItem root={cm} />;
          })}
        </div>
      )}
    </div>
  );
}

export default CommentItem;
