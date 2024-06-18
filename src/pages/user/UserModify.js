import { useEffect, useState } from "react";
import "../../css/userinfo.css";
import axios from "axios";
import UserModal from "../../components/modal/UserModal";
import { useNavigate } from "react-router-dom";

const UserModify = ({ signUserId, userInfo }) => {
  console.log("회원정보수정의 내 자료: ", userInfo);
  // 입력할 항목 변수
  const [userEmail, setUserEmail] = useState(userInfo?.email || "");
  const [userEmailActive, setUserEmailActive] = useState(true);
  // 이메일-수정 버튼 눌러야 중복확인 가능
  const [isModified, setIsModified] = useState(false);
  // 이메일 중복확인
  const [emailChecked, setEmailChecked] = useState(false);

  const [user, setUser] = useState({
    userId: signUserId?.userId || "",
    userName: signUserId?.userName || "",
    userEmail: signUserId?.userEmail || "",
  });
  const [userPass, setUserPass] = useState("");

  // // 비밀번호 및 비밀번호 확인 일치 여부 플래그
  // const [passwordMatchError, setPasswordMatchError] = useState(false);
  // // 비밀번호 형식
  // const [passwordCheck, setPassWordCheck] = useState(true);
  // 모달 추가
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalTitle, setUserModalTitle] = useState(false);
  const [userModalMessage, setUserModalMessage] = useState("");
  const [userModalOnConfirm, setUserModalOnConfirm] = useState(() => () => {});

  // 이메일-수정 버튼
  function userEmailModify(event) {
    // 입력 가능하도록 변경
    setUserEmailActive(false);
    setIsModified(true);
  }

  // 이메일-중복확인 버튼
  const emailDoubleCheck = async event => {
    event.preventDefault();

    // 수정 버튼 눌러야만 중복확인 가능
    if (!isModified) {
      setUserModalOpen(true);
      setUserModalTitle("경고");
      setUserModalMessage("수정 버튼을 눌러 이메일을 수정해 주세요.");
      setUserModalOnConfirm(() => () => setUserModalOpen(false));
      return;
    }
    const reqData = {
      email: userEmail,
    };
    const result = await postUserEmail(reqData);
    console.log(result);
    if (result.statusCode !== 2) {
      setUserModalOpen(true);
      setUserModalTitle("경고");
      setUserModalMessage(result.resultMsg);
      setUserModalOnConfirm(() => () => setUserModalOpen(false));
      setEmailChecked(false);
      return;
    }
    setUserModalOpen(true);
    setUserModalTitle("경고");
    setUserModalMessage("사용 가능한 이메일입니다.");
    setUserModalOnConfirm(() => () => setUserModalOpen(false));
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

  // 이메일-변경하기 버튼
  const emailChange = async event => {
    event.preventDefault();

    if (!emailChecked) {
      setUserModalOpen(true);
      setUserModalTitle("경고");
      setUserModalMessage("중복확인을 해 주세요.");
      setUserModalOnConfirm(() => () => setUserModalOpen(false));
      return;
    }

    const reqData = {
      userId: signUserId.userId, // 사용자 ID 혹은 필요한 경우 수정
      email: userEmail,
    };

    try {
      const response = await axios.put("/api/user", reqData);
      console.log(response.data);
      setUserModalOpen(true);
      setUserModalTitle("알림");
      setUserModalMessage("이메일이 성공적으로 변경되었습니다.");
      setUserModalOnConfirm(() => () => {
        setUserModalOpen(false);
      });
    } catch (error) {
      setUserModalOpen(true);
      setUserModalTitle("오류");
      setUserModalMessage("이메일 변경 중 오류가 발생했습니다.");
      setUserModalOnConfirm(() => () => setUserModalOpen(false));
      console.error("이메일 변경 오류:", error);
    }
  };

  // 비밀번호-수정 버튼 클릭
  function userPwModify() {
    const newUrl = "/userpw";
    navigate(newUrl);
  }

  // 페이지 이동
  const navigate = useNavigate();
  // 뒤로가기 버튼 클릭시 실행
  // 회원정보 페이지로
  const modifyMember = async event => {
    event.preventDefault();
    navigate("/userinfo");
  };

  useEffect(() => {
    // axios.get 으로 사용자의 정보를 주세요.
    const postUser = async ({ userId, pwd }) => {
      try {
        const response = await axios.put("/api/user", { userId, pwd });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const sendData = {
      userId: user.userId,
      pwd: userPass,
    };
    postUser(sendData);
  }, [user.userId, userPass]);

  return (
    <div className="user-wrap">
      <div className="user-title-line">
        <h1>회원정보 수정</h1>
      </div>

      <div className="usermodify-input">
        <div className="usermodify-input-name">
          <label htmlFor="name">성명</label>
          <div className="user-content">
            <span>{userInfo?.name}</span>
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

          <div className="modify-check-field">
            <div className="user-content">
              <input
                type="email"
                placeholder={userInfo?.email}
                value={userEmail}
                readOnly={userEmailActive}
                onChange={e => {
                  setUserEmail(e.target.value);
                }}
                style={{
                  backgroundColor: userEmailActive ? "none" : "#d8dae3",
                }}
              />
            </div>
            <div className="usermodify-button-field">
              <button
                type="button"
                className="double-check"
                onClick={event => {
                  emailDoubleCheck(event);
                }}
              >
                <span>중복확인</span>
              </button>
              <button
                type="button"
                className="change-button"
                onClick={event => {
                  emailChange(event);
                }}
              >
                <span>변경하기</span>
              </button>
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
