import classnames from "classnames/bind";
import styles from "./ChangePassword.module.scss";
import Popup from "../Popup/Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { changePass } from "../../services/UserServices";
import { getUserInfoFromToken } from "../../utils/tokenUtils";
const cx = classnames.bind(styles);
function ChangePassword({ handleClose }) {
  const inputRefPassOld = useRef();
  const inputRefPassNew = useRef();
  const inputRefPassConfirm = useRef();
  const [noti, setNoti] = useState(null);

  const user = getUserInfoFromToken();

  const handleSubmit = async () => {
    if (inputRefPassNew.current.value !== inputRefPassConfirm.current.value) {
      setNoti("Mật khẩu mới không trùng khớp ");
    } else {
      const responseChange = await changePass(
        user.MSV,
        inputRefPassOld.current.value,
        inputRefPassNew.current.value
      );
      if (responseChange.status == 200) {
        handleClose(false);
      }
      if (responseChange.status == 201) {
        setNoti("Mật khẩu cũ không đúng ");
      }
    }
  };
  return (
    <Popup width="fit-content" height="fit-content">
      <div className={cx("container_change")}>
        <span className={cx("title")}>
          <h2>Đổi mật khẩu</h2>
          <div>
            <FontAwesomeIcon
              onClick={() => {
                handleClose(false);
              }}
              icon={faClose}
              className={cx("icon")}
            />
          </div>
        </span>
        <div className={cx("container_input")}>
          <label>Nhập mật khẩu cũ</label>
          <input ref={inputRefPassOld} type="password"></input>
        </div>
        <div className={cx("container_input")}>
          <label>Nhập mật khẩu mới</label>
          <input ref={inputRefPassNew} type="password"></input>
        </div>
        <div className={cx("container_input")}>
          <label>Xác nhận mật khẩu mới</label>
          <input ref={inputRefPassConfirm} type="password"></input>
        </div>
        {noti != null ? <span className={cx("warning")}>{noti}</span> : <></>}
        <button onClick={handleSubmit}>
          <span>Đổi mật khẩu</span>
        </button>
      </div>
    </Popup>
  );
}

export default ChangePassword;
