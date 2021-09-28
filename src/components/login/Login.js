import React, { useState, useEffect } from "react";
import "./Login.css";
import submitHelper from "../../helper/submitHelper";
import { isLoggedIn } from "./LoggedInCheck";

import { Nav, Col, Row, Container } from "react-bootstrap";

export default function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({
    username: null,
    password: null,
  });
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    //If user is logged in return to home page
    if (loggedIn) {
      window.location.href = "/";
    }
  }, []);

  //Change text in state onChange
  const onChangeUpdateStateText = async (e) => {
    let inpType = e.target.dataset.input;
    let inpVal = e.target.value;
    setLoginInfo((prevState) => ({
      ...prevState,
      [inpType]: inpVal,
    }));
  };

  const submitLogin = async (e) => {
    e.preventDefault();

    let status = await submitHelper("login", loginInfo);

    //Logged in
    if (status.auth == true) {
      localStorage.setItem("user_session", status.token);
      localStorage.setItem("logged_in", true);
      window.location.href = "/"; //Return user to home page
    }
    //Wrong info
    if (status.auth == false) {
    }
  };

  return (
    <div className="body">
      <div className="div-form">
        <form action="" className="form">
          <h1 className="form_title">Sign In</h1>
          <br />
          <div className="form_div">
            <input
              type="text"
              className="form_input"
              data-input="username"
              placeholder=""
              onChange={onChangeUpdateStateText}
            />
            <label className="form_label">Username</label>
          </div>
          <div className="form_div">
            <input
              type="password"
              className="form_input"
              data-input="password"
              placeholder=""
              onChange={onChangeUpdateStateText}
            />
            <label className="form_label">Password</label>
          </div>
          <input
            type="submit"
            className="form_button"
            value="Sign In"
            onClick={submitLogin}
          />
          {/* </Container> */}
        </form>
        <div id="navLink">
          <Nav.Link href="/Register" className="reg_button">
            Sign up
          </Nav.Link>
        </div>
      </div>
      {/* <Container > */}
    </div>
  );
}
