import { useEffect, useState } from "react";
import "../../css/userstyle.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../../components/Modal";
import UserModal from "../../components/modal/UserModal";

const SearchIdPage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  // 모달 추가
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalMessage, setUserModalMessage] = useState("");
  const [userModalOnConfirm, setUserModalOnConfirm] = useState(() => () => {});

  // 아이디 찾기 버튼 클릭시

  const searchId = async event => {
    event.preventDefault();

    if (userName === "") {
      setUserModalMessage("성명을 입력하세요.");
      setUserModalOnConfirm(() => () => setUserModalOpen(false));
      setUserModalOpen(true);
      return;
    }

    if (userEmail === "") {
      setUserModalMessage("이메일을 입력하세요.");
      setUserModalOnConfirm(() => () => setUserModalOpen(false));
      setUserModalOpen(true);
      return;
    }

    const requestData = {
      name: userName,
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

  const getUser = async ({ name, email }) => {
    try {
      const response = await axios.get("/api/user", {
        params: { name, email },
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
        <h1>아이디 찾기</h1>
      </div>

      <div className="search-input">
        <div className="searchid-input-name">
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
        <div className="searchid-input-email">
          <label htmlFor="email">이메일</label>
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
        </div>
      </div>
      <button type="button" className="user-button" onClick={searchId}>
        <span>아이디 찾기</span>
      </button>
      {/* 모달 관련 */}
      <UserModal
        isOpen={userModalOpen}
        title={"아이디 확인"}
        message={userModalMessage}
        onConfirm={userModalOnConfirm}
        buttonComment={"로그인"}
      />
    </div>
  );
};

export default SearchIdPage;
