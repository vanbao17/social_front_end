import classnames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const cx = classnames.bind(styles);
function DefaultLayout({ children }) {
  const checkLogin = localStorage.getItem("token");
  const nav = useNavigate();
  useEffect(() => {
    if (checkLogin == null) {
      nav("/login");
    }
  }, []);

  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("content")}>{children} </div>
    </div>
  );
}

export default DefaultLayout;
