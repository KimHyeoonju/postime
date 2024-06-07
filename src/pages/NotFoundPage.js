import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";

// 스타일드 컴포넌트를 변수로 선언
const globalStyles = css`
  @import url("https://fonts.googleapis.com/css?family=Roboto+Mono");

  html,
  body {
    font-family: "Roboto Mono", monospace;
    font-size: 16px;
  }

  html {
    box-sizing: border-box;
    user-select: none;
  }

  body {
    background-color: #000;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  p {
    color: #fff;
    font-size: 24px;
    letter-spacing: 0.2px;
    margin: 0;
  }
`;
const CenterXy = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  text-align: center;
`;

const Container = styled.div`
  width: 100%;
`;

const NotFoundPage = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <Container>
        <CenterXy>
          <p>404, page not found.</p>
        </CenterXy>
      </Container>
    </>
  );
};

export default NotFoundPage;
