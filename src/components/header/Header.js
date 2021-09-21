import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { faUser, faShoppingCart, faInfo, faWineBottle, faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Nav, Navbar, NavDropdown, form, input } from "react-bootstrap";



import Countindicator from "./CountIndicator";
import { useHistory } from "react-router-dom";
import {
  Link
} from "react-router-dom";


import './header.css';

function Header() {
  const history = useHistory();
  return (

    <>
      <div className="upper-nav">
        <h4>Hello Wines</h4>
      </div>

      <Container fluid style={{ backgroundColor: "#bf8596", height:"225px", paddingTop:"25px", textAlign:"center"}}>

        <Row md="auto" className="justify-content-md-center xs-2">
        <Col>
          <Nav.Link href="/App" style={{ color: "#F3DAC6" }}>
            <p>wines</p>
            <FontAwesomeIcon icon={faWineBottle} className="userIcons" />
            </Nav.Link>
          </Col>

          <Col>
          <Nav.Link style={{ color: "#F3DAC6" }}>
          <p>Cart</p>
            <FontAwesomeIcon icon={faShoppingCart} className="userIcons" />
            <Countindicator />
            </Nav.Link>
          </Col>

          <Col>
          <Nav.Link href="/Register" style={{ color: "#F3DAC6" }}>
          <p>Sign Up</p>
            <FontAwesomeIcon icon={faPenFancy} className="userIcons xs-2" />
            </Nav.Link>
          </Col>

          <Col>
          <Nav.Link href="/Login" style={{ color: "#F3DAC6" }}>
          <p>Sign In</p>
            <FontAwesomeIcon icon={faUser} className="userIcons xs-2" />
            </Nav.Link>
          </Col>

          <Col>
          <Nav.Link href="/About" style={{ color: "#F3DAC6" }}>
          <p>About</p>
            <FontAwesomeIcon icon={faInfo} className="userIcons" />
            </Nav.Link>
          </Col>
        </Row> 
        
        {/* <Row
          md="auto"
          className="justify-content-md-center"
          style={{ backgroundColor: "#bf8596", color: "#F3E7DA" }}
        >
          <Col style={{ position:"absolute", top: "120px" }}>
            <h1>Hej På Dig Viner</h1>
          </Col>
        </Row> */}
      </Container>
    </>

    <Container fluid style={{ backgroundColor: "#bf8596", height:"200px" }}>
      <Row md="auto" className="justify-content-md-center xs-2">
      <Col>
        <Link to="/" style={{ color: "#F3DAC6" }}>
          <FontAwesomeIcon icon={faWineBottle} className="userIcons" />
          </Link>
        </Col>
        <Col>
        <Link to="/cart" style={{ color: "#F3DAC6" }}>
          <FontAwesomeIcon icon={faShoppingCart} className="userIcons" />
            <Countindicator />
          </Link>
        </Col>
        <Col>
        <Link to="/Register" style={{ color: "#F3DAC6" }}>
          <FontAwesomeIcon icon={faPenFancy} className="userIcons xs-2" />
          </Link>
        </Col>
        <Col>
        <Link to="/Login" style={{ color: "#F3DAC6" }}>
          <FontAwesomeIcon icon={faUser} className="userIcons xs-2" />
          </Link>
        </Col>
        <Col>
        <Link to="/About" style={{ color: "#F3DAC6" }}>
          <FontAwesomeIcon icon={faInfo} className="userIcons" />
          </Link>
        </Col>
      </Row>

      <Row
        md="auto"
        className="justify-content-md-center"
        style={{ backgroundColor: "#bf8596", color: "#F3E7DA" }}>
        <Col style={{ position:"absolute", top: "120px" }}>
          <h1>Hej På Dig Viner</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;

// color: #F3E7DA;

