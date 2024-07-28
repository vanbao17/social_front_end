import classnames from "classnames/bind";
import styles from "./Login.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const cx = classnames.bind(styles);
function Login() {
  const [statePassword, setStatePassword] = useState(false);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("logo")}>DCMM</div>
        <div className={cx("form_login")}>
          <h2>Đăng nhập</h2>
          <div className={cx("container_input")}>
            <label>Nhập mã sinh viên</label>
            <input type="text"></input>
          </div>
          <div className={cx("container_input")}>
            <label>Nhập mật khâủ</label>
            <div className={cx("password")}>
              <input
                type={statePassword == false ? "password" : "text"}
              ></input>
              <FontAwesomeIcon
                icon={statePassword == false ? faEye : faEyeSlash}
                onClick={() => {
                  setStatePassword(!statePassword);
                }}
                className={cx("icon_pasword")}
              />
            </div>
          </div>
          <div className={cx("add_localstorage")}>
            <input type="checkbox"></input>
            <span>Lưu mật khẩu ?</span>
          </div>
          <button>
            <span>Đăng nhập</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
