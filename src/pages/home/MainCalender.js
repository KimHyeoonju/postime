import styled from "@emotion/styled";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import "../../css/calender.css";
import { colorSystem } from "../../css/color.js";

const CalenderStyle = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
  /* padding: 10px 20px 0px 20px; */

  .App {
    position: absolute;
    width: 100%;
    bottom: 0;
    /* height: 100%; */
  }

  /* 캘린더의 헤더 영역 */
  // toolbar container
  // headerToolbar
  .fc .fc-toolbar.fc-header-toolbar {
    margin: 0;
    padding: 0 40px;
    /* background-color: #356eff; */
    height: 12%;
    /* font-family: "Noto Sans KR"; */
    font-weight: bold;
    color: ${colorSystem.primaryB};
    /* font-size: 20px; */
    /* line-height: 100%; */
  }

  /* 캘린더의 헤더 영역 */
  // toolbar 버튼(수정)
  .fc .fc-button-primary {
    background-color: ${colorSystem.g700};
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
      background-color: ${colorSystem.g800};
    }
  }

  .fc-toolbar-chunk .fc-toolbar-title {
    display: flex;
    height: auto;
    /* background-color: #356eff; */
    /* word-break: keep-all; */

    color: ${colorSystem.g200};
  }

  // 요일 부분(수정)
  .fc-theme-standard th {
    height: 32px;
    margin: 0 auto;
    /* margin: auto; */
    /* padding: auto; */
    /* padding-top: 3.5px; */
    background: ${colorSystem.g900};
    border: 1px solid #dddee0;
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
`;

const MainCalender = () => {
  // 일 빼기
  // 일자의 날짜 출력 포맷 변경하기
  const dayCellContent = dateInfo => {
    return {
      html: dateInfo.dayNumberText.replace("일", ""),
    };
  };

  return (
    <CalenderStyle>
      <div className="App">
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          headerToolbar={{
            // start: "prev,title,title,next",
            start: "prev,title,next",
            center: "",
            end: "",
          }}
          titleFormat={{
            year: "numeric",
            month: "numeric",
          }}
          locale={"kr"}
          height={"91.4vh"}
          // formatShortWeekday={formatShortWeekday}

          dayCellContent={dayCellContent}
          formatDay={(locale, date) => {
            date.toLocaleString("en", { day: "numeric" });
          }}
          // titleContent={({ date, view }) => null}
          //
          fixedWeekCount={false}
          droppable={true}
          events={[
            { title: "event 1", date: "2024-06-01" },
            { title: "event 2", date: "2024-06-02" },
          ]}
        />
      </div>
    </CalenderStyle>
  );
};

export default MainCalender;
