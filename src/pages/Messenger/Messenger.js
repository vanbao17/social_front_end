import classnames from "classnames/bind";
import styles from "./Messenger.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClose,
  faPaperclip,
  faPaperPlane,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import FriendItem from "../../components/FriendItem/FriendItem";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import { getDataParams, getParams } from "../../utils/urlUtils";
import io from "socket.io-client";
import { getConvens, getMesseages } from "../../services/MessServices";
import { getUserInfoFromToken } from "../../utils/tokenUtils";
import images from "../../assets/images";

const cx = classnames.bind(styles);
function Messenger() {
  const [stateSideBarList, setStateSideBarList] = useState(false);
  const [activeMess, setActiveMess] = useState(null);
  const isModile = useMediaQuery({ maxWidth: 670 });
  const refInputFile = useRef();
  const inputRefContent = useRef();
  const location = useLocation();
  const [socket, setSocket] = useState(
    io("https://pycheck.xyz", {
      transports: ["websocket"],
      upgrade: true,
    })
  );
  const user = getUserInfoFromToken();
  const [messages, setMessages] = useState([]);
  const [listConven, setListConven] = useState([]);
  const mess = getParams(location, "mess");

  useEffect(() => {
    const fetchConven = async () => {
      const responConven = await getConvens(user.IDAccount);
      if (mess != null) {
        const filter = responConven.data.filter(
          (a) => a.friend_id == parseInt(mess)
        );
        setActiveMess(...filter);
      }
      setListConven(responConven.data);
    };
    fetchConven();
  }, [mess]);
  const submit = () => {
    const IDConversations = activeMess.IDConversations;
    const Sender_id = user.IDAccount;
    const Content = inputRefContent.current.value;
    const content_type = "text";
    const Timestamp = new Date();
    socket.emit("createMessChat", {
      IDConversations,
      Sender_id,
      Content,
      content_type,
      Timestamp,
    });
    inputRefContent.current.value = "";
  };
  const handleSendMess = (e) => {
    if (e.key == "Enter") {
      submit();
    }
  };
  useEffect(() => {
    if (activeMess != 0 && activeMess != null) {
      socket.emit("joinMess", parseInt(activeMess.IDConversations));
      const fetchMess = async () => {
        const responseMessages = await getMesseages(activeMess.IDConversations);
        setMessages(responseMessages.data);
      };
      fetchMess();
    }
  }, [activeMess]);
  useEffect(() => {
    socket.on("responseMessChat", (message) => {
      setMessages((pre) => [...pre, message]);
    });
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div
        className={cx(
          "list_convensation",
          stateSideBarList == true ? "fixed" : ""
        )}
      >
        <div className={cx("action_title")}>
          <h3>Đoạn chat</h3>
          {isModile == true ? (
            <FontAwesomeIcon
              icon={faClose}
              className={cx("icon")}
              onClick={() => {
                setStateSideBarList(!stateSideBarList);
              }}
            />
          ) : (
            <></>
          )}
        </div>
        <div className={cx("search_chat")}>
          <div className={cx("container_search")}>
            <FontAwesomeIcon icon={faSearch} />
            <input type="text"></input>
          </div>
        </div>
        <div className={cx("list")}>
          {listConven.map((conven) => {
            return (
              <FriendItem
                onClick={(messeage) => {
                  setActiveMess(messeage);
                }}
                active={
                  activeMess != null
                    ? activeMess.friend_id == conven.friend_id
                      ? true
                      : false
                    : ""
                }
                messeage={conven}
              ></FriendItem>
            );
          })}
        </div>
      </div>

      <div className={cx("container_chat")}>
        <div className={cx("title_chat")}>
          {isModile == true ? (
            <div
              className={cx("icon_bar")}
              onClick={() => {
                setStateSideBarList(!stateSideBarList);
              }}
            >
              <FontAwesomeIcon icon={faBars} />
            </div>
          ) : (
            <></>
          )}
          {activeMess != null ? (
            <>
              <img
                src={
                  activeMess.image_user == null
                    ? images.default_image
                    : activeMess.image_user
                }
              ></img>
              <span className={cx("name")}>{activeMess.Name}</span>
            </>
          ) : (
            <></>
          )}
        </div>
        {activeMess == null ? (
          <div className={cx("chat_none")}>
            <span>
              Chưa có đoạn chat hãy lựa chọn đoạn chat hoặc nhắn tin với bạn bè
            </span>
          </div>
        ) : (
          <></>
        )}
        {activeMess != null ? (
          <div className={cx("content_chat")}>
            {messages.map((message) => {
              return (
                <div
                  className={cx(
                    "container_mess_item",
                    message.Sender_id == user.IDAccount ? "sender" : "receiver"
                  )}
                >
                  <div className={cx("mess_item")}>
                    <span> {message.Content}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        {activeMess != null ? (
          <div className={cx("input_chat")}>
            <div className={cx("container_input")}>
              <div
                className={cx("icon_upload", "icon")}
                onClick={() => {
                  refInputFile.current.click();
                }}
              >
                <FontAwesomeIcon icon={faPaperclip} />
              </div>

              <input
                onKeyDown={handleSendMess}
                ref={inputRefContent}
                placeholder="Aa"
                type="text"
              ></input>
              <input hidden ref={refInputFile} type="file"></input>
              <div className={cx("icon_upload", "icon")}>
                <FontAwesomeIcon icon={faPaperPlane} onClick={submit} />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={cx("infor_receiver")}>
        {activeMess != null ? (
          <div className={cx("infor")}>
            <img
              src={
                activeMess.image_user != null
                  ? activeMess.image_user
                  : images.default_image
              }
            ></img>
            <span className={cx("name")}>{activeMess.Name}</span>
            <div className={cx("actions")}>
              <div
                className={cx("item_action")}
                onClick={() => {
                  window.location.href = `/personal?sinhvien=${activeMess.MSV}`;
                }}
              >
                <div className={cx("icon")}>
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <span> Trang cá nhân</span>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Messenger;
