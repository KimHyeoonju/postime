import { useEffect, useState } from "react";
import "../../css/userinfo.css";
import { Link } from "react-router-dom";
import UserPwModal from "../../components/modal/UserPwModal";
import { postCheckPw } from "../../apis/user/apiuser";
import axios from "axios";

const UserInfoPage = ({ signUserId }) => {
  console.log("가지고 온거: ", signUserId);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });
  const [userId, setUserId] = useState(
    signUserId.userId,
    // signUserId.userName,
    // signUserId.userEmail,
  );
  const [userPass, setUserPass] = useState("");
  // 모달 추가
  const [userPwModalOpen, setUserPwModalOpen] = useState(true);
  const [userPwModalMessage, setUserPwModalMessage] = useState("");
  const [userPwModalInput, setUserPwModalInput] = useState("");
  const [userPwModalOnConfirm, setUserPwModalOnConfirm] = useState(
    () => () => {},
  );
  const [userPwModalError, setUserPwModalError] = useState("");

  const handlePwInputChange = e => {
    // 비밀번호 입력값
    setUserPwModalInput(e.target.value);
  };

  const handleConfirm = () => {
    const reqData = {
      userId,
      pwd: userPwModalInput,
    };
    // postCheckPw(reqData);
    // 모달 확인 버튼 클릭시
    postCheckPwRun(reqData);
  };

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
        const response = await axios.post("/api/user/checkPwd", {
          userId,
          pwd,
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const sendData = {
      userId: userId,
      pwd: userPass,
    };
    postUser(sendData);

    return () => {};
  }, []);

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     try {
  //       const response = await axios.put("/api/user");
  //       const userData = response.data;
  //       setUserInfo({
  //         name: userData.name,
  //         email: userData.email,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchUserInfo();
  // }, []);

  return (
    <div className="user-wrap">
      <div className="user-title-line">
        <h1>회원정보</h1>
      </div>

      <div className="userinfo-contents">
        <div className="userinfo-name">
          <p>성명</p>
          <div className="user-content">
            <span>{userInfo.name}</span>
          </div>
        </div>
        <div className="userinfo-email">
          <p>이메일</p>
          <div className="user-content">
            <span>{userInfo.email}</span>
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
