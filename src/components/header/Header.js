import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingCart,
  faInfo,
  faWineBottle,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { isLoggedIn } from "../login/LoggedInCheck";

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
              <Nav.Link onClick={() => navTo("/")} style={{ color: "#F3DAC6" }}>
                <p>Wines</p>
                <FontAwesomeIcon icon={faWineBottle} className="userIcons" />
              </Nav.Link>
            </Col>
            </Row>

        <Row md="auto" className="justify-content-md-center xs-2">
        <Col>
          <Nav.Link href="/" style={{ color: "#F3DAC6" }}>
            <p className='HeadP'>Wines</p>
            <FontAwesomeIcon icon={faWineBottle} className="userIcons" />
            </Nav.Link>
          </Col>

          <Col>
          <Nav.Link href="/cart" style={{ color: "#F3DAC6" }}>
          <p className='HeadP'>Cart</p>
            <FontAwesomeIcon icon={faShoppingCart} className="userIcons" />
            <Countindicator />
            </Nav.Link>
          </Col>

          { loggedIn == false ?
            [
          // <Col>
          // <Nav.Link href="/Register" style={{ color: "#F3DAC6" }}>
          // <p>Sign Up</p>
          //   <FontAwesomeIcon icon={faPenFancy} className="userIcons xs-2" />
          //   </Nav.Link>
          // </Col>
            ,
          <Col>
          <Nav.Link href="/Login" style={{ color: "#F3DAC6" }}>
          <p className='HeadP'>Sign In</p>
            <FontAwesomeIcon icon={faUser} className="userIcons xs-2" />
            </Nav.Link>
          </Col>
            ]
            :
            <Col>
              <Nav.Link href="/logout" style={{ color: "#F3DAC6" }}>
                <p className='HeadP'>Log Out</p>
                <FontAwesomeIcon icon={faUser} className="userIcons xs-2" />
              </Nav.Link>
            </Col>
            }

          <Col>
          <Nav.Link href="/About" style={{ color: "#F3DAC6" }}>
          <p className='HeadP'>About</p>
            <FontAwesomeIcon icon={faInfo} className="userIcons" />
            </Nav.Link>
          </Col>
        </Row> 
        
      </Container>
      </div>
    </>
  );
}

export default Header;
