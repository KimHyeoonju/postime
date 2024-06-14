import { useEffect, useState } from "react";
import "../../css/userinfo.css";
import axios from "axios";
import UserModal from "../../components/modal/UserModal";
import { useNavigate } from "react-router-dom";

// 로그인 안 된 상태
// 로그인 페이지 -> 비밀번호 찾기 페이지 -> (코드 입력 후) 비밀번호 재설정 페이지입니다
const UserNewPwPage = () => {
  const [userPass, setUserPass] = useState("");
  const [userNewPass, setUserNewPass] = useState("");
  const [userNewPass2, setUserNewPass2] = useState("");
  // 비밀번호 및 비밀번호 확인 일치 여부 플래그
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  // 비밀번호 형식
  const [passwordCheck, setPassWordCheck] = useState(true);
  // 모달 추가
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalTitle, setUserModalTitle] = useState(false);
  const [userModalMessage, setUserModalMessage] = useState("");
  const [userModalOnConfirm, setUserModalOnConfirm] = useState(() => () => {});
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
    var engUpper = pw.search(/[A-Z]/g);
    var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 8 || pw.length > 20) {
      // alert("8자리 ~ 20자리 이내로 입력해주세요.");
      setPassWordCheck(false);
    } else if (pw.search(/\s/) != -1) {
      // alert("비밀번호는 공백 없이 입력해주세요.");
      setPassWordCheck(false);
    } else if (num < 0 || eng < 0 || engUpper < 0 || spe < 0) {
      // alert("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
      setPassWordCheck(false);
    } else {
      setPassWordCheck(true);
    }
  }
  useEffect(() => {
    chkPW();
  }, [userNewPass, userNewPass2]);

  // 새 비밀번호와 비밀번호 확인이 일치하는지
  useEffect(() => {
    if (userNewPass === userNewPass2) {
      setPasswordMatchError(true);
      // return;
    } else {
      setPasswordMatchError(false);
      // console.log("비밀번호가 일치하지 않습니다.");
    }
  }, [userNewPass, userNewPass2]);
  const navigate = useNavigate();

  const modifyPw = async event => {
    event.preventDefault();

    chkPW();

    if (!passwordCheck) {
      setUserModalOpen(true);
      setUserModalTitle("경고");
      setUserModalMessage("비밀번호 형식에 맞게 작성해 주세요.");
      setUserModalOnConfirm(() => () => setUserModalOpen(false));
      return;
    }
    if (userNewPass !== userNewPass2) {
      setUserModalOpen(true);
      setUserModalTitle("경고");
      setUserModalMessage("비밀번호가 일치하지 않습니다.");
      setUserModalOnConfirm(() => () => setUserModalOpen(false));
      return;
    }

    // 모달이 안 뜸. navigate를 주석처리 하면 모달이 뜨는데 클릭이 안된다
    setUserModalOpen(true);
    setUserModalTitle("알림");
    setUserModalMessage("비밀번호 변경이 완료되었습니다.");
    setUserModalOnConfirm(() => {
      setUserModalOpen(false);
      navigate("/");
    });
  };

  return (
    <div className="user-wrap">
      <div className="user-title-line">
        <h1>비밀번호 재설정</h1>
      </div>
      <div className="userpwmodify-input">
        <div className="usermodify-input-pwchange">
          <label htmlFor="pw">새 비밀번호</label>
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

            {passwordMatchError ? null : null}
          </div>
        </div>

        <div className="usermodify-input-pwcheck">
          <label htmlFor="pwcheck">새 비밀번호 확인</label>
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

            {passwordMatchError ? null : null}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="user-button"
        onClick={event => {
          modifyPw(event);
        }}
      >
        <span>설정하기</span>
      </button>
      {/* 모달 관련 */}
      <UserModal
        isOpen={userModalOpen}
        title={userModalTitle}
        message={userModalMessage}
        onConfirm={userModalOnConfirm}
        buttonComment={"확인"}
      />
    </div>
  );
};

export default UserNewPwPage;
