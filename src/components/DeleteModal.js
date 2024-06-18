import styled from "@emotion/styled";
import { BsExclamationCircle } from "react-icons/bs";
import Button from "./Button";

const DeleteModal = ({ title, text, modalOk, modalCancel }) => {
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
    svg {
      width: 24px;
      height: 24px;
      color: red;
    }
    h1 {
      font-weight: 800;
      font-size: 24px;
      padding: 30px 0;
    }
  `;

  const ModalMainStyle = styled.div`
    margin-bottom: 30px;
    padding: 0 40px;
    margin-bottom: 90px;
    word-break: keep-all;
    line-height: 2;
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
  return (
    <ModalWrapStyle>
      <ModalInnerStyle>
        <ModalHeaderStyle>
          <BsExclamationCircle />
          <h1>{title}</h1>
        </ModalHeaderStyle>
        <ModalMainStyle>
          <p>{text}</p>
        </ModalMainStyle>
        <ModalFooterStyle>
          <Button
            label="영구삭제"
            onClick={() => {
              modalOk();
            }}
          />

          <Button
            label="취소"
            onClick={() => {
              modalCancel();
            }}
          />
        </ModalFooterStyle>
      </ModalInnerStyle>
    </ModalWrapStyle>
  );
};

export default DeleteModal;
