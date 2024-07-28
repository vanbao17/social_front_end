import classnames from "classnames/bind";
import styles from "./HomePage.module.scss";
import SideBar from "../../components/layouts/SideBar/SideBar";
import PostItem from "../../components/PostItem/PostItem";
const cx = classnames.bind(styles);
function HomePage() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("container_sideBar")}>
          <SideBar />
        </div>
        <div className={cx("home_page")}>
          <div className={cx("container_input_post")}>
            <h3>Đăng bài </h3>
            <div>
              <div className={cx("image_user")}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfJ8PF2KNdZi2TxASyVX8vpYf4rk9iCo3NFg&s"></img>
              </div>
              <div className={cx("container_input")}>
                <p>Bạn đang cảm thấy như thế nào ?</p>
              </div>
            </div>
          </div>
          <div className={cx("list_post")}>
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
