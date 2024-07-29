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
import { useState } from "react";
import Comments from "../Comments/Comments";
import CommentInput from "../CommentInput/CommentInput";
const cx = classnames.bind(styles);
function PostItem({ fixedComment, handleComment }) {
  const [stateAction, setStateAction] = useState(false);
  const [stateLike, setStateLike] = useState(false);
  const [limitText, setLimitText] = useState(100);
  const contentPost = `👋 Tình hình là mình vừa đi THI MÁY TOEIC ở IIG về và được 720đ. Một số lời khuyên cho các b chưa thi này:
- Không cần đi học cả năm trời đâu, thi TOEIC không khó đến mức đó. Tập trung ôn tầm 2 3 tháng là ổn rồi. Còn ôn ở đâu cho sát nhất thì chỉ có chương trình học của ETS (đơn vị ra đề thi TOEIC) này nhé: https://s.iigvietnam.com/tailieuToeicIIG
- Học sớm, thi sớm trước khi hết hạn thẻ sinh viên, vì sẽ được giảm chi phí học và thi kha khá nha 😃
- Sau này có khả năng sẽ chuyển dần sang thi máy hết nên cứ chuẩn bị tâm lí sẵn sàng, ôn và làm đề thi thử trên máy sẽ quen hơn với format và thao tác làm đề.
- Nhất định phải thi thử bài thi online trước khi đi thi thật, thi trước cho quen với cấu trúc đề, thao tác thế nào cho nhanh,... Thi lần đầu run quá lại tốn thêm xiền thi lại hơn 1 củ đó :3 
Chúc các bạn, các em thi tốt! Còn ai muốn tìm hiểu kĩ hơn về quá trình ôn thi, bài thi, mức độ đề thì inbox mình chỉ cho nha. 😃`;
  const countText = (string, index) => {
    const filter = string.split(" ");
    const filterText = filter.slice(0, index);
    return filterText.join(" ");
  };
  const handleText = () => {
    if (limitText == 100) {
      setLimitText(contentPost.length);
    } else {
      setLimitText(100);
    }
  };
  const comments = [
    {
      id: 1,
      text: "This is a comment",
      author: "User A",
      level: 0,
      replies: [
        {
          id: 2,
          text: "This is a reply A",
          author: "User B",
          level: 1,
          replies: [
            {
              id: 3,
              text: "This is a reply C",
              author: "User C",
              level: 2,
              replies: [],
            },
            {
              id: 4,
              text: "This is a reply D",
              author: "User D",
              level: 2,
              replies: [],
            },
          ],
        },
        {
          id: 9,
          text: "This is a reply A",
          author: "User Baor",
          level: 1,
          replies: [],
        },
      ],
    },
    {
      id: 5,
      text: "This is a Comment E",
      author: "User E",
      level: 0,
      replies: [
        {
          id: 6,
          text: "This is a reply F",
          author: "User F",
          replies: [],
          level: 1,
        },
      ],
    },
    {
      id: 7,
      text: "This is a Comment G",
      author: "User G",
      level: 0,
      replies: [
        {
          id: 8,
          text: "This is a reply H",
          author: "User H",
          level: 1,
          replies: [],
        },
      ],
    },
  ];
  return (
    <div className={cx("wrapper", fixedComment == true ? "fixed" : "")}>
      <div className={cx("title_post")}>
        <div className={cx("infor")}>
          <div className={cx("image_user")}>
            <img src="https://scontent.fdad7-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=HNv6-cLkGacQ7kNvgF5x4vA&_nc_ht=scontent.fdad7-1.fna&oh=00_AYBjUBmqFkC_hrGGPN-yYa5G9uzKjPYdw4U1y6AaIdnCug&oe=66CD7878" />
          </div>
          <div className={cx("name_time")}>
            <p className={cx("name")}>Phạm Văn Bảo</p>
            <span className={cx("time_public")}>52 phút trước</span>
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
              <li>
                <FontAwesomeIcon icon={faPen} />
                <span>Chỉnh sửa bài viết</span>
              </li>
              <li>
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
        <div className={cx("text")}>
          {countText(contentPost, limitText) + "..."}
          <span className={cx("see_more")} onClick={handleText}>
            {" "}
            {limitText == 100 ? "Xem thêm" : "Thu gọn"}
          </span>
        </div>
        <div className={cx("upload")}>
          <img src="https://scontent.fdad7-1.fna.fbcdn.net/v/t39.30808-6/452854323_427134190323959_2859490003351315659_n.jpg?stp=dst-jpg_s960x960&_nc_cat=109&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=C0lg3xPKIAcQ7kNvgHJziNE&_nc_ht=scontent.fdad7-1.fna&oh=00_AYArfk92MGO9xRIwlUQMlt0fx9qG9hawXJ3ZXTAoU0O6vA&oe=66ABE77B"></img>
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
              handleComment(null);
            }}
          >
            <FontAwesomeIcon icon={faComment} />
            <span>Bình luận</span>
          </div>
        </div>
        <div className={cx("container_comment")}>
          <Comments comments={comments} />
        </div>
        <div
          className={cx(
            "container_comment_input",
            fixedComment == true ? "fixed" : ""
          )}
        >
          <CommentInput fixedComment={fixedComment} />
        </div>
      </div>
    </div>
  );
}

export default PostItem;
