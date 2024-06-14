import styled from "@emotion/styled";
import Button from "./Button";
import { useEffect } from "react";

const ModalWrapStyle = styled.div`
  position: fixed;
  top: 80px;
  left: 300px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalInnerStyle = styled.div`
  position: relative;
  top: 0;
  right: 150px;
  width: 100%;
  max-width: 600px;
  min-height: 400px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
`;
const ModalHeaderStyle = styled.div`
  margin-top: 50px;
  text-align: center;
`;

const ModalMainStyle = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const ModalFooterStyle = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  text-align: center;
`;

const Modal = ({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  stateList,
  onProgress,
}) => {
  if (!isOpen) return null;
  // console.log("stateList", stateList);

  return (
    <ModalWrapStyle>
      <ModalInnerStyle>
        <ModalHeaderStyle>
          <h1>{title}</h1>
        </ModalHeaderStyle>
        <ModalMainStyle>
          <p>{message}</p>
        </ModalMainStyle>
        <ModalFooterStyle>
          {stateList === 1 ? (
            <>
              <Button onClick={onConfirm} label="상세페이지" />
              <Button onClick={onClose} label="취소" />
            </>
          ) : stateList === 2 ? (
            <>
              <Button onClick={onProgress} label="복원" />
              <Button onClick={onClose} label="취소" />
            </>
          ) : stateList === 3 ? (
            <>
              <Button onClick={onProgress} label="복원" />
              <Button onClick={onClose} label="취소" />
            </>
          ) : (
            <>
              <Button onClick={onConfirm} label="확인" />
              <Button onClick={onClose} label="취소" />
            </>
          )}

          {/* <button onClick={onClose}>취소</button>
          <button onClick={onConfirm}>확인</button> */}
        </ModalFooterStyle>
      </ModalInnerStyle>
    </ModalWrapStyle>
  );
};

export default Modal;
