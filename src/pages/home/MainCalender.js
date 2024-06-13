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
    color: ${colorSystem.g900};
    /* font-size: 20px; */
    /* line-height: 100%; */
  }

  /* 캘린더의 헤더 영역 */
  // toolbar 버튼(수정)
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

const MainCalender = ({ nowCalendarId }) => {
  // console.log("카렌더: ", nowCalendarId);
  // const userId = sessionStorage.getItem("userCode");
  const userId = 8;
  const userName = sessionStorage.getItem("userName");

  // 캘린더 목록 리스트
  const [calenderArr, setCalenderArr] = useState([]);
  // 캘린더 목록 체크 리스트
  const [calenderClickArr, setCalenderClickArr] = useState([]);
  // console.log(userId);

  // 일 빼기
  // 일자의 날짜 출력 포맷 변경하기
  const dayCellContent = dateInfo => {
    return {
      html: dateInfo.dayNumberText.replace("일", ""),
    };
  };

  // 캘린더에 보여줄 일정들을 get
  const getCalender = async userId => {
    try {
      const resepons = await axios.get(
        `/api/board/mini?signed_user_id=${userId}`,
      );
      const status = resepons.status.toString().charAt(0);
      console.log("테스트1", resepons);

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

  const [calendarIdCheck, setCalendarIdCheck] = useState(false);
  useEffect(() => {
    // 필터링을 하는 함수를 실행시킨다.
    // console.log("========== 칼렌더 랜더링 하자: ", nowCalendarId);

    // calenderClickArr.map((item, index) => {
    //   if (item.calendarId === nowCalendarId) {
    //     setCalendarIdCheck(true);
    //     // console.log(calendarIdCheck);
    //   }
    //   if (item.calendarId === nowCalendarId) {
    //     setCalendarIdCheck(false);
    //     // console.log(calendarIdCheck);
    //   }
    // });

    // if (calendarIdCheck) {

    remove({
      filterCalendarId: nowCalendarId,
      calenderArr: calenderClickArr,
    });

    console.log("들어왔나요?");
    // }

    // console.log("확인 ", { calenderArr });
  }, [nowCalendarId]);

  // useEffect(() => {
  //   // 필터링을 하는 함수를 실행시킨다.
  //   console.log("========== 칼렌더 랜더링 하자: ", nowCalendarId);
  //   remove({ filterCalendarId: nowCalendarId, calenderArr: calenderArr });
  //   // console.log("확인 ", { calenderArr });
  // }, [nowCalendarId]);

  const calenderDayPrint = async () => {
    const result = await getCalender(userId);
    setCalenderArr(result.resultData);
    // console.log("result", calenderArr);
    setCalenderClickArr(result.resultData);
    // console.log("result", calenderArr);
    // console.log("타이틀 : ", result.resultData);
    // qewtq(calenderArr);
    // console.log("들어왔는지 확인 : ", asfg);
    // console.log(result.resultData.untilNextMonthBoard);
    // console.log("체크", todoListArr[1].dDay);
    // checkDay();
    // const filterCalendarId = sessionStorage.getItem("calendarId");
    // const filterCalendarId = nowCalendarId;
    // remove(filterCalendarId, calenderArr);

    //   setCalendarCheckedList(newName);
    // };

    // console.log("id", filterCalendarId);
    // console.log("calenderArr", calenderArr);

    // calenderArr.map((item, index) => {
    //   if (item.calendarId == filterCalendarId) {
    //     ("");
    //   }
    //   console.log("정답");
    //   console.log("item.calendarId", item.calendarId);
    // });

    // const newName = calenderArr.filter(
    //   item => item.calendarId !== filterCalendarId,
    //   console.log("확인중"),
    // );
    // setCalenderArr(newName);
    // console.log("newName  ", newName);
    // remove({ filterCalendarId, calenderArr });
  };

  const remove = ({ filterCalendarId, calenderArr }) => {
    // console.log("id", filterCalendarId);
    // console.log("calenderArr", calenderArr);
    const newName = calenderArr.filter(
      item => item.calendarId !== filterCalendarId,
    );

    setCalenderClickArr(newName);
    console.log("newName  ", newName);
  };

  const addC = ({ filterCalendarId, calenderArr }) => {
    console.log("id", filterCalendarId);
    console.log("calenderArr", calenderArr);
    const newName = calenderArr.filter(
      item => item.calendarId !== filterCalendarId,
    );
    setCalenderClickArr(newName);
    console.log("newName  ", newName);
  };

  useEffect(() => {
    calenderDayPrint();
    // console("확인", calenderArr);
    // console.log("ㅁㄴㅇ", sessionStorage.getItem("calendarId"));
    // dayPrint();

    // deleteTodoList();
    // calenderDayPrintaaa();
    // setCalenderClickArr(calenderArr);
    // console.log("체크 리스트", calenderClickArr);
    return () => {};
  }, []);

  const handleEventClick = clickInfo => {
    console.log(clickInfo);

    const event = clickInfo.event;
    const mouseX = clickInfo.jsEvent.clientX;
    const mouseY = clickInfo.jsEvent.clientY - 90;
    this.setState({ selectedEvent: event, mouseX, mouseY });
  };

  const insertModalOpen = clickInfo => {
    // alert(clickInfo);
    console.log(clickInfo);
    console.log(clickInfo.event._def.title);
    console.log(clickInfo.event._instance.range.start);
  };

  const array = [];
  // const [array, setArray] = useState();
  const [isCalender, setIsCalender] = useState("");

  // const dayPrint = () => {
  calenderClickArr.map((item, index) =>
    array.push({
      title: item.title,
      start: item.start,
      end: item.end,
      backgroundColor: item.backgroundColor,
    }),
  );
  // };

  // const [isCheckEvent, setIsCheckEvent] = useState(false);
  // const calenderCheckEvent = async calendarId => {
  // 클릭한 캘린더 아이디 세션에 저장
  // console.log(calendarId);
  // sessionStorage.setItem("calendarId", calendarId);
  // const calendarCode = sessionStorage.getItem("calendarId");
  // console.log("세션 값 확인 : ", calendarCode);

  // setCalendarCheckedList([...calendarCheckedList, { calendarId }]);
  // remove({ calendarId });
  // };

  // const [calenderListArr, setCalenderListArr] = useState([]);
  // const remove = ({ calendarId }) => {
  // const newName = calenderListArr.filter(
  // item => item.calendarId !== calendarId,
  // );
  // setCalendarCheckedList(newName);
  // console.log("뭐지?", newName);
  // };

  // console.log("빠졌나?:", calenderListArr);

  // console.log("calendarCheckedList 체크 : ", calendarCheckedList);

  return (
    <CalenderStyle>
      <div className="App">
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            // start: "prev,title,title,next",
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
          // titleFormat={{
          //   year: "numeric",
          //   month: "numeric",
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
          // events={[calenderArr()]}
          // eventTextColor="black" // 이벤트 글자 색
          eventborderColor="none" // 이벤트 글자 색
          dayMaxEvents={true}
          aspectRatio={1.35}
          // events={
          //   [
          // { title: calenderArr[0].title, date: calenderArr[0].createdAt },
          // {
          //   title: calenderArr[1].title,
          //   date: "2024-06-17",
          //   textColor: "#000000",
          // },
          // {
          //   title: calenderArr[2].title,
          //   start: "2024-06-17",
          //   end: "2024-06-17",
          //   textColor: "#000000",
          // },
          // { title: "event 1", date: "2024-06-01" },
          // { title: "event 2", date: "2024-06-02", backgroundColor: "red" },
          // {
          //   title: "event 3",
          //   start: "2024-06-02",
          //   end: "2024-06-05",
          //   // date: "2024-06-02",
          //   backgroundColor: "red",
          //   borderColor: "red",
          //   textColor: "#000000",
          // },
          // {
          //   title: "event 4",
          //   start: "2024-06-10",
          //   end: "2024-06-18",
          //   // date: "2024-06-02",
          //   backgroundColor: "#ABD5BD",
          //   borderColor: "#ABD5BD",
          //   textColor: "#000000",
          // },
          //   ]
          // }

          events={array}
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
          editable={true}
          // dateClick={handleEventClick}
          eventClick={insertModalOpen}
        />
      </div>
    </CalenderStyle>
  );
};

export default MainCalender;
