import "./footer.css";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faInstagram,
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div id="footerContainer">
      <p className="footerIcon">
        <FontAwesomeIcon icon={faInstagram} />
      </p>
      <p className="footerIcon">
        <FontAwesomeIcon icon={faFacebook} />
      </p>
      <p className="footerIcon">
        <FontAwesomeIcon icon={faTwitter} />
      </p>
      <p className="footerIcon">
        <FontAwesomeIcon icon={faLinkedin} />
      </p>
    </div>
  );
}

export default Footer;
