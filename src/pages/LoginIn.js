import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import MainCalender from "./home/MainCalender";
import Create from "./write/Create";
import Detail from "./write/Detail";
import Modify from "./write/Modify";
import Complete from "./Complete";
import Delete from "./Delete";
import Search from "./Search";
import UserInfoPage from "./user/UserInfoPage";
import UserModify from "./user/UserModify";
import UserPwPage from "./user/UserPwPage";
import TodoList from "../components/layout/TodoList";
import "../css/common.css";
import "../css/header.css";
import "../css/nav.css";
import "../css/reset.css";

const LoginIn = () => {
  return (
    <BrowserRouter>
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
                <Route path="/" element={<MainCalender></MainCalender>}></Route>

                {/* 상세, 수정 페이지는 값을 받아와야하지만 일단 페이지 작성을 위해 그대로 작업 */}
                <Route path="/write">
                  <Route path="create" element={<Create></Create>}></Route>
                  <Route path="detail" element={<Detail></Detail>}></Route>
                  <Route path="modify" element={<Modify></Modify>}></Route>
                </Route>

                {/* 값을 받아와야하지만 일단 페이지 작성을 위해 그대로 작업 */}
                <Route path="/complete" element={<Complete></Complete>}></Route>
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
                <Route
                  path="/userpw"
                  element={<UserPwPage></UserPwPage>}
                ></Route>
              </Routes>
            </section>
            <section>
              <TodoList></TodoList>
            </section>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default LoginIn;
