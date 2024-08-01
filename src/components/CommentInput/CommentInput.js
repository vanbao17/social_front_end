import classnames from "classnames/bind";
import styles from "./CommentInput.module.scss";
import { faPaperclip, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserInfoFromToken } from "../../utils/tokenUtils";
import {
  addCommentPost,
  updateCommentPost,
} from "../../services/CommentServices";
const cx = classnames.bind(styles);
function CommentInput({ fixedComment, idPost, idReply, update = null }) {
  const [stateInputCommment, setStateInputCommment] = useState(false);
  const [stateUpdate, setStateUpdate] = useState();
  const inputFileRef = useRef();
  const inputContentRef = useRef();
  const user = getUserInfoFromToken();

  useEffect(() => {
    if (update != null) {
      setStateUpdate(update.content);
    }
  }, [update]);
  const handleSubmit = async () => {
    if (update != null) {
      const responseUpdateComment = await updateCommentPost(
        update.id,
        stateUpdate
      );
      if (responseUpdateComment.status == 200) {
        setStateUpdate("");
      }
    } else {
      const responseAddComment = await addCommentPost(
        idPost,
        user.IDAccount,
        inputContentRef.current.value,
        idReply
      );
      if (responseAddComment == 200) {
        inputContentRef.current.value = "";
      }
    }
  };
  return (
    <div className={cx("comment", fixedComment == true ? "fixed" : "")}>
      <div className={cx("container_input_post")}>
        <div>
          <div className={cx("image_user")}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfJ8PF2KNdZi2TxASyVX8vpYf4rk9iCo3NFg&s"></img>
          </div>
          <div className={cx("container_input")}>
            <div>
              <input
                onFocus={() => {
                  setStateInputCommment(true);
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    handleSubmit();
                  }
                }}
                value={stateUpdate}
                onChange={(e) => {
                  setStateUpdate(e.target.value);
                }}
                ref={inputContentRef}
                placeholder="Bạn đang nghĩ gì ?"
                type="text"
              ></input>
              <div className={cx("icon_send_comment")} onClick={handleSubmit}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </div>
            </div>
            {stateInputCommment == true ? (
              <div className={cx("action_comment")}>
                <input ref={inputFileRef} type="file" hidden />
                <FontAwesomeIcon
                  icon={faPaperclip}
                  onClick={() => {
                    inputFileRef.current.click();
                  }}
                  className={cx("icon_action")}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentInput;
