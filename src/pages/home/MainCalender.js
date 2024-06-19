import styled from "@emotion/styled";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/calender.css";
import { colorSystem } from "../../css/color.js";
import moment from "moment";
const CalenderStyle = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
  .App {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  /* 캘린더의 헤더 영역 */
  .fc .fc-toolbar.fc-header-toolbar {
    margin: 0;
    padding: 0 40px;
    height: 12%;
    font-weight: bold;
    color: ${colorSystem.g900};
  }
  /* 캘린더의 헤더 영역 : toolbar 버튼  */
  .fc .fc-button-primary {
    background-color: ${colorSystem.primaryB};
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-weight: 500;
      font-size: 30px;
      margin: 3px 1px;
    }
    :hover {
      background-color: ${colorSystem.g500};
    }
  }
  .fc-toolbar-chunk .fc-toolbar-title {
    display: flex;
    height: auto;
    color: ${colorSystem.g300};
  }
  .fc-theme-standard th {
    height: 32px;
    margin: 0 auto;
    background: ${colorSystem.g900};
    border-top: 1px solid ${colorSystem.g800};
    border-bottom: 1px solid ${colorSystem.g800};
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: ${colorSystem.primaryB};
  }
  // 오늘 날짜 배경색(수정)
  .fc .fc-daygrid-day.fc-day-today {
    background-color: #fff8bd;
    color: #356eff;
  }

  // 날짜별 그리드 안 속 글자 정렬  : 왼쪽 정렬
  .fc .fc-daygrid-day-top {
    flex-direction: row;
    margin-bottom: 3px;
    padding: 10px 10px 0 10px;
  }

  .fc-event {
    border: none;
  }
`;
const MainCalender = ({ nowCalendarId, checkedCalendarIds }) => {
  const navigate = useNavigate();
  /** FullCalendar의 events에서 화면에 보여줄 값들의 배열 */
  const array = [];

  const userId = sessionStorage.getItem("userId");

  /** 캘린더 목록 리스트 (axios로 get한 값) */
  const [calenderArr, setCalenderArr] = useState([]);
  /** 캘린더 목록 리스트 (FullCalendar에 출력할 값) */
  const [calenderClickArr, setCalenderClickArr] = useState([]);
  /** 캘린더 리스트의 캘린더의 활성화/비활성화 여부 체크 */
  const [activeCalendars, setActiveCalendars] = useState([]);
  /** 일 빼기 : 일자의 날짜 출력 포맷 변경하기 */
  const dayCellContent = dateInfo => {
    return {
      html: dateInfo.dayNumberText.replace("일", ""),
    };
  };

  /** 캘린더에 보여줄 일정들을 axios로 get */
  const getCalender = async userId => {
    // console.log("유저 아이디 확인 : ", userId);
    try {
      const resepons = await axios.get(
        `/api/board/mini?signed_user_id=${userId}`,
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
  // 메뉴에서 캘린더 체크 선택할 때마다 동작
  // FullCalendar에 출력될 배열을 필터링을 하는 함수 실행
  useEffect(() => {
    // 체크 박스가 해제 되었을 때 실행
    remove({
      filterCalendarId: nowCalendarId,
      calenderArr: calenderClickArr,
    });
    // reAdd({
    //   filterCalendarId: nowCalendarId,
    //   calenderArr: calenderArr,
    // });
    // 현재 선택한 캘린더의 체크박스가 변경될 때마다 재실행
  }, [nowCalendarId]);
  /** 캘린더에 보여줄 값과 캘린더 리스트 get 하기 위한 함수 */
  const firstCalenderDayPrint = async () => {
    const result = await getCalender(userId);
    setCalenderArr(result.resultData);
    setCalenderClickArr(result.resultData);
  };
  /** 메뉴에서 체크 박스 해제시 실행 되는 함수.
   * 체크 해제된 캘린더Id의 일정들을 FullCalendar 출력에서 제외 */
  const remove = ({ filterCalendarId, calenderArr }) => {
    const newName = calenderArr.filter(
      item => item.calendarId !== filterCalendarId,
    );
    setCalenderClickArr(newName);
  };

  useEffect(() => {
    // 체크된 캘린더 ID에 해당하는 캘린더만 필터링하여 표시
    const aaa = calenderArr.filter(item =>
      checkedCalendarIds.includes(item.calendarId),
    );
    setCalenderClickArr(aaa);
  }, [checkedCalendarIds]);

  /** 체크박스 클릭 핸들러 */
  const handleCheckboxClick = calendarId => {
    // 활성화된 캘린더인지 확인
    const isActive = activeCalendars.includes(calendarId);
    // 현재 체크박스의 상태에 따라 activeCalendars 업데이트
    if (isActive) {
      setActiveCalendars(prev => prev.filter(id => id !== calendarId));
    } else {
      setActiveCalendars(prev => [...prev, calendarId]);
    }
  };

  // 처음 화면이 렌더링 되었을 때 캘린더에 보여줄 값과 캘린더 리스트 get
  useEffect(() => {
    firstCalenderDayPrint();
    return () => {};
  }, []);

  /** 캘린더의 일정 클릭시 상세페이지로 이동 및 boardId 전달 */
  const insertModalOpen = clickInfo => {
    const clickBoardId = clickInfo.event.id;
    const clickCalendarId = clickInfo.event._def.extendedProps.calendarId;

    navigate("/write/detail", {
      state: {
        boardId: clickBoardId,
        calendarId: clickCalendarId,
      },
    });
  };

  /** 이벤트 배열 생성 */
  calenderClickArr.map((item, index) =>
    array.push({
      id: item.boardId,
      title: item.title,
      start: item.start,
      end: item.end,
      calendarId: item.calendarId,
      backgroundColor: item.backgroundColor,
    }),
  );

  console.log("calenderClickArr : ", calenderClickArr);

  // const addDays = event => {
  //   if (event.allDay) {
  //     event.end = moment(event.end).add(1, "days");
  //   }
  //   return event;
  // };

  return (
    <CalenderStyle>
      <div className="App">
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            start: "prev,title,next",
            center: "",
            end: "today",
          }}
          buttonText={{ today: "오늘" }}
          locale={"kr"}
          height={"91.4vh"}
          dayCellContent={dayCellContent}
          fixedWeekCount={false}
          droppable={true}
          eventborderColor="none" // 이벤트 글자 색
          dayMaxEvents={true}
          aspectRatio={1.35}
          events={array}
          eventColor={"#F2921D"}
          editable={true}
          eventClick={insertModalOpen}
          // eventDataTransform={event => {
          //   addDays(event);
          // }}
        />
      </div>
    </CalenderStyle>
  );
};
export default MainCalender;
