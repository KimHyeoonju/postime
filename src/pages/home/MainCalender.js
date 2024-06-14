import styled from "@emotion/styled";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import "../../css/calender.css";
import { colorSystem } from "../../css/color.js";
import { useEffect, useState } from "react";
import axios from "axios";
import interactionPlugin from "@fullcalendar/interaction";

const CalenderStyle = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);

  .App {
    position: absolute;
    width: 100%;
    bottom: 0;
    /* height: 100%; */
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
    background-color: ${colorSystem.g500};
    border: none;
    /* width: 40px;
    height: 37px; */
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
    /* background-color: #356eff; */
    /* word-break: keep-all; */
    color: ${colorSystem.g300};
  }

  // 요일 부분(수정)
  .fc-theme-standard th {
    height: 32px;
    margin: 0 auto;
    /* margin: auto; */
    /* padding: auto; */
    /* padding-top: 3.5px; */
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

  // 날짜별 그리드
  .fc .fc-daygrid-day-frame {
    /* padding: 10px; */
  }

  // 날짜별 그리드 안 속 글자 정렬  : 왼쪽 정렬
  .fc .fc-daygrid-day-top {
    flex-direction: row;
    margin-bottom: 3px;
    padding: 10px 10px 0 10px;
  }

  // 각 이벤트 요소
  /* .fc-event {
    cursor: pointer;
    padding: 5px 8px;
    margin-bottom: 5px;
    border-radius: 4px;
    font-weight: 500;
    font-size: 14px;
  } */

  .fc-event {
    border: none;
  }
`;

const MainCalender = ({ nowCalendarId, checkedCalendars }) => {
  /** FullCalendar의 events에서 화면에 보여줄 값들의 배열 */
  const array = [];
  /** const userId = sessionStorage.getItem("userCode"); */
  /** 임의로 넣은 userId (8), 마지막에 세션처리를 번경하기 */
  const userId = 8;

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
  const calenderDayPrint = async () => {
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

  // const reAdd = ({ filterCalendarId, calenderArr }) => {
  //   const newName = calenderArr.filter(item =>
  //     activeCalendars.includes(item.calendarId),
  //   );
  //   setCalenderClickArr(newName);
  // };

  // useEffect(() => {
  //   // activeCalendars가 변경될 때마다 캘린더를 필터링하고 업데이트
  //   const filteredCalendars = calenderArr.filter(item =>
  //     activeCalendars.includes(item.calendarId),
  //   );
  //   setCalenderClickArr(filteredCalendars);
  // }, [activeCalendars, calenderArr]);

  // 확인
  // 다시 배열에 값 추가?
  // useEffect(() => {
  //   // 체크된 캘린더 ID에 해당하는 캘린더만 필터링하여 표시
  //   const filteredCalendars = calenderArr.filter(item =>
  //     checkedCalendars.includes(item.calendarId),
  //   );
  //   setCalenderClickArr(filteredCalendars);
  // }, [checkedCalendars, calenderArr]);

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
    calenderDayPrint();
    return () => {};
  }, []);

  // 수정 예정
  /** 캘린더의 일정 클릭시 이벤트 */
  const handleEventClick = clickInfo => {
    console.log(clickInfo);
    const event = clickInfo.event;
    const mouseX = clickInfo.jsEvent.clientX;
    const mouseY = clickInfo.jsEvent.clientY - 90;
    this.setState({ selectedEvent: event, mouseX, mouseY });
  };

  // 수정 예정
  /** 캘린더의 일정 클릭시 이벤트 */
  const insertModalOpen = clickInfo => {
    // alert(clickInfo);
    console.log(clickInfo);
    console.log(clickInfo.event._def.title);
    console.log(clickInfo.event._instance.range.start);
  };


  /** 이벤트 배열 생성 */
  calenderClickArr.map((item, index) =>
    array.push({
      title: item.title,
      start: item.start,
      end: item.end,
      backgroundColor: item.backgroundColor,
    }),
  );
  // console.log("calenderClickArr : ", calenderClickArr);

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
          // titleFormat={{
          //   year: "numeric",
          //   month: "numeric",
          //   end: "today",
          // }}
          locale={"kr"}
          height={"91.4vh"}
          // formatShortWeekday={formatShortWeekday}
          dayCellContent={dayCellContent}
          // formatDay={(locale, date) => {
          //   date.toLocaleString("en", { day: "numeric" });
          // }}
          // titleContent={({ date, view }) => null}
          //
          fixedWeekCount={false}
          droppable={true}
          eventborderColor="none" // 이벤트 글자 색
          dayMaxEvents={true}
          aspectRatio={1.35}
          events={array}
          // 아래는 서버가 죽었을 때 이용할 코드
          // events={[
          //   { title: "event 1", date: "2024-06-01" },
          //   { title: "event 2", date: "2024-06-02", backgroundColor: "red" },
          //   {
          //     title: "event 3",
          //     start: "2024-06-02",
          //     end: "2024-06-05",
          //     // date: "2024-06-02",
          //     backgroundColor: "red",
          //     borderColor: "red",
          //     textColor: "#000000",
          //   },
          //   {
          //     title: "event 4",
          //     start: "2024-06-10",
          //     end: "2024-06-18",
          //     // date: "2024-06-02",
          //     backgroundColor: "#ABD5BD",
          //     borderColor: "#ABD5BD",
          //     textColor: "#000000",
          //   },
          // ]}
          eventColor={"#F2921D"}
          // droppable={true}
          // dateClick={handleEventClick}
          editable={true}
          eventClick={insertModalOpen}
        />
      </div>
    </CalenderStyle>
  );
};

export default MainCalender;
