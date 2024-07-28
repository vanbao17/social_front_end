import classnames from "classnames/bind";
import styles from "./HomePage.module.scss";
import SideBar from "../../components/layouts/SideBar/SideBar";
const cx = classnames.bind(styles);
function HomePage() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("container_sideBar")}>
          <SideBar />
        </div>
        <div className={cx("home_page")}>HomePage</div>
      </div>
    </div>
  );
}

export default HomePage;
