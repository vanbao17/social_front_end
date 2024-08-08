import classnames from "classnames/bind";
import styles from "./DetailPost.module.scss";
import PostItem from "../../components/PostItem/PostItem";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getParams } from "../../utils/urlUtils";
import { getPostWithId } from "../../services/PostServices";
const cx = classnames.bind(styles);
function DetailPost() {
  const [data, setData] = useState();
  const location = useLocation();
  const IDPost = parseInt(getParams(location, "id"));
  useEffect(() => {
    const fetchPost = async () => {
      const responsePost = await getPostWithId(IDPost);
      setData(responsePost.data[0]);
    };
    fetchPost();
  }, [IDPost]);

  return (
    <div className={cx("wrapper")}>
      {data != undefined ? (
        <>
          <div className={cx("container_content")}>
            <PostItem fixedComment={true} dataPostItem={data} />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default DetailPost;
