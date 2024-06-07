/* eslint-disable react/no-unknown-property */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Route, Routes } from "react-router-dom";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import TodoList from "../components/layout/TodoList";
import Create from "../pages/write/Create";
import Complete from "./Complete";
import Delete from "./Delete";
import Search from "./Search";
import MainCalender from "./home/MainCalender";
import UserInfoPage from "./user/UserInfoPage";
import UserModify from "./user/UserModify";
import Detail from "./write/Detail";
import Modify from "./write/Modify";
// import "../css/common.css";

// const globalStyles = css`
//   @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap");

//   * {
//     margin: 0px;
//     padding: 0px;
//     box-sizing: border-box;
//     font-family: "Noto Sans KR", sans-serif;
//     font-optical-sizing: auto;
//     font-weight: 400;
//     font-style: normal;
//   }
//   a {
//     text-decoration: none;
//     color: #000000;
//   }

//   body {
//     color: rgb(32, 32, 32);
//     overflow-wrap: break-word;
//     background-color: rgb(247, 247, 247);
//   }

//   .br-12 {
//     border-radius: 12px;
//   }

//   .ns-font-17 {
//     /* font-family: 추가; */
//     font-size: 17px;
//   }

//   .ns-font-bold-17 {
//     /* font-family: 추가; */
//     font-size: 17px;
//     font-weight: bold;
//   }

//   .ns-font-bold-20 {
//     /* font-family: 추가; */
//     font-size: 20px;
//     font-weight: bold;
//   }
// `;

const WrapStyle = styled.div`
  position: absolute;
  display: flex;
  min-width: 100%;
  min-height: 100%;
  height: 100%;
`;

const MainStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;

const SectionStyle = styled.div`
  width: 100%;
`;

// "/write" 경로의 하위 라우트들을 포함한 컴포넌트
const WriteRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Create />} />
      <Route path="create" element={<Create />} />
      <Route path="detail" element={<Detail />} />
      <Route path="modify" element={<Modify />} />
    </Routes>
  );
};

const Index = () => {
  return (
    <>
      <div>
        {/* <div css={globalStyles}> */}
        <WrapStyle>
          <Nav />
          <MainStyle>
            <header>
              <Header />
            </header>
            <div>
              <SectionStyle>
                <Routes>
                  <Route path="/" element={<MainCalender />} />
                  <Route path="/write/*" element={<WriteRoutes />} />
                  <Route path="/complete" element={<Complete />} />
                  <Route path="/delete" element={<Delete />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/userinfo" element={<UserInfoPage />} />
                  <Route path="/usermodify" element={<UserModify />} />
                </Routes>
              </SectionStyle>
              <SectionStyle>
                <TodoList />
              </SectionStyle>
            </div>
          </MainStyle>
        </WrapStyle>
      </div>
    </>
  );
};

export default Index;
