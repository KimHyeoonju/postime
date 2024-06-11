import { useEffect, useState } from "react";
import "../../css/userstyle.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchIdPage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const searchId = async event => {
    event.preventDefault();

    if (userName === "") {
      alert("성명을 입력하세요.");
      return;
    }

    if (userEmail === "") {
      alert("이메일을 입력하세요.");
      return;
    }

    const requestData = {
      name: userName,
      email: userEmail,
    };
    const result = await getUser(requestData);
    console.log(result);
    if (result.statusCode !== 2) {
      alert(result.resultMsg);
      return;
    }
    alert("회원가입이 완료되었습니다.");
    navigate("/");
  };

  const getUser = async ({ name, email }) => {
    try {
      const response = await axios.post("/api/user", { name, email });
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
    </div>
  );
};

export default SearchIdPage;
