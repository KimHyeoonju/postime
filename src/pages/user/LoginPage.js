import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/login.css";
import axios from "axios";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";

const LoginPage = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");
  const { isModalOpen, modalMessage, openModal, closeModal } = useModal();

  const handleSubmit = async e => {
    // 새로고침 막기
    e.preventDefault();

    const result = await postSignIn({ userId, userPass });
    if (result.statusCode !== 2) {
      modalMessage(result.resultMsg);
      openModal();
      return;
    }
    // 로그인 상태로 변경
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
      return error;
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
          className="login-button"
          onClick={event => {
            handleSubmit(event);
          }}
        >
          <span>로그인</span>
        </button>
        {/* 모달 관련 */}
        <Modal
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={closeModal}
        />
      </form>
    </div>
  );
};

export default LoginPage;
