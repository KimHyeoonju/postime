import { useEffect, useRef } from "react";
import "./alarmmodalstyle.css";
import styled from "@emotion/styled";
import { colorSystem } from "../../css/color";

const AlarmModalStyle = styled.div`
  .container {
    /* width: 300px; */
    /* height: 200px; */

    z-index: 999999;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: gray;
    border: 1px solid black;
    border-radius: 8px;
  }

  /* 모달창 내부 X버튼 */
  /* button {
    position: absolute;
    font-size: 20px;
    cursor: pointer;
    color: ${colorSystem.g800};
    right: 10px;
    top: 10px;
    border: 0;
    background-color: transparent;
  } */

  .modal-content {
    border: 1px solid ${colorSystem.g800};
  }
  td {
    height: 100px;
    overflow: hidden;
  }
`;

const AlarmModal = ({ modalCancel }) => {
  // useRef()를 사용하여 modalRef 생성
  const modalRef = useRef(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = event => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        modalCancel(false);
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
  }, [modalCancel]);

  return (
    <AlarmModalStyle>
      <div ref={modalRef} className="modal-wrap">
        <div className="modal-content">
          <main>
            <div>내용</div>
            <div>내용</div>
            <div>내용</div>
            <div>내용</div>
            {/* <button
              onClick={() => {
                modalCancel();
              }}
            >
              x
            </button> */}
          </main>
        </div>
      </div>
    </AlarmModalStyle>
  );
};

export default AlarmModal;
