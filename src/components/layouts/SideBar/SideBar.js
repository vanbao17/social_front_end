import classnames from "classnames/bind";
import styles from "./SideBar.module.scss";
const cx = classnames.bind(styles);
function SideBar() {
  return <div className={cx("wrapper")}>SideBar</div>;
}

export default SideBar;
