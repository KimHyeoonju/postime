import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Nav from "./components/layout/Nav";
import TodoList from "./components/layout/TodoList";
import "./css/common.css";
import "./css/nav.css";
import "./css/reset.css";
import Complete from "./pages/Complete";
import Delete from "./pages/Delete";
import Search from "./pages/Search";
import MainCalender from "./pages/home/MainCalender";
import LoginPage from "./pages/user/LoginPage";
import SearchIdPage from "./pages/user/SearchIdPage";
import SearchPwPage from "./pages/user/SearchPwPage";
import SignUpPage from "./pages/user/SignUpPage";
import UserInfoPage from "./pages/user/UserInfoPage";
import UserModify from "./pages/user/UserModify";
import Create from "./pages/write/Create";
import Detail from "./pages/write/Detail";
import Modify from "./pages/write/Modify";
// import NotFound from "./pages/NotFound";

function App() {
  // 로그인 안된 경우 (로그인, 회원가입, 아이디 찾기, 비밀번호 찾기, 404 페이지만)
  // const [isLogin, setIsLogin] = useState(false);
  // 로그인이 된 경우
  const [isLogin, setIsLogin] = useState(true);

  return (
    <BrowserRouter>
      {isLogin ? (
        // 로그인이 되어 있을 때
        <div className="wrap">
          <nav>
            <Nav></Nav>
          </nav>
          <main>
            <header>
              <Header></Header>
            </header>
            <div>
              <section>
                <Routes>
                  <Route
                    path="/"
                    element={<MainCalender></MainCalender>}
                  ></Route>

                  {/* 상세, 수정 페이지는 값을 받아와야하지만 일단 페이지 작성을 위해 그대로 작업 */}
                  <Route path="/write">
                    <Route path="create" element={<Create></Create>}></Route>
                    <Route path="detail" element={<Detail></Detail>}></Route>
                    <Route path="modify" element={<Modify></Modify>}></Route>
                  </Route>

                  {/* 값을 받아와야하지만 일단 페이지 작성을 위해 그대로 작업 */}
                  <Route
                    path="/complete"
                    element={<Complete></Complete>}
                  ></Route>
                  <Route path="delete" element={<Delete></Delete>}></Route>
                  <Route path="search" element={<Search></Search>}></Route>

                  {/* userinfo와 usermodify 는 주소로 진입 금지. 페이지 작성을 위해 일단 다른 페이지와 동일하게 작성 나중에 이동 방식 수정*/}
                  <Route
                    path="/userinfo"
                    element={<UserInfoPage></UserInfoPage>}
                  ></Route>
                  <Route
                    path="/usermodify"
                    element={<UserModify></UserModify>}
                  ></Route>
                </Routes>
              </section>
              <section>
                <TodoList></TodoList>
              </section>
            </div>
          </main>
        </div>
      ) : (
        // 로그인이 되어 있지 않을 때
        <Routes>
          <Route path="/" element={<LoginPage></LoginPage>}></Route>
          <Route
            path="/searchid"
            element={<SearchIdPage></SearchIdPage>}
          ></Route>
          <Route
            path="/searchpw"
            element={<SearchPwPage></SearchPwPage>}
          ></Route>
          <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
        </Routes>
      )}

      {/* <Routes> */}
      {/* 잘못된 경로 */}
      {/* <Route path="*" element={<NotFound />}></Route> */}
      {/* </Routes> */}
    </BrowserRouter>
  );
}

export default App;
