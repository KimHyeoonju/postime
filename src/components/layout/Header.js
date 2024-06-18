import { useEffect, useRef, useState } from "react";
import "../../css/header.css";
import styled from "@emotion/styled";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SearchButtonStyle = styled.button`
  border: 0;
  background-color: transparent;

  > svg {
    margin-top: 10px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    &:hover {
      border: 1px solid #4f546e;
      border-radius: 10px;
    }
  }
`;
const ListIconStyle = styled.li`
  cursor: pointer;
  &:hover {
    border: 1px solid #4f546e;
    border-radius: 10px;
  }
`;
const Header = ({
  userInfo,
  todoListhandleButtonClick,
  setSearchTextIndex,
}) => {
  const moreMenu = useRef(null);
  const searchAction = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const handleKeyUp = e => {
  //     if (e.key === "Enter") {
  //       searchAction.current.click();
  //     }
  //   };
  //   window.addEventListener("keyup", handleKeyUp);
  //   return () => {
  //     window.removeEventListener("keyup", handleKeyUp);
  //   };
  // }, []);

  // 로그아웃, 마이페이지 활성화/비활성화
  const handleMoreView = () => {
    if (toggle) {
      moreMenu.current.classList.remove("header-more-open");
      setToggle(false);
    } else {
      moreMenu.current.classList.add("header-more-open");
      setToggle(true);
    }
  };

  // 검색 버튼
  const searchBt = () => {
    console.log("검색버튼 눌렀어요", searchText);
    setSearchTextIndex(searchText);
    setSearchText("");
    navigate("/search");
  };

  // 마이페이지로 이동
  const moveUserInfo = () => {
    navigate("/userinfo");
  };

  // 로그아웃
  const handleLogout = () => {
    // 세션 스토리지 비우기
    sessionStorage.clear();
    navigate("/");

    window.location.reload();
  };

  return (
    <div className="header">
      <div className="header-inner">
        <ul className="header-list">
          <li className="header-user-name">
            {userInfo.name} 님
            <SearchButtonStyle
              onClick={() => {
                handleMoreView();
              }}
            >
              <MdKeyboardArrowDown />
            </SearchButtonStyle>
          </li>
          <li className="search-box">
            <input
              className="search-text"
              value={searchText}
              onChange={e => {
                // console.log(e.target.value);
                setSearchText(e.target.value);
              }}
              type="text"
              autoComplete="off"
            />
          </li>
          <ListIconStyle
            className="header-search"
            ref={searchAction}
            onClick={() => {
              searchBt();
            }}
          ></ListIconStyle>
          <ListIconStyle
            className="header-menu"
            onClick={todoListhandleButtonClick}
          ></ListIconStyle>
        </ul>
        <div className="header-more" ref={moreMenu}>
          <div className="header-my" onClick={moveUserInfo}>
            마이페이지
          </div>
          <div className="header-logout" onClick={handleLogout}>
            로그아웃
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
