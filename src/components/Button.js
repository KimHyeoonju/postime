import styled from "@emotion/styled";
// import colorSystem from "../css/color";
const Button = ({ label, onClick }) => {
  const ButtonStyle = styled.button`
    width: 76px;
    height: 38px;
    border: solid 1px #242733;
    border-radius: 25px;
    font-size: 14px;
    font-weight: 700;
    color: #242733;
    margin: 0 10px;

    &:hover {
      background-color: #242733;
      color: #f6f7f9;
    }
  `;
  return (
    <ButtonStyle onClick={onClick}>
      <span>{label}</span>
    </ButtonStyle>
  );
};

export default Button;
