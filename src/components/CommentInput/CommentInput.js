import classnames from "classnames/bind";
import styles from "./CommentInput.module.scss";
import { faPaperclip, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserInfoFromToken } from "../../utils/tokenUtils";
import {
  addCommentPost,
  updateCommentPost,
} from "../../services/CommentServices";
import { getInforUser } from "../../services/UserServices";
import images from "../../assets/images";

const cx = classnames.bind(styles);
function CommentInput({
  fixedComment,
  idPost,
  idReply,
  update = null,
  sendData,
}) {
  const [stateInputCommment, setStateInputCommment] = useState(false);
  const [stateUpdate, setStateUpdate] = useState();
  const inputFileRef = useRef();
  const inputContentRef = useRef();
  const user = getUserInfoFromToken();
  const [inforUser, setInforUser] = useState(null);

  useEffect(() => {
    const fetchInforUser = async () => {
      const responseUser = await getInforUser(user.MSV);
      setInforUser(responseUser.data[0]);
    };
    fetchInforUser();
  }, []);
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
      if (inforUser != null) {
        const ID = idPost;
        const IDAccount = user.IDAccount;
        const Name = user.Name;
        const content = inputContentRef.current.value;
        const id_reply = idReply;
        const image_user = inforUser.image_user;
        sendData({
          ID,
          IDAccount,
          Name,
          content,
          id_reply,
          image_user,
        });
        inputContentRef.current.value = "";
      }
    }
  };

  return (
    <div className={cx("comment", fixedComment == true ? "fixed" : "")}>
      <div className={cx("container_input_post")}>
        <div>
          <div className={cx("image_user")}>
            {inforUser != null ? (
              <img
                src={
                  inforUser.image_user != null
                    ? inforUser.image_user
                    : images.default_image
                }
              ></img>
            ) : (
              <></>
            )}
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
