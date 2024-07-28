import classnames from "classnames/bind";
import styles from "./SideBar.module.scss";
import { useContext } from "react";
import { Context } from "../../../contexts/Context";
const cx = classnames.bind(styles);
function SideBar() {
  const { menufix } = useContext(Context);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("image_user")}>
        <div className={cx("image_banner")}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfJ8PF2KNdZi2TxASyVX8vpYf4rk9iCo3NFg&s"></img>
        </div>
        <div className={cx("image_profile")}>
          <img src="https://scontent.fdad8-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=HNv6-cLkGacQ7kNvgFdcUtx&_nc_ht=scontent.fdad8-1.fna&oh=00_AYBkhIWqpFu3pdCGdQR07OEQyfOcxaYXMpqj1QWA5qOCCw&oe=66CC9778"></img>
        </div>
      </div>
      <div className={cx("infor_user")}>
        <div className={cx("name")}>
          <p>Tên: </p>
          <span>Phạm Văn Bỏa</span>
        </div>
        <div className={cx("masv")}>
          <p>Mã sinh viên: </p>
          <span>21115053120305</span>
        </div>
        <div className={cx("ngaysinh")}>
          <p>Ngày sinh: </p>
          <span>17/11/2003</span>
        </div>
        <div className={cx("lopsh")}>
          <p>Lớp sinh hoạt: </p>
          <span>21T3</span>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
