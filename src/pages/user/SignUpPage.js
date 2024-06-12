import { useEffect, useState } from "react";
import "../../css/reset.css";
import "../../css/signup.css";
import "../../css/userstyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  // 라우터
  const navigate = useNavigate();

  // 입력할 항목 변수
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userPass2, setUserPass2] = useState("");
  // 비밀번호 및 비밀번호 확인 일치 여부 플래그
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  // 서버에서 결과가 왔는지를 체크
  const [isServer, setIsServer] = useState(false);
  // 중복 확인
  const [idChecked, setIdChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  // 아이디 형식이 맞는지 아닌지
  const [idCheck, setIdCheck] = useState(true);

  const handleUserId = e => {
    setUserId(e.target.value);
  };
  useEffect(() => {
    chkId();
  }, [idCheck, userId]);

  // 아이디 문자열 검사
  function chkId() {
    var id = userId;
    var num = id.search(/[0-9]/g);
    var eng = id.search(/[a-z]/g);
    var kor = id.search(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g);

    if (id.length < 6 || id.length > 12) {
      // alert("8자리 ~ 20자리 이내로 입력해주세요.");
      setIdCheck(false);
    } else if (id.search(/\s/) != -1) {
      // alert("아이디는 공백 없이 입력해주세요.");
      setIdCheck(false);
    } else if (num < 0 || eng < 0 || kor >= 0) {
      // 한글이 포함되면 검사 실패
      // alert("영문, 숫자를 혼합하여 입력해주세요.");
      setIdCheck(false);
    } else {
      setIdCheck(true);
    }
  }

  // 비밀번호 항목
  // 비밀번호 형식이 맞는지 아닌지
  const [passwordCheck, setPassWordCheck] = useState(true);

  const handlePassWord = e => {
    setUserPass(e.target.value);
  };
  useEffect(() => {
    chkPW();
  }, [passwordCheck, userPass]);

  // 비밀번호 문자열 검사
  function chkPW() {
    var pw = userPass;
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

  // 패스워드가 같은지 다른지 감시
  useEffect(() => {
    if (userPass === userPass2) {
      setPasswordMatchError(true);
      return;
    } else {
      setPasswordMatchError(false);
      // console.log("비밀번호가 일치하지 않습니다.");
    }
  }, [userPass, userPass2]);

  // 회원가입시 처리할 함수와 모달
  const signupMember = async event => {
    event.preventDefault();

    if (userName === "") {
      alert("성명을 입력하세요.");
      return;
    }

    if (userId === "") {
      alert("아이디를 입력하세요.");
      return;
    }

    if (userEmail === "") {
      alert("이메일을 입력하세요.");
      return;
    }

    if (userPass === "") {
      alert("비밀번호를 입력하세요.");
      return;
    }

    if (userPass2 === "") {
      alert("비밀번호를 확인하세요.");
      return;
    }

    if (userPass !== userPass2) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 중복 확인 안 했을 때
    if (!idChecked) {
      alert("아이디 중복 확인을 해 주세요.");
      return;
    }

    if (!emailChecked) {
      alert("이메일 중복 확인을 해 주세요.");
      return;
    }

    const requestData = {
      id: userId,
      pwd: userPass,
      name: userName,
      email: userEmail,
    };
    const result = await postUser(requestData);
    console.log(result);
    if (result.statusCode !== 2) {
      alert(result.resultMsg);

      return;
    }
    alert("회원가입이 완료되었습니다.");
    navigate("/");
  };

  // 가입하기
  const postUser = async ({ id, pwd, name, email }) => {
    try {
      const response = await axios.post("/api/user", { id, pwd, name, email });
      return response.data;
    } catch (error) {
      return error;
    }
  };

  // 아이디 중복 확인 버튼
  const idDoubleCheck = async event => {
    event.preventDefault();

    const reqData = {
      id: userId,
    };
    const result = await postUserId(reqData);
    console.log(result);
    if (result.statusCode !== 2) {
      alert(result.resultMsg);

      return;
    }
    alert("사용 가능한 아이디입니다.");
    // 아이디 중복 확인 체크
    setIdChecked(true);
  };

  const postUserId = async ({ id }) => {
    try {
      const response = await axios.get("/api/user/checkuser", {
        params: { id },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  };

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
    // 이메일 중복 확인 체크
    setEmailChecked(true);
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

  return (
    <div className="user-wrap">
      <div className="user-title-line">
        <h1>회원가입</h1>
      </div>

      <div className="signup-input">
        <div className="signup-input-name">
          <label htmlFor="name">성명</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={event => {
              setUserName(event.target.value);
            }}
            className="name"
            placeholder="성명"
          />
        </div>

        <div className="signup-input-id">
          <label htmlFor="id">아이디</label>
          <div className="check-field">
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={event => {
                setUserId(event.target.value);
              }}
              className="id"
              placeholder="(영문, 숫자 포함 6~12자)"
            />
            {idCheck ? (
              <div className="result-icon-yes"></div>
            ) : (
              <div className="result-icon-no"></div>
            )}
          </div>
          <button
            type="button"
            className="double-check"
            onClick={event => {
              idDoubleCheck(event);
            }}
          >
            <span>중복확인</span>
          </button>
        </div>

        <div className="signup-input-email">
          <div className="label-field">
            <label htmlFor="email" className="email-label">
              이메일
            </label>
            {/* <div className="bubble">
              <span>이미 존재하는 이메일입니다.</span>
            </div> */}
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
            <div className="result-icon-no"></div>
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

        <div className="signup-input-pw">
          <div className="label-field">
            <label htmlFor="pw" className="pw-label">
              비밀번호
            </label>
            {/* <div className="bubble">
              <span>잘못된 비밀번호 형식입니다.</span>
            </div> */}
          </div>

          <div className="check-field">
            <input
              type="password"
              id="userPass"
              value={userPass}
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

        <div className="signup-input-pwcheck">
          <label htmlFor="pwcheck">비밀번호 확인</label>
          <div className="check-field">
            <input
              type="password"
              id="userPass2"
              value={userPass2}
              onChange={event => {
                setUserPass2(event.target.value);
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
      <button
        type="submit"
        className="user-button"
        onClick={event => {
          signupMember(event);
        }}
      >
        <span>가입하기</span>
      </button>
      {/* 모달 관련 */}
      {/* <UserModal
        isOpen={userModalOpen}
        title={"아이디 확인"}
        message={userModalMessage}
        onConfirm={userModalOnConfirm}
        buttonComment={"로그인"}
      /> */}
    </div>
  );
};

export default SignUpPage;
