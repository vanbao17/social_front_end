import classnames from "classnames/bind";
import styles from "./Comments.module.scss";
import { useEffect, useState } from "react";

import CommentItem from "../CommentItem/CommentItem";
import { getCommentPost } from "../../services/CommentServices";

const cx = classnames.bind(styles);

function Comments({ IDPost }) {
  const [seeMore, setSeeMore] = useState(false);
  const [cm, setCm] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getCommentPost(IDPost);
        setCm(comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [IDPost]);
  return (
    <div className={cx("wrapper")}>
      {seeMore === false ? (
        <>
          {cm[0] && <CommentItem idRoot={cm[0].id} root={cm[0]} />}
          {cm.length > 1 && (
            <span
              className={cx("see_more")}
              onClick={() => {
                setSeeMore(true);
              }}
            >
              Hiển thị thêm
            </span>
          )}
        </>
      ) : (
        <>
          {cm.map((comment) => (
            <CommentItem key={comment.id} idRoot={comment.id} root={comment} />
          ))}
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
    </div>
  );
}

export default Comments;
