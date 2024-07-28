import classnames from "classnames/bind";
import styles from "./LayoutEmpty.module.scss";
const cx = classnames.bind(styles);
function LayoutEmpty({ children }) {
  return <div className={cx("wrapper")}>{children}</div>;
}

export default LayoutEmpty;
