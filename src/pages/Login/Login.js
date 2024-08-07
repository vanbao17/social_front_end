import { jwtDecode } from "jwt-decode";
import classnames from "classnames/bind";
import styles from "./Login.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useContext, useRef, useState } from "react";
import { UserLogin } from "../../services/UserServices";
import { getUserInfoFromToken } from "../../utils/tokenUtils";
import { Context } from "../../contexts/Context";
const cx = classnames.bind(styles);
function Login() {
  const [statePassword, setStatePassword] = useState(false);
  const { loadding, setLoadding } = useContext(Context);
  const refMSV = useRef();
  const refPassword = useRef();
  const handleLogin = async () => {
    setLoadding(true);
    const masv = refMSV.current.value;
    const pasword = refPassword.current.value;
    const response = await UserLogin(masv, pasword);
    await localStorage.setItem("token", response.data.token);
    setLoadding(false);
    if (response) {
      window.location = "/";
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("logo")}>DCMM</div>
        <div className={cx("form_login")}>
          <h2>Đăng nhập</h2>
          <div className={cx("container_input")}>
            <label>Nhập mã sinh viên</label>
            <input ref={refMSV} type="text"></input>
          </div>
          <div className={cx("container_input")}>
            <label>Nhập mật khâủ</label>
            <div className={cx("password")}>
              <input
                ref={refPassword}
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
          <button onClick={handleLogin}>
            <span>Đăng nhập</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
