import classnames from "classnames/bind";
import styles from "./TextAreaInput.module.scss";
import { useRef, useState } from "react";
import styled from "styled-components";
const cx = classnames.bind(styles);
function TextAreaInput({ handleDataText }) {
  const [fontSize, setFontSize] = useState(18);
  const [content, setContent] = useState("");
  const textAreaRef = useRef(null);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setContent(text);
    handleDataText(text);
    if (text.length > 250) {
      setFontSize(14);
    } else if (text.length > 180) {
      setFontSize(16);
    } else {
      setFontSize(18);
    }
  };
  return (
    <div className={cx("textAreaContainer")}>
      <textarea
        ref={textAreaRef}
        value={content}
        onChange={handleInputChange}
        style={{ fontSize: `${fontSize}px` }}
        placeholder="Bạn đang nghĩ gì ?"
        className={cx("textArea")}
      />
    </div>
  );
}

export default TextAreaInput;
