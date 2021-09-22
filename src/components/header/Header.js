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
    
           <h6>Hem </h6>
          </Nav.Link>
        </Col>
        <Col>
        <Nav.Link  href="/Cart" style={{ color: "#F3DAC6" }}>
          
          <h6>Kassa </h6>
          <Countindicator />
          </Nav.Link>
        </Col>
        
        <Col>
        <Nav.Link href="/Login" style={{ color: "#F3DAC6" }}>
       
          <h6>Login </h6>
          </Nav.Link>
        </Col>
        <Col>
        <Nav.Link href="/About" style={{ color: "#F3DAC6" }}>
     
          <h6>About us</h6>
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
