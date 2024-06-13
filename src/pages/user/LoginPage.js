import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/login.css";
import axios from "axios";
import { postSignIn } from "../../apis/user/apiuser";
import UserModal from "../../components/UserModal";

const LoginPage = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("mybirth811");
  const [userPass, setUserPass] = useState("Tngus1234^^");
  // 모달 추가
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalTitle, setUserModalTitle] = useState(false);
  const [userModalMessage, setUserModalMessage] = useState("");
  const [userModalOnConfirm, setUserModalOnConfirm] = useState(() => () => {});

  const handleSubmit = async e => {
    // 새로고침 막기
    e.preventDefault();

    // 로그인 API
    const result = await postSignIn({ userId, userPass });
    // console.log(result);
    if (result.statusCode !== 2) {
      setUserModalMessage(result.resultMsg);
      setUserModalOpen(true);
      return;
    }
    // 로그인 상태로 변경
    setIsLogin(true);

    // 로컬 스토리지에 저장
    sessionStorage.setItem("userId", userId);
    // const getUserId = localStorage.getItem("userId");

    // var userArray = [
    //   {
    //     userId: userId,
    //   },
    // ];

    // // sessionStorage에 객체 배열 저장
    // sessionStorage.setItem("userArray", JSON.stringify(userArray));

    // // sessionStorage에서 객체 배열 가져오기
    // var storedUserArray = JSON.parse(sessionStorage.getItem("userArray"));

    // // 가져온 객체 배열 사용 예시
    // console.log(storedUserArray);

    navigate("/");
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
            value={userId}
            onChange={e => setUserId(e.target.value)}
          />
          <br />
          <input
            type="password"
            className="pw"
            placeholder="비밀번호"
            value={userPass}
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
        <UserModal
          isOpen={userModalOpen}
          title={"로그인 실패"}
          message={userModalMessage}
          onConfirm={userModalOnConfirm}
          buttonComment={"확인"}
        />
      </form>
    </div>
  );
};

export default LoginPage;
