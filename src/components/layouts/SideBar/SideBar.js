import classnames from "classnames/bind";
import styles from "./SideBar.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../../contexts/Context";
import { getUserInfoFromToken } from "../../../utils/tokenUtils";
import { formatDate } from "../../../utils/dateUtils";
import images from "../../../assets/images";
import Popup from "../../Popup/Popup";
import {
  getInforUser,
  updateBanner,
  updateImageProfile,
} from "../../../services/UserServices";
import { UploadFolder } from "../../../services/FileServices";
const cx = classnames.bind(styles);
function SideBar({ handleChangePass = null, user = null }) {
  const refInputFile = useRef();
  const [previewImage, setImagePreview] = useState(images.default_banner);
  const [stateUpload, setStateUpload] = useState(null);
  const [imgs, setImgs] = useState([]);
  const userMain = getUserInfoFromToken();

  useEffect(() => {
    if (user != undefined) {
      const fetchImage = async () => {
        const responseImage = await getInforUser(user.MSV);
        setImgs(responseImage.data[0]);
      };
      fetchImage();
    }
  }, [user]);
  const handleChangeFile = async (event) => {
    const fileSelected = event.target.files[0];
    const path = "http://localhost:3001/uploads/" + fileSelected.name;
    const formData = new FormData();
    formData.append("file", fileSelected);
    setImagePreview([URL.createObjectURL(fileSelected)]);
    await UploadFolder(formData);
    if (stateUpload == "banner") {
      setImgs((pre) => ({
        ...pre,
        image_banner: URL.createObjectURL(fileSelected),
      }));
      await updateBanner(user.MSV, path);
    }
    if (stateUpload == "user") {
      setImgs((pre) => ({
        ...pre,
        image_user: URL.createObjectURL(fileSelected),
      }));
      await updateImageProfile(user.MSV, path);
    }
  };

  useEffect(() => {
    if (stateUpload != null && user.ID == userMain.IDAccount) {
      refInputFile.current.click();
    }
  }, [stateUpload]);

  return (
    <div className={cx("wrapper")}>
      <input
        ref={refInputFile}
        hidden
        type="file"
        onChange={handleChangeFile}
        accept="image/*"
      />
      <div className={cx("image_user")}>
        <div
          className={cx("image_banner")}
          onClick={() => {
            setStateUpload("banner");
          }}
        >
          {imgs != undefined ? (
            <img
              src={
                imgs.image_banner == null
                  ? images.default_banner
                  : imgs.image_banner
              }
            ></img>
          ) : (
            <></>
          )}
        </div>
        <div
          className={cx("image_profile")}
          onClick={() => {
            setStateUpload("user");
          }}
        >
          {imgs != undefined ? (
            <img
              style={{ objectFit: "cover" }}
              src={
                imgs.image_user == null ? images.default_image : imgs.image_user
              }
            ></img>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={cx("infor_user")}>
        <div className={cx("name")}>
          <p>Tên: </p>
          <span>{imgs != undefined ? imgs.Name : ""}</span>
        </div>
        <div className={cx("masv")}>
          <p>Mã sinh viên: </p>
          <span>{imgs != undefined ? imgs.MSV : ""}</span>
        </div>
        <div className={cx("ngaysinh")}>
          <p>Ngày sinh: </p>
          <span>{imgs != undefined ? formatDate(imgs.Dob) : ""}</span>
        </div>
        <div className={cx("lopsh")}>
          <p>Lớp sinh hoạt: </p>
          <span>{imgs != undefined ? imgs.LSH : ""}</span>
        </div>
        {handleChangePass != null && userMain.IDAccount == user.ID ? (
          <span
            onClick={() => {
              handleChangePass(true);
            }}
            className={cx("change_password")}
          >
            Đổi mật khẩu
          </span>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
