import classnames from "classnames/bind";
import styles from "./Popup.module.scss";
const cx = classnames.bind(styles);
function Popup() {
  return <div className={cx("wrapper")}></div>;
}

export default Popup;
