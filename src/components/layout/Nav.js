import styled from "@emotion/styled";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { IoIosCheckboxOutline } from "react-icons/io";
import {
  MdCalendarToday,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { PiGearSixLight } from "react-icons/pi";
import { VscBell, VscBellDot } from "react-icons/vsc";
import { Link } from "react-router-dom";
import "../../css/nav.css";
import AlarmModal from "../modal/AlarmModal";
import CalendarModal from "../modal/CalendarModal";
import CalendarModifyModal from "../modal/CalendarModifyModal";
import CalendarSelectModal from "../modal/CalendarSelectModal";
import { FaSquare, FaSquareCheck } from "react-icons/fa6";
import { RiCheckboxFill } from "react-icons/ri";
import { CalendarContext } from "../../apis/home/CalendarContext";

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
  /** 임의로 넣은 userId (8), 마지막에 세션처리를 번경하기 */
  const [userId, setUserId] = useState(8);

  /** 삭제할 유저 ID */
  const [deleteUeserId, setDeleteUeserId] = useState("");
  /** calendarId 저장 */
  const [calendarId, setCalendarId] = useState(null);
  /** 캘린더 리스트 배열 */
  const [calenderListArr, setCalenderListArr] = useState([]);
  /** 참여 캘린더 리스트 배열 GET */
  const getCalenderList = async userId => {
    try {
      const resepons = await axios.get(
        `/api/calendar?signed_user_id=${userId}`,
      );
      const status = resepons.status.toString().charAt(0);
      if (status === "2") {
        return resepons.data;
      } else {
        console.log("API 오류");
      }
      console.log(resepons.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 수정!!!!!!
  // 체크 박스 상태
  const [isCheck, setIsCheck] = useState(true);
  const [calenderName, setcalenderName] = useState("");

  /** 알림 리스트 배열 */
  const [alarmListArr, setAlarmListArr] = useState([]);
  /** false:알림없음, true:알림 있음  */
  const [isNewAlarm, setIsNewAlarm] = useState(false);
  /** 알림 모달 보이는 상태값 */
  const [isAlarmModal, setIsAlarmModal] = useState(false);
  /** 알림 모달 실행 함수 */
  const alarmModalOk = e => {
    setIsAlarmModal(!isAlarmModal);
  };
  /** 알림 모달 닫기 함수 */
  const alarmModalCancel = () => {
    setIsAlarmModal(false);
  };
  /** axios 로 알림 리스트 GET */
  const alarmList = async userId => {
    try {
      const resepons = await axios.get(`/api/notice?signed_user_id=${userId}`);
      const status = resepons.status.toString().charAt(0);
      const data = resepons.data.resultData.notice;
      if (status === "2") {
        if (data > 0) {
          setAlarmListArr(data);
          setIsNewAlarm(true);
        } else {
          setIsNewAlarm(false);
        }
      }
      console.log(resepons.data);
    } catch (error) {
      console.log(error);
    }
  };

  /** 캘린더 공유, 수정 기능 선택 모달 */
  const [isCalenderSelectModal, setIsCalenderSelectModal] = useState(false);
  /** 캘린더 공유, 수정 모달 관련 */
  const calenderSelectModalOk = e => {
    setIsCalenderSelectModal(!isCalenderSelectModal);
    // console.log("e");
    // console.log("e", e.target.id);
    // console.log("e", e.target.innerText);
    sessionStorage.setItem("calendarId", e.target.id);
    setcalenderName(e.target.innerText);
  };
  /** 캘린더 공유, 수정 모달 닫기 함수 */
  const calendarSelectModalCancel = () => {
    setIsCalenderSelectModal(false);
  };
  /** 캘린더 공유, 수정 기능 선택 메뉴 */
  const [modalType, setModalType] = useState(0);
  /** 캘린더 공유, 수정 기능 선택 메뉴에 따라서 다른 모달 활성화 기능 */
  const calenderSeleteCheck = () => {
    // 공유 모달
    if (modalType === 1) {
      calenderUserListModalOk(true);
      calendarSelectModalCancel();
    }
    // 수정 모달
    if (modalType === 2) {
      calendarModifyModalOk(true);
      calendarSelectModalCancel();
    }
  };

  /** 캘린더 공유 모달 활성화/비활성화 여부 체크 */
  const [isCalenderUserListModal, setIsCalenderUserListModal] = useState(false);
  /** 캘린더 공유 모달 활성화/비활성화 함수 */
  const calenderUserListModalOk = () => {
    setIsCalenderUserListModal(!isCalenderUserListModal);
    setIsCalenderSelectModal(false); // 이전 모달 창 닫기
  };
  /** 캘린더 공유 모달 닫기 기능 */
  const calendarUserListModalCancel = () => {
    setIsCalenderUserListModal(false);
  };

  /** 체크박스 클릭한 캘린더의 캘린더ID 저장(전달) */
  const calenderCheckEvent = async calendarId => {
    // 클릭한 캘린더ID 저장(전달)
    setCalendarId(calendarId);
  };

  /** 캘린더 수정 모달 활성화/비활성화 여부  */
  const [isCalendarModifyModal, setIsCalendarModifyModal] = useState(false);
  /** 캘린더 수정 모달 실행 함수  */
  const calendarModifyModalOk = e => {
    setIsCalendarModifyModal(!isCalendarModifyModal);
  };
  /** 캘린더 수정 모달 닫기 기능  */
  const calendarModifyModalCancel = () => {
    setIsCalendarModifyModal(false);
  };

  const [checkedCalendars, setCheckedCalendars] = useState([]);
  const [newCheckedCalendars, setNewCheckedCalendars] = useState([]);
  /** 체크된 캘린더들 */
  // 체크박스 클릭에 대한 처리 함수
  const handleCheckboxChange = calendarId => {
    // 체크된 캘린더 ID 배열 복사
    const newCheckedCalendars = [...checkedCalendars];
    // 클릭된 캘린더 ID의 인덱스 확인
    const index = checkedCalendars.indexOf(calendarId);
    // 클릭된 캘린더가 이미 체크된 경우 제거, 아닌 경우 추가
    if (index === -1) {
      newCheckedCalendars.push(calendarId);
    } else {
      newCheckedCalendars.splice(index, 1);
    }
    // 새로운 체크된 캘린더 ID 배열로 상태 업데이트
    setCheckedCalendars(newCheckedCalendars);
    // 이제 풀 캘린더 컴포넌트로 해당 캘린더의 ID 목록을 전달할 수 있습니다.
  };

  // // 체크된 캘린더 배열(여기)
  // const [calendarCheckedList, setCalendarCheckedList] = useState([]);
  // // 캘린더 리스트를 가져온다.
  // const calenderList = async () => {
  //   const result = await getCalenderList(userId);

  //   setCalenderListArr(result.resultData);
  // };

  // 최초 렌더링
  useEffect(() => {
    // 캘린더 리스트 출력
    // calenderList();
    // 알림 리스트 (추후 넣는 값 수정)
    alarmList(userId);
    return () => {};
  }, []);

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
                    // onClick={todolistMenuBtnClick}
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
                      {isCheck ? (
                        <FaSquareCheck
                          className="calender-color"
                          id={item.calendarId}
                          color={item.color}
                          onClick={() => handleCheckboxChange(item.calendarId)}
                        />
                      ) : (
                        <FaSquare
                          className="calender-color"
                          id={item.calendarId}
                          color={item.color}
                          onClick={() => handleCheckboxChange(item.calendarId)}
                        />
                      )}

                      {/* {isCheck ? (
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
                      )} */}

                      <div
                        className="calender-name"
                        // style={{ backgroundColor: "#555555" }}
                        // style={{ color: `${item.color}` }}

                        id={item.calendarId}
                        name={item.title}
                        onClick={e => {
                          calenderSelectModalOk(e);
                        }}
                      >
                        {item.title}
                      </div>
                    </div>
                  );
                })}

                {/* 서버 꺼졌을 때 */}
                <div className="div-calender mycalender-list mycalender">
                  {checkedCalendars.includes("id1") ? (
                    <FaSquareCheck
                      className="calender-color"
                      color="blue"
                      onClick={() => handleCheckboxChange("id1")}
                    />
                  ) : (
                    <FaSquare
                      className="calender-color"
                      color="red"
                      onClick={() => handleCheckboxChange("id1")}
                    />
                  )}
                  <div
                    className="calender-name"
                    id="id1"
                    onClick={() => calenderSelectModalOk("id1")}
                  >
                    내 캘린더
                  </div>
                </div>

                {/* <FaSquare color="red" /> */}
                {/* <div className="div-calender mycalender-list mycalender">
                  <FaSquareCheck color="blue" />
                  <div
                    className="calender-name"
                    id="id1"
                    onClick={
                      e => {
                        calenderSelectModalOk(e);
                      }
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
