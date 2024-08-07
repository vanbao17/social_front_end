import classnames from "classnames/bind";
import styles from "./Loadding.module.scss";
import images from "../../../assets/images";
const cx = classnames.bind(styles);
function Loadding() {
  return (
    <div className={cx("wrapper_popup")}>
      <div className={cx("container_popup")}>
        <img src={images.loadding}></img>
      </div>
      <div className={cx("black")}></div>
    </div>
  );
}

export default Loadding;
