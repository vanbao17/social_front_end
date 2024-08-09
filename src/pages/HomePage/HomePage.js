import classnames from "classnames/bind";
import styles from "./HomePage.module.scss";
import SideBar from "../../components/layouts/SideBar/SideBar";
import PostItem from "../../components/PostItem/PostItem";
import CreatePost from "../../components/CreatePost/CreatePost";
import { useEffect, useState } from "react";
import DetailPost from "../../components/DetailPost/DetailPost";
import axios from "axios";
import { getPosts } from "../../services/PostServices";
import Popup from "../../components/Popup/Popup";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import { getUserInfoFromToken } from "../../utils/tokenUtils";
import { getInforUser } from "../../services/UserServices";
import images from "../../assets/images";
const cx = classnames.bind(styles);
function HomePage() {
  const [statePopup, setStatePopup] = useState(false);
  const [stateDetailPost, setStateDetailPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [inforUser, setInforUser] = useState(null);

  const user = getUserInfoFromToken();

  const handleStatePopup = (state) => {
    if (state == null) {
      setStatePopup(true);
    } else {
      setStatePopup(false);
    }
  };
  const handleStateDetailPost = (state) => {
    if (state != null) {
      setStateDetailPost(state);
    } else {
      setStateDetailPost(null);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const responsePosts = await getPosts();
      const sortedPosts = [...responsePosts.data].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setPosts(sortedPosts);
    };
    const fetchInforUser = async () => {
      const responseUser = await getInforUser(user.MSV);
      setInforUser(responseUser.data[0]);
    };
    fetchInforUser();
    fetchPosts();
  }, []);
  const handleUpdatePost = (data) => {
    setDataUpdate(data);
    setStatePopup(true);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("container_sideBar")}>
          <SideBar user={user} />
        </div>
        <div className={cx("home_page")}>
          <div className={cx("container_input_post")}>
            <h3>Đăng bài </h3>
            <div>
              <div className={cx("image_user")}>
                <img
                  src={
                    inforUser != null
                      ? inforUser.image_user == null
                        ? images.default_image
                        : inforUser.image_user
                      : ""
                  }
                ></img>
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
            {posts.map((post) => {
              return (
                <PostItem
                  dataPostItem={post}
                  handleComment={(s) => {
                    handleStateDetailPost(s);
                  }}
                  fixedComment={null}
                  updatePost={handleUpdatePost}
                />
              );
            })}
          </div>
        </div>
      </div>
      {statePopup == true ? (
        <CreatePost
          handleClose={(s) => {
            handleStatePopup(s);
            setDataUpdate(null);
          }}
          dataUpdate={dataUpdate}
        />
      ) : (
        <></>
      )}
      {stateDetailPost != null ? (
        <DetailPost
          handleClose={(s) => {
            handleStateDetailPost(s);
          }}
          data={stateDetailPost}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default HomePage;
