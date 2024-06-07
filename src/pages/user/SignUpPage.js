import { useEffect, useState } from "react";
import "../../css/reset.css";
import "../../css/signup.css";
import "../../css/userstyle.css";
import axios from "axios";

const SignUpPage = () => {
  // 입력할 항목 변수
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userPass2, setUserPass2] = useState("");

  // 회원가입시 처리할 함수
  const signupMember = event => {
    event.preventDefault();
    // console.log(userName, userId, userPass);

    const sendData = {
      id: "userId",
      pwd: "userPass",
      name: "userName",
      email: "userEmail",
    };
    postUser(sendData);
  };

  const postUser = async ({ id, pwd, name, email }) => {
    try {
      const response = await axios.post("/api/user", { id, pwd, name, email });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div className="user-wrap">
      <div className="user-title-line">
        <h1>회원가입</h1>
      </div>

      <div className="signup-input">
        <div className="signup-input-name">
          <label htmlFor="name">성명</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={event => {
              setUserName(event.target.value);
            }}
            className="name"
            placeholder="성명"
          />
        </div>

        <div className="signup-input-id">
          <label htmlFor="id">아이디</label>
          <div className="check-field">
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={event => {
                setUserId(event.target.value);
              }}
              className="id"
              placeholder="(영문, 숫자 포함 6~12자)"
            />
            <div className="result-icon"></div>
          </div>
          <button type="button" className="double-check">
            <span>중복확인</span>
          </button>
        </div>

        <div className="signup-input-email">
          <div className="label-field">
            <label htmlFor="email" className="email-label">
              이메일
            </label>
            <div className="bubble">
              <span>이미 존재하는 이메일입니다.</span>
            </div>
          </div>

          <div className="check-field">
            <input
              type="email"
              id="userEmail"
              value={userEmail}
              onChange={event => {
                setUserEmail(event.target.value);
              }}
              className="email"
              placeholder="이메일"
            />
            <div className="result-icon"></div>
          </div>

          <button type="button" className="double-check">
            <span>중복확인</span>
          </button>
        </div>

        <div className="signup-input-pw">
          <div className="label-field">
            <label htmlFor="pw" className="pw-label">
              비밀번호
            </label>
            <div className="bubble">
              <span>잘못된 비밀번호 형식입니다.</span>
            </div>
          </div>

          <div className="check-field">
            <input
              type="password"
              id="userPass"
              value={userPass}
              onChange={event => {
                setUserPass(event.target.value);
              }}
              className="pw"
              placeholder="(영문 대/소문자, 숫자, 특수문자 포함 8~20자)"
            />
            <div className="result-icon"></div>
          </div>
        </div>

        <div className="signup-input-pwcheck">
          <label htmlFor="pwcheck">비밀번호 확인</label>
          <div className="check-field">
            <input
              type="password"
              id="userPass2"
              value={userPass2}
              onChange={event => {
                setUserPass2(event.target.value);
              }}
              className="pwcheck"
              placeholder="비밀번호 재입력"
            />
            <div className="result-icon"></div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="user-button"
        onClick={event => {
          signupMember(event);
        }}
      >
        <span>가입하기</span>
      </button>
    </div>
  );
};

export default SignUpPage;
