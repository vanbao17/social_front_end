import classnames from "classnames/bind";
import styles from "./HomePage.module.scss";
import SideBar from "../../components/layouts/SideBar/SideBar";
import PostItem from "../../components/PostItem/PostItem";
import CreatePost from "../../components/CreatePost/CreatePost";
import { useState } from "react";
import DetailPost from "../../components/DetailPost/DetailPost";
const cx = classnames.bind(styles);
function HomePage() {
  const [statePopup, setStatePopup] = useState(false);
  const [stateDetailPost, setStateDetailPost] = useState(false);
  const handleStatePopup = (state) => {
    if (state == null) {
      setStatePopup(true);
    } else {
      setStatePopup(false);
    }
  };
  const handleStateDetailPost = (state) => {
    if (state == null) {
      setStateDetailPost(true);
    } else {
      setStateDetailPost(false);
    }
  };
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
              <div
                className={cx("container_input")}
                onClick={() => {
                  handleStatePopup(null);
                }}
              >
                <p>Bạn đang cảm thấy như thế nào ?</p>
              </div>
            </div>
          </div>
          <div className={cx("list_post")}>
            <PostItem
              handleComment={(s) => {
                handleStateDetailPost(s);
              }}
              fixedComment={null}
            />
            <PostItem
              handleComment={(s) => {
                handleStateDetailPost(s);
              }}
              fixedComment={null}
            />
            <PostItem
              handleComment={(s) => {
                handleStateDetailPost(s);
              }}
              fixedComment={null}
            />
            <PostItem
              handleComment={(s) => {
                handleStateDetailPost(s);
              }}
              fixedComment={null}
            />
          </div>
        </div>
      </div>
      {statePopup == true ? (
        <CreatePost
          handleClose={(s) => {
            handleStatePopup(s);
          }}
        />
      ) : (
        <></>
      )}
      {stateDetailPost == true ? (
        <DetailPost
          handleClose={(s) => {
            handleStateDetailPost(s);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default HomePage;
