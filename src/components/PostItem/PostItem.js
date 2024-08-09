import classnames from "classnames/bind";
import styles from "./PostItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faBug,
  faClose,
  faComment,
  faEllipsisV,
  faFile,
  faPen,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Comments from "../Comments/Comments";
import CommentInput from "../CommentInput/CommentInput";
import images from "../../assets/images";
import { formatNewDate } from "../../utils/dateUtils";
import { getFilePost } from "../../services/FileServices";
import {
  checkUserLike,
  deletePost,
  getCountComment,
  getCountLike,
} from "../../services/PostServices";
import io from "socket.io-client";
import { formatArr } from "../../utils/commentUtils";
import { getUserInfoFromToken } from "../../utils/tokenUtils";
import { deleteNoti } from "../../services/UserServices";
const cx = classnames.bind(styles);
function PostItem({ fixedComment, handleComment, dataPostItem, updatePost }) {
  const [stateAction, setStateAction] = useState(false);
  const [stateLike, setStateLike] = useState(null);
  const [indLike, setIndLike] = useState(0);
  const [indComment, setIndComment] = useState(0);
  const [socket, setSocket] = useState(
    io("https://pycheck.xyz", {
      transports: ["websocket"],
      upgrade: true,
    })
  );
  const user = getUserInfoFromToken();
  const [limitText, setLimitText] = useState(100);
  const [filePost, setFilePost] = useState([]);
  useEffect(() => {
    const fetchCountLike = async () => {
      const IDPost = dataPostItem.ID;
      const IDAccount = user.IDAccount;
      const responseCountLike = await getCountLike(IDPost, IDAccount);
      const responseCheck = await checkUserLike(IDAccount, IDPost);
      const responseCountComment = await getCountComment(IDPost);
      setIndComment(responseCountComment.data[0]["count(*)"]);

      if (responseCheck.data[0]["count(*)"] == 1) {
        setStateLike(true);
      } else {
        setStateLike(false);
      }
      setIndLike(responseCountLike.data[0]["count(*)"]);
    };
    fetchCountLike();
  }, []);

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

  const handleSubmit = async (dt) => {
    const IDPost = dataPostItem.ID;
    const IDAccount = user.IDAccount;
    await socket.emit("createComment", dt);
    const Sender_id = IDAccount;
    const IDAccountPost = dataPostItem.IDAccount;
    const stateNoti = "comment";
    await socket.emit("postNotification", {
      IDPost,
      IDAccountPost,
      Sender_id,
      stateNoti,
    });
  };
  useEffect(() => {
    socket.emit("joinPost", dataPostItem.ID);
    socket.emit("joinSocial", dataPostItem.IDAccount);
    socket.on("responseCountLike", (count) => {
      setIndLike(count);
    });
    socket.on("countComment", (count) => {
      setIndComment(count[0]["count(*)"]);
    });
    return () => {
      socket.off("responseCountLike");
      socket.off("countComment");
    };
  }, [stateLike]);
  const handleLike = async () => {
    const IDPost = dataPostItem.ID;
    const IDAccount = user.IDAccount;
    if (stateLike == false) {
      await socket.emit("likePost", { IDPost, IDAccount });
      if (IDAccount != dataPostItem.IDAccount) {
        const Sender_id = IDAccount;
        const IDAccountPost = dataPostItem.IDAccount;
        const stateNoti = "like";
        await socket.emit("postNotification", {
          IDPost,
          IDAccountPost,
          Sender_id,
          stateNoti,
        });
      }
    } else {
      await socket.emit("unLikePost", { IDPost, IDAccount });
      await deleteNoti(IDAccount, IDPost, "like");
    }
    return () => {
      socket.off("likePost");
      socket.off("unLikePost");
      socket.off("postNotification");
    };
  };
  return (
    <div className={cx("wrapper", fixedComment == true ? "fixed" : "")}>
      <div className={cx("title_post")}>
        <div
          className={cx("infor")}
          onClick={() => {
            window.location.href = `/personal?sinhvien=${dataPostItem.MSV}`;
          }}
        >
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
              {user.IDAccount == dataPostItem.IDAccount ? (
                <>
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
                </>
              ) : (
                <></>
              )}
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
          {filePost.map((file, index) => {
            if (file.FileType == "image") {
              return (
                <img key={index} src={file.Path} alt={file.filename}></img>
              );
            }
            if (file.FileType == "file") {
              return (
                <a className={cx("file")} href={file.Path} target="_blank">
                  <div>
                    <div className={cx("icon_file")}>
                      <FontAwesomeIcon icon={faFile} />
                    </div>
                    <span>{file.filename}</span>
                  </div>
                </a>
              );
            }
            if (file.FileType == "video") {
              return (
                <video className={cx("video")} controls={true}>
                  <source src={file.Path} type="video/mp4" />
                </video>
              );
            }
            return;
          })}
        </div>
        <div className={cx("interact_post")}>
          <span>{indLike} lượt thích</span>
          <span>{indComment} lượt bình luận</span>
        </div>
        <div className={cx("action_post")}>
          <div
            className={cx("like", stateLike == true ? "active" : "")}
            onClick={() => {
              setStateLike(!stateLike);
              handleLike();
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
          <Comments socket={socket} IDPost={dataPostItem.ID} />
        </div>
        <div
          className={cx(
            "container_comment_input",
            fixedComment == true ? "fixed" : ""
          )}
        >
          <CommentInput
            sendData={handleSubmit}
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
