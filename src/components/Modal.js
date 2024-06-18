import styled from "@emotion/styled";
import Button from "./Button";

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
  max-width: 400px;
  min-height: 250px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
`;
const ModalHeaderStyle = styled.div`
  margin-top: 20px;
  text-align: center;
  h1 {
    font-weight: 800;
    font-size: 24px;
    padding: 30px 0;
  }
`;

const ModalMainStyle = styled.div`
  margin-bottom: 30px;
  padding: 0 60px;
  line-height: 2;
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
  onDetail,
  stateList,
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
          <p>
            {message}
            <button onClick={onDetail}>상세보기</button>
          </p>
        </ModalMainStyle>
        <ModalFooterStyle>
          {stateList === 1 ? (
            <>
              <Button onClick={onConfirm} label="완료하기" />
              <Button onClick={onClose} label="취소" />
            </>
          ) : (
            <>
              <Button onClick={onConfirm} label="복원하기" />
              <Button onClick={onClose} label="취소" />
            </>
          )}
        </ModalFooterStyle>
      </ModalInnerStyle>
    </ModalWrapStyle>
  );
};

export default Modal;
