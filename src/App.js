import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/user/LoginPage";
import SearchIdPage from "./pages/user/SearchIdPage";
import SearchPwPage from "./pages/user/SearchPwPage";
import SignUpPage from "./pages/user/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";
import Index from "./pages/Index";

sessionStorage.setItem("isDeleteCheckModal", false);

function App() {
  // 원래는 getItem
  // const userName = sessionStorage.setItem("userId", "test1234");
  //const userId = sessionStorage.setItem("userCode", 8);
  // const setIsLogin = sessionStorage.setItem("setIsLogin", true);
  // const userEmail = sessionStorage.setItem("userEmail", "userId");

  const signUserId = sessionStorage.getItem("userId");
  // const [isLogin, setIsLogin] = useState(true); // 로그인이 되어 있는 경우
  const [isLogin, setIsLogin] = useState(false); //  로그인이 되어 있지 않은 경우
  // const [signUserId, setSignUserId] = useState(null);
  console.log("나의 정보: ", signUserId);

  useEffect(() => {}, [signUserId]);
  
  return (
    <BrowserRouter>
      {isLogin ? ( // 로그인된 상태인 경우
        <Index />
      ) : (
        // 로그인되지 않은 상태인 경우
        <Routes>
          <Route path="/" element={<LoginPage setIsLogin={setIsLogin} />} />
          <Route path="/searchid" element={<SearchIdPage />} />
          <Route path="/searchpw" element={<SearchPwPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      )}

      {/* 잘못된 경로 */}
      {/* <Routes> */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
      {/* </Routes> */}
    </BrowserRouter>
  );
}

export default App;
