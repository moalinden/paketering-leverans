import React from "react";
import "./header.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div id="headerContainer">
      <div id="appMenu">
        <p>
          <FontAwesomeIcon icon={faUser} className="userIcons" />
        </p>
        <p>
          <FontAwesomeIcon icon={faShoppingCart} className="userIcons" />
        </p>
      </div>
      <h1 id="headerHeader">Hej På Dig Viner</h1>
    </div>
  );
}

export default Header;
