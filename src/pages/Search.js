import { useEffect, useState } from "react";
import { getSearchList } from "../apis/etc/apisearch";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";

const Search = ({ searchTextIndex }) => {
  // console.log("Search : ", searchTextIndex);
  // map 돌릴 검색결과 배열 담을곳
  const [serarchList, setSearchList] = useState([]);
  // 모달창 커스텀훅
  const {
    isModalOpen,
    modalTitle,
    modalMessage,
    confirmAction,
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

  const handleDetailPage = (boardId, state) => {
    // console.log(boardId, state);
    if (state === 1) {
      // console.log("상세페이지 모달창 등장");
      openModal({
        title: "진행중인 일정 클릭 안내",
        message:
          "일정 상세페이지로 이동하시겠습니까? 일단은 완료페이지로갑니다",
        onConfirm: () => {
          closeModal();
          navigate(`/complete`);
          // 상세페이지이동 예시 navigate(`/complete/${boardId}`);
        },
      });
    }
    if (state === 2) {
      openModal({
        title: "완료일정 클릭 안내",
        message: "복원 누르세요 근데 아직 복원버튼이 없으니깐 확인눌러주세요",
        onConfirm: () => {
          console.log("state2완료 확인버튼");
        },
      });
    }
  };

  return (
    <div className="common">
      <div className="common-inner">
        <h1>{`' ${searchTextIndex} '`} 에 해당하는 검색결과 입니다.</h1>
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
                handleDetailPage(item, item.boardId, item.state);
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
        />
      </div>
    </div>
  );
};

export default Search;
