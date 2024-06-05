import { notStyle } from "../css/notfound.css";
// import NotFoundSvg from "../assets/notfound.svg";

const NotFound = () => {
  return (
    // <notStyle>
    <div>
      <div className="container">
        <div className="copy-container center-xy">
          <p>404, page not found.</p>
          <span className="handle"></span>
        </div>
      </div>

      {/* <NotFoundSvg></NotFoundSvg> */}
    </div>
    // </notStyle>
  );
};

export default NotFound;
