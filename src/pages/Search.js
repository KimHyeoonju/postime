import { useEffect, useState } from "react";
import { getSearchList, patchCompleteSearchList } from "../apis/etc/apisearch";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";

const Search = ({ searchTextIndex }) => {
  // console.log("Search : ", searchTextIndex);
  // map 돌릴 검색결과 배열 담을곳
  const [serarchList, setSearchList] = useState([]);
  // Madal 컴포넌트에 보낼 state
  const [stateList, setSateList] = useState([]);

  // 모달창 커스텀훅
  const {
    isModalOpen,
    modalTitle,
    modalMessage,
    confirmAction,
    movePageAction,
    openModal,
    closeModal,
  } = useModal();
  // 상세 페이지로 이동시키기
  const navigate = useNavigate();

  useEffect(() => {
    getSearchApi();
  }, [searchTextIndex]);

  const getSearchApi = async () => {
    // console.log("함수실행 확인");
    const result = await getSearchList(searchTextIndex, 8);
    if (result.statusCode !== 2) {
      alert(result.resultMsg);
      return;
    }
    setSearchList(result.resultData);
  };

  const handleDetailPage = (state, boardId, calendarId) => {
    console.log("handleDetailPage 일정클릭 ", state, boardId, calendarId);
    const changeStateOneArr = [{ boardId: boardId, state: 1 }];
    const changeStateTwoArr = [{ boardId: boardId, state: 2 }];
    setSateList(state);
    // console.log(boardId, state);
    if (state === 1) {
      // console.log("상세페이지 모달창");
      openModal({
        title: "[진행중] 일정 클릭 안내",
        message:
          "일정을 완료 하시겠습니까? 일정을 자세히 보려면 상세보기를 클릭하세요.",
        onConfirm: async () => {
          // console.log("progress 1 > 2");
          try {
            await patchCompleteSearchList(changeStateTwoArr);
            await getSearchApi();
            closeModal();
          } catch (error) {
            console.log(error);
          }
        },
        onDetail: () => {
          console.log("페이지이동");
          navigate("/write/detail", {
            state: { boardId: boardId, calendarId: calendarId },
          });
        },
      });
    } else if (state === 2) {
      openModal({
        title: "[완료] 일정 클릭 안내",
        message:
          "일정을 복원하시겠습니까? 일정을 자세히 보려면 상세보기를 클릭하세요.",
        onConfirm: async () => {
          console.log("progress 2>1");
          try {
            await patchCompleteSearchList(changeStateOneArr);
            await getSearchApi();
            closeModal();
          } catch (error) {
            console.log(error);
          }
        },
        onDetail: () => {
          console.log("페이지이동");
          navigate("/write/detail", {
            state: { boardId: boardId, calendarId: calendarId },
          });
        },
      });
    } else if (state === 3) {
      openModal({
        title: "[삭제] 일정 클릭 안내",
        message:
          "일정을 복원하시겠습니까? 일정을 자세히 보려면 상세보기를 클릭하세요.",
        onConfirm: async () => {
          console.log("progress 3>1");
          try {
            await patchCompleteSearchList(changeStateOneArr);
            await getSearchApi();
            closeModal();
          } catch (error) {
            console.log(error);
          }
        },
        onDetail: () => {
          console.log("페이지이동");
          navigate("/write/detail", {
            state: { boardId: boardId, calendarId: calendarId },
          });
        },
      });
    }
  };

  return (
    <div className="common">
      <div className="common-inner">
        <h1 className="common-title">
          {`' ${searchTextIndex} '`} 에 해당하는 검색결과 입니다.
        </h1>
        <div className="common-button"></div>
        <div className="common-menu">
          <div className="com-sizebox"></div>
          <div className="cmt">
            <span>일정 명</span>
          </div>
          <div className="com-sizebox"></div>
          <div className="cmtxt">
            <span> 일정 내용 </span>
          </div>
          <div className="cmdate">
            <span>날짜</span>
          </div>
          <div className="cmcalender">
            <span>캘린더 명</span>
          </div>
        </div>

        <div className="common-list-wrap">
          {serarchList.map((item, index) => (
            <ul
              className="common-list"
              key={index}
              onClick={() => {
                handleDetailPage(item.state, item.boardId, item.calendarId);
              }}
            >
              <li className="checkbox-area">
                {/* {item.state === 1 ? (

                    <div className="com-state">
                      <p className="stateone">진행중</p>
                    </div>
                  ) : item.state === 2 ? (
                    <div className="com-state">
                      <p className="statetwo">완료</p>
                    </div>
                  ) : item.state === 3 ? (
                    <div className="com-state">
                      <p className="statethree">삭제</p>
                    </div>
                  ) : null} */}
              </li>

              <li className="title-area">
                <span className="com-title">{item.title}</span>
              </li>

              <li className="state-area">
                {item.state === 1 ? (
                  <div className="com-state">
                    <p className="stateone">진행중</p>
                  </div>
                ) : item.state === 2 ? (
                  <div className="com-state">
                    <p className="statetwo">완료</p>
                  </div>
                ) : item.state === 3 ? (
                  <div className="com-state">
                    <p className="statethree">삭제</p>
                  </div>
                ) : null}
              </li>

              <li className="text-area">
                <span className="com-text">{item.content}</span>
              </li>
              <li className="date-area">
                <span className="com-date">{item.dDay}</span>
              </li>
              <li className="calender-area">
                <span className="com-calender">{item.calendarName}</span>
              </li>
            </ul>
          ))}
        </div>

        {/* 모달 관련 */}
        <Modal
          isOpen={isModalOpen}
          title={modalTitle}
          message={modalMessage}
          onClose={closeModal}
          onConfirm={confirmAction}
          onDetail={movePageAction}
          stateList={stateList}
        />
      </div>
    </div>
  );
};

export default Search;
