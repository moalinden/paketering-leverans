import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingCart,
  faInfo,
  faWineBottle,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import { isLoggedIn } from "../login/LoggedInCheck";
import { Link } from "react-router-dom";

import Countindicator from "./CountIndicator";

import "./header.css";

function Header() {
  const [loggedIn] = useState(isLoggedIn());
  const history = useHistory();

  const navTo = (location) => {
    history.push(location);
  };

  return (
    <>
      <div className="upper-nav">
        <h1 style={{ fontSize: "82px" }}>Hello Wines</h1>
      </div>

      <div className="navbar-font">
        <Container
          fluid
          style={{
            backgroundColor: "#bf8596",
            textAlign: "center",
            height: "110px",
          }}
        >
          
          <Row md="auto" className="justify-content-md-center xs-2">
            <Col>
              <Link to="/" style={{ color: "#F3DAC6" }}>
                <p className='HeadP'>Wines</p>
                <FontAwesomeIcon icon={faWineBottle} className="userIcons" />
              </Link>
            </Col>

            <Col>
              <Link to="/cart" style={{ color: "#F3DAC6" }}>
                <p className='HeadP'>Cart</p>
                <FontAwesomeIcon icon={faShoppingCart} className="userIcons" />
                <Countindicator />
              </Link>
            </Col>

            {loggedIn == false ?
              [      
                ,
                <Col>
                  <Link to="/Login" style={{ color: "#F3DAC6" }}>
                    <p className='HeadP'>Sign In</p>
                    <FontAwesomeIcon icon={faUser} className="userIcons xs-2" />
                  </Link>
                </Col>
              ]
              :
              <Col>
                <Link to="/logout" style={{ color: "#F3DAC6" }}>
                  <p className='HeadP'>Log Out</p>
                  <FontAwesomeIcon icon={faUser} className="userIcons xs-2" />
                </Link>
              </Col>
            }

            <Col>
              <Link to="/About" style={{ color: "#F3DAC6" }}>
                <p className='HeadP'>About</p>
                <FontAwesomeIcon icon={faInfo} className="userIcons" />
              </Link>
            </Col>
            </Row>
         
        </Container>
      </div>
    </>
  );
}

export default Header;
