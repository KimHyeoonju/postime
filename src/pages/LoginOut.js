import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./user/LoginPage";
import SearchIdPage from "./user/SearchIdPage";
import SearchPwPage from "./user/SearchPwPage";
import SignUpPage from "./user/SignUpPage";

import { common } from "../css/common.css";
import "../css/header.css";
import "../css/logincopy.css";

const LoginOut = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage></LoginPage>}></Route>
        <Route path="/searchid" element={<SearchIdPage></SearchIdPage>}></Route>
        <Route path="/searchpw" element={<SearchPwPage></SearchPwPage>}></Route>
        <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default LoginOut;
