import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import { colorSystem } from "../../css/color";
import "./alarmmodalstyle.css";

const AlarmModalStyle = styled.div`
  .alarm-modal-content {
    border: 1px solid ${colorSystem.g800};
  }

  .alarm-item {
    background-color: ${colorSystem.newAlarmC};
    border-bottom: 1px solid ${colorSystem.g800};
  }

  .alarm-item:last-child {
    border: 0px;
  }
  .alarm-contents {
    color: ${colorSystem.g300};
  }

  .alarm-time {
    color: ${colorSystem.g600};
  }

  .alarm-none-msg {
    background-color: ${colorSystem.newAlarmC};
    color: ${colorSystem.g600};
  }
`;

const AlarmModal = ({ alarmModalCancel, isNewAlarm, alarmListArr }) => {
  // useRef()를 사용하여 modalRef 생성
  const modalRef = useRef(null);

  // console.log(isNewAlarm);
  // console.log(alarmListArr);
  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = event => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        alarmModalCancel(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  }, [alarmModalCancel]);

  return (
    <AlarmModalStyle>
      <div ref={modalRef} className="alarm-modal-wrap">
        <div className="alarm-modal-content">
          <main>
            {isNewAlarm ? (
              alarmListArr.map((item, index) => {
                return (
                  <div className="alarm-item" key={index}>
                    <span className="alarm-contents">{item.content}</span>
                    <span className="alarm-time">{item.createdAt}</span>
                  </div>
                );
              })
            ) : (
              // 알람이 없는 경우
              <div className="alarm-item-none">
                <div className="alarm-none-msg">새로운 알림이 없습니다.</div>
              </div>
            )}

            {/* <div className="alarm-item">
              <span className="alarm-contents">새로운 댓글이 추가됨</span>
              <span className="alarm-time">06/30 18:14</span>
            </div> */}
            {/* <div className="alarm-item">
              <span className="alarm-contents">새로운 일정이 추가됨</span>
              <span className="alarm-time">06/30 18:14</span>
            </div> */}
            {/* <div className="alarm-item">
              <span className="alarm-contents">새로운 일정이 추가됨</span>
              <span className="alarm-time">1년 전</span>
            </div> */}
            {/* <div className="alarm-item">
              <span className="alarm-contents">새로운 일정이 추가됨</span>
              <span className="alarm-time">5년 전</span>
            </div> */}
          </main>
        </div>
      </div>
    </AlarmModalStyle>
  );
};

export default AlarmModal;
