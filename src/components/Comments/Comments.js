import classnames from "classnames/bind";
import styles from "./Comments.module.scss";
import { useState } from "react";

import CommentItem from "../CommentItem/CommentItem";

const cx = classnames.bind(styles);
function Comments({ comments }) {
  const [seeMore, setSeeMore] = useState(false);

  return (
    <div className={cx("wrapper")}>
      {seeMore == false ? (
        <>
          <CommentItem idRoot={comments[0].id} root={comments[0]}></CommentItem>{" "}
          {comments.length > 1 ? (
            <span
              className={cx("see_more")}
              onClick={() => {
                setSeeMore(true);
              }}
            >
              Hiển thị thêm
            </span>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {comments.map((comment) => {
            return (
              <CommentItem idRoot={comment.id} root={comment}></CommentItem>
            );
          })}
          <span
            className={cx("see_more")}
            onClick={() => {
              setSeeMore(false);
            }}
          >
            Thu gọn
          </span>
        </>
      )}
      {}
    </div>
  );
}

export default Comments;
