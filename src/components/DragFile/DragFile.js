import classnames from "classnames/bind";
import styles from "./DragFile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
const cx = classnames.bind(styles);
function DragFile({ handleClose }) {
  const refInputFile = useRef();
  const handleInputFile = () => {
    refInputFile.current.click();
  };
  return (
    <div className={cx("wrapper")}>
      <input ref={refInputFile} type="file" hidden></input>
      <div className={cx("container")}>
        <div className={cx("train")} onClick={handleInputFile}>
          <h3>Thêm ảnh / video / file</h3>
          <p>hoặc kéo thả</p>
        </div>
        <div
          className={cx("close")}
          onClick={() => {
            handleClose(false);
          }}
        >
          <FontAwesomeIcon icon={faClose} className={cx("icon_close")} />
        </div>
      </div>
    </div>
  );
}

export default DragFile;
