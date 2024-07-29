import classnames from "classnames/bind";
import styles from "./PersonalPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../../components/layouts/SideBar/SideBar";
import { useState } from "react";
import PostItem from "../../components/PostItem/PostItem";
import CreatePost from "../../components/CreatePost/CreatePost";
import DetailPost from "../../components/DetailPost/DetailPost";
import ContainerPersonal from "../../components/layouts/ContainerPersonal/ContainerPersonal";
const cx = classnames.bind(styles);
function PersonalPage() {
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
    <ContainerPersonal>
      <div className={cx("wrapper")}>
        <div className={cx("sidebar_posts")}>
          <div className={cx("container_sidebar")}>
            <SideBar />
          </div>
          <div className={cx("posts")}>
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
            <div className={cx("manager_post")}>
              <h3>Bài viết</h3>
              <div className={cx("manager_button")}>
                <FontAwesomeIcon icon={faGear} />
                <span>Quản lý bài viết</span>
              </div>
            </div>
            <div className={cx("list_post")}>
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
    </ContainerPersonal>
  );
}

export default PersonalPage;
