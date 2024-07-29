import classnames from "classnames/bind";
import styles from "./CommentInput.module.scss";
import { faPaperclip, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const cx = classnames.bind(styles);
function CommentInput({ fixedComment }) {
  const [stateInputCommment, setStateInputCommment] = useState(false);
  const inputFileRef = useRef();
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
                placeholder="Bạn đang nghĩ gì ?"
                type="text"
              ></input>
              <div className={cx("icon_send_comment")}>
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
