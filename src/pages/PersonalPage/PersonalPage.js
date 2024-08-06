import classnames from "classnames/bind";
import styles from "./PersonalPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../../components/layouts/SideBar/SideBar";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PostItem from "../../components/PostItem/PostItem";
import CreatePost from "../../components/CreatePost/CreatePost";
import DetailPost from "../../components/DetailPost/DetailPost";
import ContainerPersonal from "../../components/layouts/ContainerPersonal/ContainerPersonal";
import { getUserInfoFromToken } from "../../utils/tokenUtils";
import { getPostsIdPersonal } from "../../services/PostServices";
import { getParams } from "../../utils/urlUtils";
import { getInforUser } from "../../services/UserServices";
import images from "../../assets/images";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
const cx = classnames.bind(styles);
function PersonalPage() {
  const [statePopup, setStatePopup] = useState(false);
  const [stateDetailPost, setStateDetailPost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [stateChangePass, setStateChangePass] = useState(false);

  const location = useLocation();
  const userMain = getUserInfoFromToken();

  useEffect(() => {
    const msv = getParams(location, "sinhvien");
    const fetchUser = async () => {
      const responseImage = await getInforUser(msv);
      setUser(responseImage.data[0]);
    };

    fetchUser();
  }, []);
  useEffect(() => {
    if (user != undefined) {
      const fetchPost = async () => {
        const responsePost = await getPostsIdPersonal(user.ID);
        setPosts(responsePost.data);
      };
      fetchPost();
    }
  }, [user]);

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
  const handleChangePass = (state) => {
    if (state != null) {
      setStateChangePass(state);
    } else {
      setStateChangePass(null);
    }
  };
  return (
    <ContainerPersonal user={user}>
      <div className={cx("wrapper")}>
        <div className={cx("sidebar_posts")}>
          <div className={cx("container_sidebar")}>
            <SideBar user={user} handleChangePass={handleChangePass} />
          </div>
          <div className={cx("posts")}>
            {userMain.IDAccount == user.ID ? (
              <>
                <div className={cx("container_input_post")}>
                  <h3>Đăng bài </h3>
                  <div>
                    <div className={cx("image_user")}>
                      {user != undefined ? (
                        <img
                          src={
                            user.image_user == null
                              ? images.default_image
                              : user.image_user
                          }
                        ></img>
                      ) : (
                        <></>
                      )}
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
              </>
            ) : (
              <></>
            )}

            <div className={cx("list_post")}>
              <div className={cx("list_post")}>
                {posts.length != 0 ? (
                  posts.map((post, index) => {
                    return (
                      <PostItem
                        key={index}
                        handleComment={(s) => {
                          handleStateDetailPost(s);
                        }}
                        fixedComment={null}
                        dataPostItem={post}
                      />
                    );
                  })
                ) : (
                  <div className={cx("default_post")}>
                    Vẫn chưa có post nào hãy đăng post nào
                  </div>
                )}
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
      {stateChangePass == true ? (
        <ChangePassword
          handleClose={(a) => {
            console.log(a);
            setStateChangePass(a);
          }}
        />
      ) : (
        <></>
      )}
    </ContainerPersonal>
  );
}

export default PersonalPage;
