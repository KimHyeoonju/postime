import { useEffect, useState } from "react";
import "../../css/userinfo.css";
import { Link, useNavigate } from "react-router-dom";
import UserPwModal from "../../components/modal/UserPwModal";
import { postCheckPw } from "../../apis/user/apiuser";
import axios from "axios";

const UserInfoPage = ({
  signUserId,
  setIsLogin,
  userInfo,
  setRememberUserPass,
}) => {
  console.log("회원정보에 불러온 내 자료: ", userInfo);

  const [user, setUser] = useState({
    userId: signUserId?.userId || "",
    userName: signUserId?.userName || "",
    userEmail: signUserId?.userEmail || "",
  });
  const [userPass, setUserPass] = useState("");

  // 모달 추가
  const [userPwModalOpen, setUserPwModalOpen] = useState(true);
  // const [userModalClose, setUserModalClose] = useState(false);
  const [userPwModalMessage, setUserPwModalMessage] = useState("");
  const [userPwModalInput, setUserPwModalInput] = useState("");
  const [userPwModalOnConfirm, setUserPwModalOnConfirm] = useState(
    () => () => {},
  );
  const [userPwModalError, setUserPwModalError] = useState("");

  const navigate = useNavigate();

  const handlePwInputChange = e => {
    // 비밀번호 입력값
    setUserPwModalInput(e.target.value);
  };

  // const userModalClose = () => {
  //   setUserPwModalOpen(false); // 모달을 닫음
  //   navigate("/"); // "/" 경로로 페이지 이동
  // };

  const handleConfirm = () => {
    const reqData = {
      // userId: 72,
      userId: userInfo.userId,
      pwd: userPwModalInput,
    };
    // 모달 확인 버튼 클릭시
    postCheckPwRun(reqData);
  };

  const userModalClose = () => {
    setUserPwModalOpen(false);
    navigate("/");
  };

  // 비밀번호 확인
  const postCheckPwRun = async data => {
    console.log(data);

    try {
      const result = await postCheckPw(data);
      // console.log(result);
      if (result.statusCode !== 2) {
        setUserPwModalError("비밀번호가 틀렸습니다.");
        console.log("비밀번호 오류");
        return;
      } else {
        console.log("비밀번호 확인 완료");
        setUserPwModalOpen(false);
        console.log("userPwModalInput : ", userPwModalInput);
        setRememberUserPass(userPwModalInput);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postCheckPw = async pwd => {
    try {
      const response = await axios.post("/api/user/checkPwd", pwd);
      console.log("????????????", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
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
        <h1>회원정보</h1>
      </div>

      <div className="userinfo-contents">
        <div className="userinfo-name">
          <p>성명</p>
          <div className="user-content">
            <span>{userInfo?.name}</span>
          </div>
        </div>
        <div className="userinfo-email">
          <p>이메일</p>
          <div className="user-content">
            <span>{userInfo?.email}</span>
          </div>
        </div>
      </div>
      <button type="submit" className="user-button">
        <Link to="/UserModify">
          <span>회원정보 수정</span>
        </Link>
      </button>

      {/* 모달 관련 */}
      <UserPwModal
        isOpen={userPwModalOpen}
        close={userModalClose}
        message={
          <>
            소중한 개인 정보 보호를 위해
            <br />
            비밀번호를 다시 한번 확인해 주세요.
          </>
        }
        userPwInput={userPwModalInput}
        error={userPwModalError}
        onPwInputChange={handlePwInputChange}
        onConfirm={handleConfirm}
        buttonComment={"확인"}
      />
    </div>
  );
};

export default UserInfoPage;
