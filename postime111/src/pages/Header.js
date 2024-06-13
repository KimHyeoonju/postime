import React from "react";

const Header = ({ isActive }) => {
  if (isActive) {
    return <header>....</header>;
  } else {
    return <></>;
  }
};

export default Header;
