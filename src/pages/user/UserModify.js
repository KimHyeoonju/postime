import { useEffect } from "react";
import "../../css/userinfo.css";

const UserModify = () => {
  useEffect -
    (() => {
      return () => {};
    },
    []);
  return (
    <div className="user-wrap">
      <div className="user-title-line">
        <h1>회원정보 수정</h1>
      </div>

      <div className="usermodify-input">
        <div className="usermodify-input-name">
          <label htmlFor="name">성명</label>
          <input type="text" className="name" placeholder="성명" />
        </div>

        <div className="usermodify-input-email">
          <div className="label-field">
            <label htmlFor="email">이메일</label>
            <div className="bubble">
              <span>이미 존재하는 이메일입니다.</span>
            </div>
          </div>

          <div className="check-field">
            <input type="email" className="email" placeholder="이메일 입력" />
            <div className="result-icon"></div>
          </div>

          <button type="button" className="double-check">
            <span>중복확인</span>
          </button>
        </div>

        <div className="usermodify-input-pw">
          <label htmlFor="pwnow">비밀번호 입력</label>
          <div className="check-field">
            <input
              type="password"
              className="pwnow"
              placeholder="기존 비밀번호 입력"
            />
            <div className="result-icon"></div>
          </div>
        </div>

        <div className="usermodify-input-pwchange">
          <label htmlFor="pw">비밀번호 변경</label>
          <div className="check-field">
            <input
              type="password"
              className="pw"
              placeholder="(영문 대/소문자, 숫자, 특수문자 포함 8~20자)"
            />
            <div className="result-icon"></div>
          </div>
        </div>

        <div className="usermodify-input-pwcheck">
          <label htmlFor="pwcheck">비밀번호 확인</label>
          <div className="check-field">
            <input
              type="password"
              className="pwcheck"
              placeholder="비밀번호 재입력"
            />
            <div className="result-icon"></div>
          </div>
        </div>
      </div>
      <button type="submit" className="user-button">
        <span>수정하기</span>
      </button>
    </div>
  );
};

export default UserModify;
