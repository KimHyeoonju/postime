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
import "../css/common.css";
import { useEffect, useState } from "react";
import { colorSystem } from "../css/color";
import UserPwPage from "./user/UserPwPage";

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
  position: absolute;
  width: 100%;
  height: 100%;
`;

const SectionListStyle = styled.div`
  position: relative;
  /* display: flex; */
  width: 100%;
  height: 100%;
  background-color: ${colorSystem.primaryW};
`;

const TodoListStyle = styled.div`
  position: absolute;
  right: 0;
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

// 회원정보 페이지 성명/이메일
const resultData = { name: "userName", email: "userEmail" };

const Index = ({ isLogin, signUserId, setIsLogin, userInfo }) => {
  // console.log(userInfo);

  const [rememberPass, setRememberUserPass] = useState("");

  useEffect(() => {
    console.log("INDEX.js rememberPass : ", rememberPass);
  }, [rememberPass]);

  // 캘린더 아이디 관련
  const [nowCalendarId, setNowCalendarId] = useState(null);
  // 캘린더 갱신에 대해서
  const [nowCalendarUpdate, setNowCalendarUpdate] = useState(false);
  // 체크박스가 활성화 되어 있는 캘린더ID 리스트
  const [checkedCalendarIds, setcheckedCalendarIds] = useState([]);

  useEffect(() => {
    console.log("nowCalendarId : ", nowCalendarId);
  }, [nowCalendarId]);

  useEffect(() => {
    console.log("nowCalendarUpdate : ", nowCalendarUpdate);
  }, [nowCalendarUpdate]);

  useEffect(() => {
    console.log("checkedCalendarIds : ", checkedCalendarIds);
  }, [checkedCalendarIds]);

  // useEffect(() => {
  //   console.log("checkCalendarColorChange : ", checkCalendarColorChange);
  // }, [checkCalendarColorChange]);

  // 검색어 관련
  const [searchTextIndex, setSearchTextIndex] = useState("");

  const [todoListClassAdded, setTodoListClassAdded] = useState(false);

  // todoList 메뉴 여닫는 버튼 체크
  const todoListhandleButtonClick = () => {
    // 클래스를 추가할 요소의 상태를 변경합니다.
    setTodoListClassAdded(!todoListClassAdded);
  };

  return (
    <>
      <div>
        <WrapStyle>
          <Nav
            setNowCalendarId={setNowCalendarId}
            setNowCalendarUpdate={setNowCalendarUpdate}
            setcheckedCalendarIds={setcheckedCalendarIds}
          />
          <MainStyle>
            <header>
              <Header
                userInfo={userInfo}
                todoListhandleButtonClick={todoListhandleButtonClick}
                setSearchTextIndex={setSearchTextIndex}
              />
            </header>
            <SectionListStyle>
              <SectionStyle>
                <TodoListStyle>
                  <TodoList
                    todoListClassAdded={todoListClassAdded}
                    onTodoListToggle={todoListhandleButtonClick}
                    todoListClose={todoListhandleButtonClick}
                  />
                </TodoListStyle>
              </SectionStyle>
              <SectionStyle>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <MainCalender
                        nowCalendarId={nowCalendarId}
                        checkedCalendarIds={checkedCalendarIds}
                        nowCalendarUpdate={nowCalendarUpdate}
                        setNowCalendarUpdate={setNowCalendarUpdate}
                      />
                    }
                  />
                  <Route
                    path="/write/*"
                    element={<WriteRoutes />}
                    todoListClassAdded={todoListClassAdded}
                    onTodoListToggle={todoListhandleButtonClick}
                  />
                  <Route path="/complete" element={<Complete />} />
                  <Route path="/delete" element={<Delete />} />
                  <Route
                    path="/search"
                    element={
                      <Search
                        searchTextIndex={searchTextIndex}
                        userInfo={userInfo}
                      />
                    }
                  />
                  <Route
                    path="/userinfo"
                    element={
                      <UserInfoPage
                        signUserId={signUserId}
                        userInfo={userInfo}
                        setRememberUserPass={setRememberUserPass}
                      />
                    }
                  />
                  <Route
                    path="/usermodify"
                    element={
                      <UserModify
                        signUserId={signUserId}
                        userInfo={userInfo}
                        rememberPass={rememberPass}
                      />
                    }
                  />
                  <Route
                    path="/userpw"
                    element={
                      <UserPwPage signUserId={signUserId} userInfo={userInfo} />
                    }
                  />
                </Routes>
              </SectionStyle>
            </SectionListStyle>
          </MainStyle>
        </WrapStyle>
      </div>
    </>
  );
};

export default Index;
