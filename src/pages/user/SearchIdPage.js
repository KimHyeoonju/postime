import { useEffect } from "react";
import "../../css/userstyle.css";

const SearchIdPage = () => {
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
          <input type="text" className="name" placeholder="성명" />
        </div>
        <div className="searchid-input-email">
          <label htmlFor="email">이메일</label>
          <input type="email" className="email" placeholder="이메일 입력" />
        </div>
      </div>
      <button type="submit" className="user-button">
        <span>아이디 찾기</span>
      </button>
    </div>
  );
};

export default SearchIdPage;
