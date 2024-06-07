import "../../src/css/commonpage.css";
const Delete = () => {
  return (
    <div className="common">
      <div className="common-inner">
        <h1>휴지통/삭제 페이지</h1>
        <div className="common-button">
          <button className="common-button-modify">
            <span>수정</span>
          </button>
          <button className="common-button-delete">
            <span>삭제</span>
          </button>
        </div>
        <div className="common-menu">
          <div className="cmt">
            <span>일정 명</span>
          </div>
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

        <div className="common-list-wrap"></div>
      </div>
    </div>
  );
};

export default Delete;
