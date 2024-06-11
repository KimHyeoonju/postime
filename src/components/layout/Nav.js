import styled from "@emotion/styled";
import { BsTrash3 } from "react-icons/bs";
import { IoIosCheckboxOutline } from "react-icons/io";
import { MdCalendarToday, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { PiGearSixLight } from "react-icons/pi";
import { VscBell } from "react-icons/vsc";
import "../../css/nav.css";

const NavStyle = styled.div`
  @media (prefers-color-scheme: light) {
    /* :root {
      accent-color: blue;
    } */

    position: relative;

    z-index: 1200;
    flex-shrink: 0;
    height: 100%;
    min-width: 300px;
    max-width: 300px;
    width: 300px;
    border-right: 1px solid #dddfe1;
    background-color: #ffffff;
    margin-left: 0;

    svg {
      font-size: 20px;
    }
  }
`;

import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AlarmModal from "../modal/AlarmModal";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false); // 메뉴가 열려있는지 여부를 상태로 관리
  // const [alarmModalIsOpen, setAlarmModalIsOpen] = useState(false); // 알림 모달 열렸는지 닫혔는지
  const [calenderListArr, setCalenderListArr] = useState([]);

  // 모달 보이는 상태값
  const [isModal, setIsModal] = useState(false);
  // 모달 실행 함수
  const modalOk = e => {
    if (isModal === false) {
      setIsModal(true);
    }
  };
  const modalCancel = () => {
    setIsModal(false);
  };

  const userId = 8;
  // 메뉴를 열거나 닫는 함수
  const toggleMenu = () => {
    setIsOpen(!isOpen); // isOpen 상태를 토글
  };

  const todolistMenuBtnClick = () => {
    const todoMenuBtn = document.querySelector(".move-writepage-btn");
    const todolistClick = document.querySelector(".todo-list-menu-wrap");

    todoMenuBtn.addEventListener("click", () => {
      //   document.div.style.backgroundColor = "red";

      const classLength = todolistClick.classList.length;
      for (let i = 0; i < classLength; i++) {
        if (todolistClick.classList.item(i) === "todolistOff") {
          todolistClick.className = "todo-list-menu-wrap";
        } else {
          todolistClick.className += " todolistOff";
        }
      }
      console.log(todolistClick.className);
    });
  };

  const todoListMenu = useRef(null);
  // const navigate = useNavigate();
  // const [searchText, setSearchText] = useState("");
  const [toggle, setToggle] = useState(false);

  const todoListView = () => {
    if (toggle) {
      todoListMenu.current.classList.remove("header-more-open");
      setToggle(false);
    } else {
      todoListMenu.current.classList.add("header-more-open");
      setToggle(true);
    }
  };
  const getCalenderList = async userId => {
    // console.log(userId);
    try {
      const resepons = await axios.get(
        `/api/calendar?signed_user_id=${userId}`,
      );
      const status = resepons.status.toString().charAt(0);
      console.log(resepons);
      if (status === "2") {
        return resepons.data;
      } else {
        console.log("API 오류");
      }
      console.log(resepons.data);
    } catch (error) {
      console.log(error);
      // alert(error);
    }
  };

  const calenderList = async () => {
    const result = await getCalenderList(userId);

    setCalenderListArr(result.resultData);
    // console.log(result.resultData);
  };

  // const [checkedList, setCheckedList] = useState([]);
  // const onCheckedItem = (checked, id) => {
  //   if (checked) {
  //     setCheckedList(prev => [...prev, item]);
  //   } else if (!checked) {
  //     setCheckedList(checkedList.filter(el => el !== item));
  //   }
  // };
  // 좌측 메뉴의 캘린더 리스트
  useEffect(() => {
    calenderList();
    return () => {};
  }, []);

  // const onClickModalOn = () => {
  //   setAlarmModalIsOpen(true);
  // };
  return (
    <NavStyle>
      {isModal ? <AlarmModal modalCancel={modalCancel} /> : null}
      {/* <ShowAlarmModal setAlarmModalIsOpen={alarmModalIsOpen} /> */}

      <div className="menu">
        <div className="div-menu-header">
          <h1 className="menu-header">
            <Link to="/">
              <div className="postime-logo"></div>
              <span className="blind">POSTIME</span>
            </Link>
          </h1>
        </div>

        <div className="move-writepage-btn-area-wrap">
          <div className="move-writepage-btn-area">
            <Link to="/write/create">
              <span className="move-writepage">
                <button type="button" className="move-writepage-btn">
                  <span
                    className="ns-font-bold-17"
                    onClick={todolistMenuBtnClick}
                    // onclick="todolistMenuBtnClick()"
                  >
                    일정 등록
                  </span>
                </button>
              </span>
            </Link>
          </div>
        </div>

        <div className="nav-all-calender-wrap">
          <Link to="/">
            <div className="nav-all-calender">
              <div className="nav-icon-style nav-complete-icon">
                <MdCalendarToday />
              </div>
              <span className="ns-font-bold-17 all-calender-icon">
                전체 일정
              </span>
            </div>
          </Link>
        </div>

        <div className="nav-content">
          <div className="nav-wrap">
            <div className="nav-inner">
              <div className="div-calender div-mycalender-title">
                <h1 className="mycalender-title">
                  <div
                    className="mycalender-btn"
                    // onclick="calenderListBtnClick()"
                  >
                    {/* <MdOutlineKeyboardArrowUp /> */}
                    <MdOutlineKeyboardArrowDown />
                  </div>
                  <span className="ns-font-bold-17">내 캘린더</span>
                </h1>
              </div>
              <div className="div-calender div-mycalender-list">
                {calenderListArr.map((item, index) => {
                  return (
                    <div
                      className="div-calender mycalender-list mycalender"
                      key={index}
                    >
                      <input
                        type="checkbox"
                        className="calender-color"
                        id={item.calendarId}
                        style={{ accentColor: `${item.color}` }}
                        onChange={() => {
                          // checkItemHandler();
                        }}
                      />
                      <div
                        className="calender-name"
                        // style={{ backgroundColor: "#555555" }}
                        // style={{ color: `${item.color}` }}
                      >
                        {item.title}
                      </div>
                    </div>
                  );
                })}

                {/* <div className="div-calender mycalender-list mycalender">
                  <input type="checkbox" className="calender-color" />
                  <div className="calender-name">내 캘린더</div>
                </div>
                <div className="div-calender mycalender-list a-team-calender">
                  <input type="checkbox" className="calender-color" />
                  <div className="calender-name">A팀 캘린더</div>
                </div>
                <div className="div-calender mycalender-list b-team-calender">
                  <input type="checkbox" className="calender-color" />
                  <div className="calender-name">B팀 캘린더</div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="nav-content">
          <div className="nav-wrap">
            <div className="nav-inner nav-menu-gap">
              <div className="div-calender div-mycalender-title">
                <Link to="/complete">
                  <div className="mycalender-title">
                    <div className="nav-icon-style nav-complete-icon">
                      <IoIosCheckboxOutline />
                    </div>
                    <span className="ns-font-17">완료</span>
                  </div>
                </Link>
              </div>
              <div className="div-calender div-mycalender-title">
                <Link to="/delete">
                  <div className="mycalender-title">
                    <div className="nav-icon-style nav-delete-icon">
                      <BsTrash3 />
                    </div>
                    <span className="ns-font-17">휴지통</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="nav-content">
          <div className="nav-wrap">
            <div className="nav-inner nav-menu-gap">
              <div
                className="div-calender div-mycalender-title"
                onClick={e => {
                  modalOk(e);
                }}
              >
                <div className="mycalender-title">
                  <div className="nav-icon-style nav-alarm-icon">
                    <VscBell />
                  </div>
                  <span className="ns-font-17">알림</span>
                </div>
              </div>
              <div className="div-calender div-mycalender-title">
                <div className="mycalender-title">
                  <div className="nav-icon-style nav-support-icon">
                    <PiGearSixLight />
                  </div>
                  <span className="ns-font-17">고객지원</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavStyle>
  );
};

export default Nav;
