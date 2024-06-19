import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/user/LoginPage";
import SearchIdPage from "./pages/user/SearchIdPage";
import SearchPwPage from "./pages/user/SearchPwPage";
import SignUpPage from "./pages/user/SignUpPage";
import UserNewPwPage from "./pages/user/UserNewPwPage";
function App() {
  const userId = sessionStorage.getItem("userId");
  const userEmail = sessionStorage.getItem("email");
  const userName = sessionStorage.getItem("name");

  const [userInfo, setUserInfo] = useState({
    userId: userId,
    email: userEmail,
    name: userName,
  });

  const [rememberId, setRememberId] = useState("");

  // const [isLogin, setIsLogin] = useState(true); /// 로그인이 되어 있는 경우
  const [isLogin, setIsLogin] = useState(false); //  로그인이 되어 있지 않은 경우

  useEffect(() => {
    console.log("나의 정보: ", rememberId);
  }, [rememberId]);

  useEffect(() => {
    const userInfoFromStorage = sessionStorage.getItem("userId");
    if (userInfoFromStorage) {
      // setIsLogin(false); // 로그인 상태 설정
      setIsLogin(true); // 로그인 상태 설정
    }
  }, []);
  return (
    <BrowserRouter>
      {isLogin ? ( // 로그인된 상태인 경우
        <Index userInfo={userInfo} />
      ) : (
        // 로그인되지 않은 상태인 경우
        <Routes>
          <Route
            path="/"
            element={
              <LoginPage setIsLogin={setIsLogin} setUserInfo={setUserInfo} />
            }
          />
          <Route path="/searchid" element={<SearchIdPage />} />
          <Route
            path="/searchpw"
            element={
              <SearchPwPage userInfo={userInfo} setRememberId={setRememberId} />
            }
          />
          <Route
            path="/usernewpw"
            element={
              <UserNewPwPage userInfo={userInfo} rememberId={rememberId} />
            }
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
export default App;
