import React, {useState} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { faUser, faShoppingCart, faInfo, faWineBottle, faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Nav, Navbar, NavDropdown, form, input } from "react-bootstrap";
import {isLoggedIn} from '../login/LoggedInCheck';

import Countindicator from "./CountIndicator";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";


import './header.css';

function Header() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  return (

    <>
      <div className="upper-nav">
        <h1 style={{ fontSize: "82px" }}>Hello Wines</h1>
      </div>

    {console.log(loggedIn)}
      <div className="navbar-font">
      <Container fluid style={{ backgroundColor: "#bf8596", textAlign:"center", height:'110px'}}>

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

// color: #F3E7DA;

