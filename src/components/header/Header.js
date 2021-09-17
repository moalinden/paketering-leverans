import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart, faInfo, faWineBottle, faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Nav } from "react-bootstrap";

import Countindicator from "./CountIndicator";

function Header() {
  return (
    <Container fluid style={{ backgroundColor: "#bf8596", height:"200px" }}>
      <Row md="auto" className="justify-content-md-center xs-2">
      <Col>
        <Nav.Link href="/App" style={{ color: "#F3DAC6" }}>
          <FontAwesomeIcon icon={faWineBottle} className="userIcons" />
          </Nav.Link>
        </Col>
        <Col>
        <Nav.Link style={{ color: "#F3DAC6" }}>
          <FontAwesomeIcon icon={faShoppingCart} className="userIcons" />
          <Countindicator />
          </Nav.Link>
        </Col>
        <Col>
        <Nav.Link href="/Register" style={{ color: "#F3DAC6" }}>
          <FontAwesomeIcon icon={faPenFancy} className="userIcons xs-2" />
          </Nav.Link>
        </Col>
        <Col>
        <Nav.Link href="/Login" style={{ color: "#F3DAC6" }}>
          <FontAwesomeIcon icon={faUser} className="userIcons xs-2" />
          </Nav.Link>
        </Col>
        <Col>
        <Nav.Link href="/About" style={{ color: "#F3DAC6" }}>
          <FontAwesomeIcon icon={faInfo} className="userIcons" />
          </Nav.Link>
        </Col>
      </Row>
      

      <style>
        
      </style>

      <Row
        md="auto"
        className="justify-content-md-center"
        style={{ backgroundColor: "#bf8596", color: "#F3E7DA" }}
      >
        <Col style={{ position:"absolute", top: "120px" }}>
          <h1>Hej På Dig Viner</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;

// color: #F3E7DA;
