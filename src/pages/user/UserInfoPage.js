import { useEffect, useState } from "react";
import "../../css/userinfo.css";
import { Link } from "react-router-dom";
import UserModify from "./UserModify";

const UserInfoPage = () => {
  useEffect(() => {
    // axios.get 으로 사용자의 정보를 주세요.

    return () => {};
  }, []);
  return (
    <div className="user-wrap">
      <div className="user-title-line">
        <h1>회원정보</h1>
      </div>

      <div className="userinfo-contents">
        <div className="userinfo-name">
          <p>성명</p>
          <div className="user-content">
            <span>성명</span>
          </div>
        </div>
        <div className="userinfo-email">
          <p>이메일</p>
          <div className="user-content">
            <span>postime@time.com</span>
          </div>
        </div>
      </div>
      <button type="submit" className="user-button">
        <Link to="/UserModify">
          <span>회원정보 수정</span>
        </Link>
      </button>
    </div>
  );
};

export default UserInfoPage;
