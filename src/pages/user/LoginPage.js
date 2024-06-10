import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/login.css";
import axios from "axios";

const LoginPage = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");

  const handleSubmit = async e => {
    // 새로고침 막기
    e.preventDefault();

    const result = await postSignIn({ userId, userPass });
    if (result.statusCode !== 2) {
      alert(result.resultMsg);
      return;
    }
    setIsLogin(true);
    navigate("/");
  };

  // 로그인 API
  const postSignIn = async ({ userId, userPass }) => {
    try {
      const response = await axios.post("/api/user/sign-in", {
        id: userId,
        pwd: userPass,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-wrap">
      <form>
        <div className="login-header"></div>
        <div className="login-input">
          <input
            type="text"
            className="id"
            placeholder="아이디"
            onChange={e => setUserId(e.target.value)}
          />
          <br />
          <input
            type="password"
            className="pw"
            placeholder="비밀번호"
            onChange={e => setUserPass(e.target.value)}
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
            handleSubmit(event);
          }}
        >
          <span>로그인</span>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
