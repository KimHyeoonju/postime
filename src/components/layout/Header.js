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
      border: 1px solid #7f85a4;
    }
  }
`;
const ListIconStyle = styled.li`
  cursor: pointer;
`;
const Header = ({ todoListhandleButtonClick, setSearchTextIndex }) => {
  const moreMenu = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const handleMoreView = () => {
    if (toggle) {
      moreMenu.current.classList.remove("header-more-open");
      setToggle(false);
    } else {
      moreMenu.current.classList.add("header-more-open");
      setToggle(true);
    }
  };

  const searchBt = () => {
    console.log(searchText);
    setSearchTextIndex(searchText);
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
};

export default Header;
