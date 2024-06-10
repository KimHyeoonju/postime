import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";

const AlarmModalStyle = styled.div`
  .container {
    width: 300px;
    height: 200px;

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
  .close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;

const ShowAlarmModal = ({ setModalOpen, id, title, content, writer }) => {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  // useRef()를 사용하여 modalRef 생성
  const modalRef = useRef(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = event => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
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
  }, [setModalOpen]);

  return (
    <AlarmModalStyle>
      {/* modalRef를 ref로 할당 */}
      <div ref={modalRef} className="container">
        <button className="close" onClick={closeModal}>
          X
        </button>
        <p>모달창입니다.</p>
      </div>
    </AlarmModalStyle>
  );
};

export default ShowAlarmModal;
