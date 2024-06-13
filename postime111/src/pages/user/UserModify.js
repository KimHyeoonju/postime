import { useEffect, useState } from "react";
import "../../css/userinfo.css";
import axios from "axios";
import UserModal from "../../components/UserModal";
import { useNavigate } from "react-router-dom";

const UserModify = () => {
  // 입력할 항목 변수
  const [userEmail, setUserEmail] = useState("aaa@aaa.net");
  const [userEmailActive, setUserEmailActive] = useState(true);
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

  // // 이메일 중복 확인 버튼
  // const emailDoubleCheck = async event => {
  //   event.preventDefault();
  //   const reqData = {
  //     email: userEmail,
  //   };
  //   const result = await postUserEmail(reqData);
  //   console.log(result);
  //   if (result.statusCode !== 2) {
  //     alert(result.resultMsg);

  //     return;
  //   }
  //   alert("사용 가능한 이메일입니다.");
  // };

  // const postUserEmail = async ({ email }) => {
  //   try {
  //     const response = await axios.get("/api/user/checkuser", {
  //       params: { email },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     return error;
  //   }
  // };

  // 이메일-수정 버튼
  function userEmailModify(event) {
    // 입력 가능하도록 변경
    setUserEmailActive(false);
  }

  // 페이지 이동 함수
  const navigate = useNavigate();

  // 비밀번호-수정하기 클릭시
  function userPwModify() {
    const newUrl = "/userpw";
    navigate(newUrl);
  }

  // 뒤로가기 버튼 클릭시 실행
  const modifyMember = async event => {
    event.preventDefault();
    navigate("/");

    // chkPW();
    // if (!passwordCheck) {
    //   setUserModalOpen(true);
    //   setUserModalTitle("경고");
    //   setUserModalMessage("비밀번호 형식에 맞게 작성해 주세요.");
    //   setUserModalOnConfirm(() => () => setUserModalOpen(false));
    //   return;
    // }
    // if (userNewPass !== userNewPass2) {
    //   setUserModalOpen(true);
    //   setUserModalTitle("경고");
    //   setUserModalMessage("비밀번호가 일치하지 않습니다.");
    //   setUserModalOnConfirm(() => () => setUserModalOpen(false));
    //   return;
    // }
  };

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
            <button
              type="button"
              className="modify-button"
              onClick={event => {
                userEmailModify(event);
              }}
            >
              <span>수정</span>
            </button>
          </div>

          <div className="check-field">
            {/* <input
              type="email"
              id="userEmail"
              value={userEmail}
              onChange={event => {
                setUserEmail(event.target.value);
              }}
              className="email"
              placeholder="이메일"
            /> */}
            <div className="user-content">
              <input
                type="email"
                placeholder="이메일"
                value={userEmail}
                readOnly={userEmailActive}
                onChange={e => {
                  setUserEmail(e.target.value);
                }}
                style={{
                  backgroundColor: userEmailActive ? "#7f85a4" : "none",
                }}
              />
            </div>
          </div>
        </div>

        <div className="usermodify-input-pw">
          <div className="label-field">
            <label htmlFor="pwnow">비밀번호</label>
            <button
              type="button"
              className="modify-button"
              onClick={event => {
                userPwModify(event);
              }}
            >
              <span>수정</span>
            </button>
          </div>
          <div className="check-field">
            {/* <input
              type="password"
              className="pwnow"
              placeholder="현재 비밀번호 입력"
            /> */}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="user-button"
        onClick={event => {
          modifyMember(event);
        }}
      >
        <span>돌아가기</span>
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

export default UserModify;
