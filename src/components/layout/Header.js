import { useEffect, useRef, useState } from "react";
import "../../css/header.css";
import styled from "@emotion/styled";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SearchButtonStyle = styled.button`
  border: 0;
  background-color: transparent;

  > svg {
    margin-left: 10px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    &:hover {
      border: 1px solid #512772;
    }
  }
`;
const ListIconStyle = styled.li`
  cursor: pointer;
`;
const Header = ({ todoListhandleButtonClick }) => {
  const moreMenu = useRef(null);
  const navigate = useNavigate();
  // const searchBt = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [toggle, setToggle] = useState(false);

  const moreView = () => {
    if (toggle) {
      moreMenu.current.classList.remove("header-more-open");
      setToggle(false);
    } else {
      moreMenu.current.classList.add("header-more-open");
      setToggle(true);
    }
  };

  const todoListView = () => {
    // todoList 클릭 이벤트 처리
    if (todoListhandleButtonClick) {
      todoListhandleButtonClick();
    }
  };

  const searchBt = () => {
    console.log(searchText);
    navigate("/search");
  };

  useEffect(() => {}, []);

  return (
    <div className="header">
      <div className="header-inner">
        <ul className="header-list">
          <li className="header-user-name">
            username
            <SearchButtonStyle
              onClick={() => {
                moreView();
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
          <div className="header-my">마이페이지</div>
          <div className="header-logout">로그아웃</div>
        </div>
      </div>
    </div>
  );

  //여기 확인
  //import styled from "@emotion/styled";
  //import "../../css/header.css";

  // const HeaderStyle = styled.div`
  //   position: relative;
  //   height: 80px;
  //   width: 100%;
  //   background-color: #7f85a4;
  // `;

  // const Header = () => {
  //   return <HeaderStyle>Header</HeaderStyle>;
  // };
};
export default Header;
