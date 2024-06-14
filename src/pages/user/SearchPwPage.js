import { useEffect, useState } from "react";
import "../../css/userstyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getResetPwd } from "../../apis/user/apiuser";
import UserModal from "../../components/modal/UserModal";

const SearchPwPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [sendChecked, setSendChecked] = useState(false);
  // 모달 추가
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalTitle, setUserModalTitle] = useState("");
  const [userModalMessage, setUserModalMessage] = useState("");
  const [userModalOnConfirm, setUserModalOnConfirm] = useState(() => () => {});
  // 코드 발송 버튼
  const sendCode = async event => {
    event.preventDefault();
    const requestData = {
      id: userId,
      email: userEmail,
    };

    const result = await getUser(requestData);
    console.log(result);
    if (result.statusCode !== 2) {
      setUserModalMessage(result.resultMsg);
      setUserModalOnConfirm(() => () => setUserModalOpen(false));
      setUserModalOpen(true);
      return;
    }
    setUserModalMessage(result.resultData);
    setUserModalOnConfirm(() => () => {
      setUserModalOpen(false);
      navigate("/");
    });
    setUserModalOpen(true);
  };

  const searchPw = async event => {
    event.preventDefault();

    if (userId === "") {
      setUserModalTitle("경고");
      setUserModalMessage("아이디를 입력하세요.");
      setUserModalOnConfirm(() => () => setUserModalOpen(false));
      setUserModalOpen(true);
      return;
    }

    if (userEmail === "") {
      setUserModalTitle("경고");
      setUserModalMessage("이메일을 입력하세요.");
      setUserModalOnConfirm(() => () => setUserModalOpen(false));
      setUserModalOpen(true);
      return;
    }
    setSendChecked(true);
    // 코드 발송 안 했을 때
    if (!sendChecked) {
      setUserModalOpen(true);
      setUserModalTitle("경고");
      setUserModalMessage("코드 발송을 해 주세요.");
      setUserModalOnConfirm(() => () => setUserModalOpen(false));
      return;
    }
  };

  const getUser = async ({ id, email }) => {
    try {
      const response = await axios.get("/api/user/resetpwd", {
        params: { id, email },
      });
      console.log(response.data);
      return response.data;
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
        <h1>비밀번호 찾기</h1>
      </div>

      <div className="search-input">
        <div className="searchpw-input-id">
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={event => {
              setUserId(event.target.value);
            }}
            className="id"
            placeholder="아이디 입력"
          />
        </div>
        <div className="searchpw-input-email">
          <label htmlFor="email" className="email-label">
            이메일
          </label>
          <input
            type="email"
            id="userEmail"
            value={userEmail}
            onChange={event => {
              setUserEmail(event.target.value);
            }}
            className="email"
            placeholder="이메일 입력"
          />
          <br />
          <button
            type="submit"
            className="send-code"
            onClick={event => {
              sendCode(event);
            }}
          >
            <span>코드발송</span>
          </button>
        </div>
        <div className="searchpw-input-code">
          <label htmlFor="code">코드 입력</label>
          <input
            type="text"
            className="code"
            placeholder="이메일로 전송받은 코드 8자리 입력"
          />
        </div>
      </div>
      <button type="button" className="user-button" onClick={searchPw}>
        <span>비밀번호 찾기</span>
      </button>
      {/* 모달 관련 */}
      <UserModal
        isOpen={userModalOpen}
        title={userModalTitle}
        message={userModalMessage}
        onConfirm={userModalOnConfirm}
        buttonComment={"로그인"}
      />
    </div>
  );
};

export default SearchPwPage;
