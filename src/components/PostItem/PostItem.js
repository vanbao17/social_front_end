import classnames from "classnames/bind";
import styles from "./PostItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faBug,
  faComment,
  faEllipsisV,
  faPen,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Comments from "../Comments/Comments";
import CommentInput from "../CommentInput/CommentInput";
import images from "../../assets/images";
import { formatNewDate } from "../../utils/dateUtils";
import axios from "axios";
import { getFilePost } from "../../services/FileServices";
import { deletePost } from "../../services/PostServices";
const cx = classnames.bind(styles);
function PostItem({ fixedComment, handleComment, dataPostItem, updatePost }) {
  const [stateAction, setStateAction] = useState(false);
  const [stateLike, setStateLike] = useState(false);
  const [limitText, setLimitText] = useState(100);
  const [filePost, setFilePost] = useState([]);

  const countText = (string, index) => {
    const filter = string.split(" ");
    const filterText = filter.slice(0, index);
    return filterText.join(" ");
  };
  const handleText = () => {
    if (limitText == 100) {
      setLimitText(dataPostItem.Content.length);
    } else {
      setLimitText(100);
    }
  };

  const fetchFilePost = async () => {
    const IDPost = dataPostItem.ID;
    const responseFilePost = await getFilePost(IDPost);
    setFilePost(responseFilePost.data);
  };
  const handleDeletePost = async () => {
    const IDPost = dataPostItem.ID;
    const responseDeletePost = await deletePost(IDPost);
    if (responseDeletePost.status == 200) {
      window.location.reload();
    }
  };
  useEffect(() => {
    if (dataPostItem != undefined) {
      fetchFilePost();
    }
  }, [dataPostItem]);
  return (
    <div className={cx("wrapper", fixedComment == true ? "fixed" : "")}>
      <div className={cx("title_post")}>
        <div className={cx("infor")}>
          <div className={cx("image_user")}>
            {dataPostItem != undefined ? (
              <img
                src={
                  dataPostItem.Image_user == null
                    ? images.default_image
                    : dataPostItem.Image_user
                }
              />
            ) : (
              <></>
            )}
          </div>
          <div className={cx("name_time")}>
            <p className={cx("name")}>
              {dataPostItem != undefined ? dataPostItem.Name : ""}
            </p>
            <span className={cx("time_public")}>
              {dataPostItem != undefined
                ? formatNewDate(dataPostItem.Create_at)
                : ""}
            </span>
          </div>
        </div>
        <div className={cx("action")}>
          <div
            className={cx("icon_action")}
            onClick={() => {
              setStateAction(!stateAction);
            }}
          >
            <FontAwesomeIcon icon={faEllipsisV} className={cx("icon")} />
          </div>
          {stateAction == true ? (
            <ul className={cx("action_dropdown")}>
              <li>
                <FontAwesomeIcon icon={faBug} />
                <span>Báo cáo bài viết</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faBookmark} />
                <span>Lưu bài viết</span>
              </li>
              <li
                onClick={() => {
                  updatePost({ ...dataPostItem, ...filePost[0] });
                }}
              >
                <FontAwesomeIcon icon={faPen} />
                <span>Chỉnh sửa bài viết</span>
              </li>
              <li onClick={handleDeletePost}>
                <FontAwesomeIcon icon={faTrash} />
                <span>Xóa bài viết</span>
              </li>
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={cx("content_post")}>
        {dataPostItem != undefined ? (
          <div className={cx("text")}>
            {countText(dataPostItem.Content, limitText) + "..."}
            <span className={cx("see_more")} onClick={handleText}>
              {" "}
              {dataPostItem.Content.length > 100
                ? limitText == 100
                  ? "Xem thêm"
                  : "Thu gọn"
                : ""}
            </span>
          </div>
        ) : (
          <></>
        )}

        <div className={cx("upload")}>
          {filePost.map((file) => {
            if (file.FileType == "image") {
              return <img src={file.Path} alt={file.filename}></img>;
            }
            return;
          })}
        </div>
        <div className={cx("interact_post")}>
          <span>1k2 lượt thích</span>
          <span>1k2 lượt bình luận</span>
        </div>
        <div className={cx("action_post")}>
          <div
            className={cx("like", stateLike == true ? "active" : "")}
            onClick={() => {
              setStateLike(!stateLike);
            }}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
            <span>Thích</span>
          </div>
          <div
            className={cx("comment")}
            onClick={() => {
              handleComment(dataPostItem);
            }}
          >
            <FontAwesomeIcon icon={faComment} />
            <span>Bình luận</span>
          </div>
        </div>
        <div className={cx("container_comment")}>
          <Comments IDPost={dataPostItem.ID} />
        </div>
        <div
          className={cx(
            "container_comment_input",
            fixedComment == true ? "fixed" : ""
          )}
        >
          <CommentInput
            idPost={dataPostItem.ID}
            idReply={null}
            fixedComment={fixedComment}
          />
        </div>
      </div>
    </div>
  );
}

export default PostItem;
