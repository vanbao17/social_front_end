import classnames from "classnames/bind";
import styles from "./SideBar.module.scss";
import { useContext } from "react";
import { Context } from "../../../contexts/Context";
import { getUserInfoFromToken } from "../../../utils/tokenUtils";
import { formatDate } from "../../../utils/dateUtils";
import images from "../../../assets/images";
const cx = classnames.bind(styles);
function SideBar() {
  const { menufix } = useContext(Context);
  const user = getUserInfoFromToken();
  return (
    <div className={cx("wrapper")}>
      <div className={cx("image_user")}>
        <div className={cx("image_banner")}>
          <img
            src={
              user.Image_banner == null
                ? images.default_banner
                : user.Image_banner
            }
          ></img>
        </div>
        <div className={cx("image_profile")}>
          <img
            src={
              user.Image_user == null ? images.default_image : user.Image_user
            }
          ></img>
        </div>
      </div>
      <div className={cx("infor_user")}>
        <div className={cx("name")}>
          <p>Tên: </p>
          <span>{user.Name}</span>
        </div>
        <div className={cx("masv")}>
          <p>Mã sinh viên: </p>
          <span>{user.MSV}</span>
        </div>
        <div className={cx("ngaysinh")}>
          <p>Ngày sinh: </p>
          <span>{formatDate(user.Dob)}</span>
        </div>
        <div className={cx("lopsh")}>
          <p>Lớp sinh hoạt: </p>
          <span>{user.LSH}</span>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
