import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "../../css/login.css";
import axios from "axios";

const LoginPage = () => {
  const [loginId, setLoginId] = useState("아이디");
  const [loginPw, setLoginPw] = useState("");

  const loginMember = async event => {
    event.preventDefault();
    try {
      const response = await axios.post();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div className="user-wrap">
      <form>
        <div className="login-header"></div>
        <div className="login-input">
          <input
            type="text"
            className="id"
            placeholder="아이디"
            onChange={e => setLoginId(e.target.value)}
          />
          <br />
          <input
            type="password"
            className="pw"
            placeholder="비밀번호"
            onChange={e => setLoginPw(e.target.value)}
          />
        </div>
        <div className="login-nav">
          <div className="login-signup">
            <Link to="/signup">회원가입</Link>
          </div>
          <div className="login-search">
            <Link to="/searchid">아이디 찾기 </Link>
            <Link to="/searchpw">
              <b>/</b> 비밀번호 찾기
            </Link>
          </div>
        </div>
        <button
          type="submit"
          className="user-button"
          onClick={event => {
            loginMember(event);
          }}
        >
          <span>로그인</span>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
