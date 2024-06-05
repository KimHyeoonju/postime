// import "../../css/signup.css";
import styled from "@emotion/styled";

const Wrap = styled.div`
  background-color: red;
`;

const SignUpPage = () => {
  return (
    <Wrap>
      <header>
        <div className="user-title-line">
          <h1>회원가입</h1>
        </div>
      </header>
      <div className="signup-input">
        <div className="signup-input-name">
          <p>성명</p>
          <input type="text" className="name" placeholder="성명" />
        </div>

        <div className="signup-input-id">
          <signupInputP>아이디</signupInputP>
          <input
            type="text"
            className="id"
            placeholder="아이디 입력 (6~12자)"
          />
          <br />
          <button type="button" className="double-check">
            <span>중복확인</span>
          </button>
        </div>

        <div className="signup-input-email">
          <div className="bubble">이미 존재하는 이메일입니다.</div>
          <p>이메일</p>

          <input type="text" className="email" placeholder="이메일" />
          <br />
          <button type="button" className="double-check">
            <span>중복확인</span>
          </button>
        </div>

        <div className="signup-input-pw">
          <p>비밀번호</p>
          <input
            type="password"
            className="pw"
            placeholder="(영어, 숫자, 특수문자 포함 8~20자)"
          />
        </div>

        <div className="signup-input-pwcheck">
          <p>비밀번호 확인</p>
          <input
            type="password"
            className="pwcheck"
            placeholder="비밀번호 재입력"
          />
        </div>
      </div>
      <button>
        <span>가입하기</span>
      </button>
    </Wrap>
  );
};

export default SignUpPage;
