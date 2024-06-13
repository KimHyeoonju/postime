import styled from "@emotion/styled";

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
  .closeBt {
    margin-right: 50px;
  }
`;

const Modal = ({ isOpen, title, message, onClose, onConfirm }) => {
  if (!isOpen) return null;

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
          <button className="closeBt" onClick={onClose}>
            취소
          </button>
          <button className="confirmBt" onClick={onConfirm}>
            확인
          </button>
        </ModalFooterStyle>
      </ModalInnerStyle>
    </ModalWrapStyle>
  );
};

export default Modal;
