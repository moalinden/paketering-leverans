import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart, faInfo } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import Countindicator from "./CountIndicator";

function Header() {
  const history = useHistory();
  return (
    <Container fluid style={{ backgroundColor: "#bf8596" }}>
      <Row md="auto" className="justify-content-md-center xs-2">
        <Col>
          <FontAwesomeIcon icon={faUser} className="userIcons xs-2" />
        </Col>
        <Col>
          <FontAwesomeIcon icon={faShoppingCart} className="userIcons" onClick={()=> history.push('/cart') } />
          <Countindicator />
        </Col>
        <Col>
          <FontAwesomeIcon icon={faInfo} className="userIcons" />
        </Col>
      </Row>
      <Nav className="justify-content-md-center xs-2" onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
        <Nav.Item> <Nav.Link href="/" style={{ color: "#F3DAC6" }}>
            App
          </Nav.Link>
        </Nav.Item>
        <Nav.Item><Nav.Link href="/Login" style={{ color: "#F3DAC6" }}>
            Login
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/About" style={{ color: "#F3DAC6" }}>
            About Us
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Row md="auto" className="justify-content-md-center" style={{ backgroundColor: "#bf8596", color: "#F3E7DA" }} >
        <Col> <h1>Hej På Dig Viner</h1></Col>
      </Row>
    </Container>
  );
}

export default Header;

// color: #F3E7DA;
