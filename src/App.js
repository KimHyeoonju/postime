import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/user/LoginPage";
import SearchIdPage from "./pages/user/SearchIdPage";
import SearchPwPage from "./pages/user/SearchPwPage";
import SignUpPage from "./pages/user/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";
import Index from "./pages/Index";

function App() {
  const [isLogin, setIsLogin] = useState(true); // 로그인이 되어 있는 경우
  // const [isLogin, setIsLogin] = useState(false); // 로그인이 되어 있지 않은 경우

  return (
    <BrowserRouter>
      {isLogin ? ( // 로그인된 상태인 경우
        <Index />
      ) : (
        // 로그인되지 않은 상태인 경우
        <Routes>
          <Route path="/" element={<LoginPage />} />
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
