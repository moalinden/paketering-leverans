import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Nav } from "react-bootstrap";

import Countindicator from "./CountIndicator";

function Header() {
  return (
    <Container fluid style={{ backgroundColor: "#bf8596" }}>
      <Row md="auto" className="justify-content-md-center xs-2">
        <Col>
        <Nav.Link href="/Login" style={{ color: "#F3DAC6" }}>
          <FontAwesomeIcon icon={faUser} className="userIcons xs-2" />
          </Nav.Link>
        </Col>

        <Col>
        <Nav.Link style={{ color: "#F3DAC6" }}>

          <Countindicator />
          <FontAwesomeIcon icon={faShoppingCart} className="userIcons" />
          </Nav.Link>
        </Col>
      </Row>
      <Nav
        className="justify-content-md-center xs-2"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
          <Nav.Link href="/App" style={{ color: "#F3DAC6" }}>
            App
          </Nav.Link>
        </Nav.Item>
        
        <Nav.Item>
          <Nav.Link href="/About" style={{ color: "#F3DAC6" }}>
            About Us
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <style></style>

      <Row
        md="auto"
        className="justify-content-md-center"
        style={{ backgroundColor: "#bf8596", color: "#F3E7DA" }}
      >
        <Col>
          <h1>Hej På Dig Viner</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;

// color: #F3E7DA;
