import classnames from "classnames/bind";
import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { searchUser } from "../../services/UserServices";
import images from "../../assets/images";
const cx = classnames.bind(styles);
function Search() {
  const [results, setResults] = useState([]);
  const handleSearch = async (data) => {
    const responseSearch = await searchUser(data);
    setResults(responseSearch.data);
  };
  const handleGotoProfile = (user) => {
    window.location.href = `/personal?sinhvien=${user.MSV}`;
  };
  return (
    <div className={cx("wrapper")}>
      <h2>Tìm kiếm</h2>
      <div className={cx("container_input")}>
        <FontAwesomeIcon icon={faSearch} />
        <input
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          type="text"
          placeholder="Nhập mã sinh viên để tìm kiếm"
        ></input>
      </div>
      <div className={cx("list_result")}>
        {results.map((user) => {
          return (
            <div
              className={cx("item")}
              onClick={() => {
                handleGotoProfile(user);
              }}
            >
              <div className={cx("img_user")}>
                <img
                  src={
                    user.image_user == null
                      ? images.default_image
                      : user.image_user
                  }
                ></img>
              </div>
              <div className={cx("name")}>
                <strong>{user.Name}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
