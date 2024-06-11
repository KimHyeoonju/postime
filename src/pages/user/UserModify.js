import { useEffect, useState } from "react";
import "../../css/userinfo.css";
import axios from "axios";

const UserModify = () => {
  // 입력할 항목 변수
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userNewPass, setUserNewPass] = useState("");
  const [userNewPass2, setUserNewPass2] = useState("");
  // 비밀번호 및 비밀번호 확인 일치 여부 플래그
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  // 비밀번호 형식이 맞는지 아닌지
  const [passwordCheck, setPassWordCheck] = useState(true);

  // 이메일 중복 확인 버튼
  const emailDoubleCheck = async event => {
    event.preventDefault();
    const reqData = {
      email: userEmail,
    };
    const result = await postUserEmail(reqData);
    console.log(result);
    if (result.statusCode !== 2) {
      alert(result.resultMsg);

      return;
    }
    alert("사용 가능한 이메일입니다.");
  };

  const postUserEmail = async ({ email }) => {
    try {
      const response = await axios.get("/api/user/checkuser", {
        params: { email },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  };

  // 비밀번호 항목
  const handlePassWord = e => {
    setUserNewPass(e.target.value);
  };
  useEffect(() => {
    chkPW();
  }, [passwordCheck, userPass]);

  // 비밀번호 문자열 검사
  function chkPW() {
    var pw = userNewPass;
    var num = pw.search(/[0-9]/g);
    var eng = pw.search(/[a-z]/gi);
    var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 8 || pw.length > 20) {
      // alert("8자리 ~ 20자리 이내로 입력해주세요.");
      setPassWordCheck(false);
    } else if (pw.search(/\s/) != -1) {
      // alert("비밀번호는 공백 없이 입력해주세요.");
      setPassWordCheck(false);
    } else if (num < 0 || eng < 0 || spe < 0) {
      // alert("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
      setPassWordCheck(false);
    } else {
      setPassWordCheck(true);
    }
  }
  useEffect(() => {
    chkPW();
  }, [userNewPass]);

  // 패스워드가 같은지 다른지 감시
  useEffect(() => {
    if (userNewPass === userNewPass2) {
      setPasswordMatchError(true);
      // return;
    } else {
      setPasswordMatchError(false);
      // console.log("비밀번호가 일치하지 않습니다.");
    }
  }, [userNewPass, userNewPass2]);

  // useEffect(() => {
  //   return () => {};
  // }, []);
  return (
    <div className="user-wrap">
      <div className="user-title-line">
        <h1>회원정보 수정</h1>
      </div>

      <div className="usermodify-input">
        <div className="usermodify-input-name">
          <label htmlFor="name">성명</label>
          <div className="user-content">
            <span>성명</span>
          </div>
        </div>

        <div className="usermodify-input-email">
          <div className="label-field">
            <label htmlFor="email">이메일</label>
          </div>

          <div className="check-field">
            <input
              type="email"
              id="userEmail"
              value={userEmail}
              onChange={event => {
                setUserEmail(event.target.value);
              }}
              className="email"
              placeholder="이메일"
            />
            <div className="result-icon"></div>
          </div>

          <button
            type="button"
            className="double-check"
            onClick={event => {
              emailDoubleCheck(event);
            }}
          >
            <span>중복확인</span>
          </button>
        </div>

        <div className="usermodify-input-pw">
          <label htmlFor="pwnow">비밀번호 입력</label>
          <div className="check-field">
            <input
              type="password"
              className="pwnow"
              placeholder="기존 비밀번호 입력"
            />
            <div className="result-icon"></div>
          </div>
        </div>

        <div className="usermodify-input-pwchange">
          <label htmlFor="pw">비밀번호 변경</label>
          <div className="check-field">
            <input
              type="password"
              id="userNewPass"
              value={userNewPass}
              onChange={event => {
                handlePassWord(event);
              }}
              className="pw"
              placeholder="(영문 대/소문자, 숫자, 특수문자 포함 8~20자)"
            />
            {passwordCheck ? (
              <div className="result-icon-yes"></div>
            ) : (
              <div className="result-icon-no"></div>
            )}
          </div>
        </div>

        <div className="usermodify-input-pwcheck">
          <label htmlFor="pwcheck">비밀번호 확인</label>
          <div className="check-field">
            <input
              type="password"
              id="userNewPass2"
              value={userNewPass2}
              onChange={event => {
                setUserNewPass2(event.target.value);
              }}
              className="pwcheck"
              placeholder="비밀번호 재입력"
            />
            {passwordMatchError ? (
              <div className="result-icon-yes"></div>
            ) : (
              <div className="result-icon-no"></div>
            )}
          </div>
        </div>
      </div>
      <button type="submit" className="user-button">
        <span>수정하기</span>
      </button>
    </div>
  );
};

export default UserModify;
