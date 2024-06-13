import styled from "@emotion/styled";
import { BsTrash3 } from "react-icons/bs";
import { IoIosCheckboxOutline } from "react-icons/io";
import {
  MdCalendarToday,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { PiGearSixLight } from "react-icons/pi";
import { VscBell } from "react-icons/vsc";
import { VscBellDot } from "react-icons/vsc";
import "../../css/nav.css";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AlarmModal from "../modal/AlarmModal";
import CalendarModal from "../modal/CalendarModal";
import CalendarSelectModal from "../modal/CalendarSelectModal";
import DeleteCheckModal from "../modal/DeleteCheckModal";
import CalendarModifyModal from "../modal/CalendarModifyModal";
import { FaSquare, FaSquareCheck } from "react-icons/fa6";

const NavStyle = styled.div`
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
`;

const Nav = ({ setNowCalendarId }) => {
  const [calenderName, setcalenderName] = useState("");
  const [isCalenderSelectModal, setIsCalenderSelectModal] = useState(false);

  const [deleteUeserId, setDeleteUeserId] = useState("");
  const [calendarId, setCalendarId] = useState(null);
  // const calenderId = sessionStorage.getItem("calenderId");

  // const calendarId = sessionStorage.getItem("calendarId");
  // console.log("세션 있나?", calendarId);

  // 체크 박스 상태
  // const [isCheck, setIsCheck] = useState(false);
  const [isCheck, setIsCheck] = useState(true);

  const [calenderListArr, setCalenderListArr] = useState([]);
  // false:알림없음, true:알림 있음
  const [isNewAlarm, setIsNewAlarm] = useState(false);

  // 모달 보이는 상태값
  const [isAlarmModal, setIsAlarmModal] = useState(false);
  // 알림 모달 실행 함수
  const alarmModalOk = e => {
    setIsAlarmModal(!isAlarmModal);
  };
  const alarmModalCancel = () => {
    setIsAlarmModal(false);
  };

  const calenderSelectModalOk = e => {
    setIsCalenderSelectModal(!isCalenderSelectModal);
    // console.log("e");
    // console.log("e", e.target.id);
    // console.log("e", e.target.innerText);
    sessionStorage.setItem("calendarId", e.target.id);
    setcalenderName(e.target.innerText);
  };
  const calendarSelectModalCancel = () => {
    setIsCalenderSelectModal(false);
  };

  // 캘린더 유저 리스트 모달
  const [isCalenderUserListModal, setIsCalenderUserListModal] = useState(false);
  const calenderUserListModalOk = () => {
    // 캘린더명
    // console.log("e", calenderId);
    // setCalenderId(e.target.id);
    setIsCalenderUserListModal(!isCalenderUserListModal);
    setIsCalenderSelectModal(false); // 이전 모달 창 닫기
  };
  const calendarUserListModalCancel = () => {
    setIsCalenderUserListModal(false);
  };

  const [modalType, setModalType] = useState(0);
  const calenderSeleteCheck = () => {
    if (modalType === 1) {
      calenderUserListModalOk(true);
      calendarSelectModalCancel();
    }
    // 여기 수정 이제 이 모달 띄우기
    if (modalType === 2) {
      calendarModifyModalOk(true);
      calendarSelectModalCancel();
    }
  };

  const [userId, setUserId] = useState(8);

  // 메뉴를 열거나 닫는 함수
  // const toggleMenu = () => {
  //   setIsOpen(!isOpen); // isOpen 상태를 토글
  // };

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
  const [alarmListArr, setAlarmListArr] = useState([]);

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
      // console.log("sp", resepons.data.resultData);
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

  // 체크된 캘린더 배열(여기)
  const [calendarCheckedList, setCalendarCheckedList] = useState([]);
  // 캘린더 리스트를 가져온다.
  const calenderList = async () => {
    const result = await getCalenderList(userId);

    setCalenderListArr(result.resultData);

    // calenderListArr.map((item, index) => {
    // setUuuu([
    //   `${calenderListArr[index].calendarId}`,
    //   `${calenderListArr[index].title}`,
    //   `${ checked: true }`,
    // ]);
    // });
    // for (let i = 0; i < calenderListArr.length; i++) {
    //   calendarCheckedList.push({
    //     calendarId:
    //     title:
    //     checked:
    //   });
    // }
  };

  const [isCheckEvent, setIsCheckEvent] = useState(false);
  const calenderCheckEvent = async calendarId => {
    // 클릭한 캘린더 아이디 세션에 저장
    setCalendarId(calendarId);
    console.log("제발", calendarId);
    // sessionStorage.setItem("calendarId", calendarId);
    // const calendarCode = sessionStorage.getItem("calendarId");
    // console.log("세션 값 확인 : ", calendarCode);

    // setCalendarCheckedList([...calendarCheckedList, { calendarId }]);
    // remove({ calendarId });
  };

  // const [calenderListArr, setCalenderListArr] = useState([]);
  const remove = ({ calendarId }) => {
    const newName = calenderListArr.filter(
      item => item.calendarId !== calendarId,
    );
    // setCalendarCheckedList(newName);
    // console.log("뭐지?", newName);
  };

  // console.log("빠졌나?:", calenderListArr);

  // console.log("calendarCheckedList 체크 : ", calendarCheckedList);

  const alarmList = async userId => {
    try {
      const resepons = await axios.get(`/api/notice?signed_user_id=${userId}`);
      const status = resepons.status.toString().charAt(0);
      const data = resepons.data.resultData.notice;

      if (status === "2") {
        if (data > 0) {
          setAlarmListArr(data);
          setIsNewAlarm(true);
          // console.log("data 있음");
        } else {
          setIsNewAlarm(false);
          // console.log("data 없음");
        }
        // console.log("API 오류");
      }
      console.log(resepons.data);
    } catch (error) {
      console.log(error);
    }
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

  const [isCalendarModifyModal, setIsCalendarModifyModal] = useState(false);
  // 알림 모달 실행 함수
  const calendarModifyModalOk = e => {
    setIsCalendarModifyModal(!isCalendarModifyModal);
  };
  const calendarModifyModalCancel = () => {
    setIsCalendarModifyModal(false);
  };

  useEffect(() => {
    calenderList();
    alarmList(userId);
    return () => {};
  }, []);

  // const onClickModalOn = () => {
  //   setAlarmModalIsOpen(true);
  // };

  // 캘리더 목록 체크 여부
  // const [isChecked, setIsChecked] = useState(false);
  // const checkedItemHandler = (value, isChecked) => {
  //   if (isChecked) {
  //     setCalendarCheckedList(prev => [...prev, value]);

  //     return;
  //   }

  //   if (!isChecked && calendarCheckedList.includes(value)) {
  //     setCalendarCheckedList(
  //       calendarCheckedList.filter(item => item !== value),
  //     );

  //     return;
  //   }

  //   return;
  // };

  // const checkHandler = (e, value) => {
  //   setIsChecked(!isChecked);
  //   checkedItemHandler(value, e.target.checked);
  // };

  return (
    <NavStyle>
      {isAlarmModal ? (
        <AlarmModal
          alarmModalCancel={alarmModalCancel}
          alarmListArr={alarmListArr}
          isNewAlarm={isNewAlarm}
        />
      ) : null}
      {isCalenderSelectModal ? (
        <CalendarSelectModal
          calendarSelectModalCancel={calendarSelectModalCancel}
          calenderSeleteCheck={calenderSeleteCheck}
          setModalType={setModalType}
        />
      ) : null}
      {isCalenderUserListModal ? (
        <CalendarModal
          calenderUserListModalOk={calenderUserListModalOk}
          calenderId={calendarId}
          calenderName={calenderName}
          modalType={modalType}
          deleteUeserId={deleteUeserId}
        />
      ) : null}
      {isCalendarModifyModal ? (
        <CalendarModifyModal
          calendarModifyModalOk={calendarModifyModalOk}
          calendarModifyModalCancel={calendarModifyModalCancel}
        />
      ) : null}
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
                  <span className="ns-font-bold-17">
                    내 캘린더
                    {/* <FaSquare />
                    <FaSquareCheck color="red" /> */}
                  </span>
                </h1>
              </div>
              <div className="div-calender div-mycalender-list">
                {calenderListArr.map((item, index) => {
                  return (
                    <div
                      className="div-calender mycalender-list mycalender"
                      key={index}
                    >
                      {isCheck ? (
                        <MdCheckBox
                          className="calender-color"
                          id={item.calendarId}
                          color={item.color}
                          onClick={e => {
                            setNowCalendarId(item.calendarId);
                            console.log("item", item.calendarId);

                            calenderCheckEvent(item.calendarId);
                          }}
                        />
                      ) : (
                        <MdCheckBoxOutlineBlank
                          className="calender-color"
                          id={item.calendarId}
                          color={item.color}
                          onClick={e => {}}
                        />
                      )}

                      {/* <input
                        type="checkbox"
                        style={{ accentColor: `${item.color}` }}
                        onChange={() => {
                          checkItemHandler();
                        }}
                      /> */}

                      <div
                        className="calender-name"
                        // style={{ backgroundColor: "#555555" }}
                        // style={{ color: `${item.color}` }}

                        id={item.calendarId}
                        name={item.title}
                        onClick={e => {
                          calenderSelectModalOk(e);

                          // console.log(e.target.innerText);
                        }}
                      >
                        {item.title}
                      </div>
                    </div>
                  );
                })}

                {/* 서버 꺼졌을 때 */}
                {/* <div className="div-calender mycalender-list mycalender">
                  <input type="checkbox" className="calender-color" />
                  <div
                    className="calender-name"
                    id="id1"
                    onClick={
                      e => {
                        calenderSelectModalOk(e);
                      }
                      // console.log(e.target);
                    }
                  >
                    내 캘린더
                  </div>
                </div> */}

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
                  alarmModalOk(e);
                }}
              >
                <div className="mycalender-title">
                  <div className="nav-icon-style nav-alarm-icon">
                    {isNewAlarm ? <VscBellDot /> : <VscBell />}
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
