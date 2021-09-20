import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { faUser, faShoppingCart, faInfo, faWineBottle, faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Nav } from "react-bootstrap";

import Countindicator from "./CountIndicator";
import { useHistory } from "react-router-dom";
import {
  Link
} from "react-router-dom";


function Header() {
  const history = useHistory();
  return (
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

