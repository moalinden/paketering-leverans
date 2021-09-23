import React, {useState, useEffect} from "react";
import "./Login.css";
import submitHelper from '../../helper/submitHelper'

import { Nav, Col, Row, Container } from "react-bootstrap";

export default function LoginPage() {

  const [loginInfo, setLoginInfo] = useState({ username: null, password: null });

  useEffect(() => {
    (async ()=> {
      console.log("Eyy");
    })();
  }, []);

  //Change text in state onChange
  const onChangeUpdateStateText = async(e) => {
    let inpType = e.target.dataset.input;
    let inpVal = e.target.value;
    setLoginInfo((prevState) => ({
      ...prevState,
       [inpType]: inpVal
    }));
  }

  const submitLogin = async(e) => {
    e.preventDefault();

    let status = await submitHelper('login', loginInfo)

    //Logged in
    if(status.auth == true){
      localStorage.setItem("user_session", status.token);
      localStorage.setItem("logged_in", true);
      window.location.href = '/'; //Return user to home page
    }
    //Wrong info
    if(status.auth == false){

    }

  }

    return (
      <div class="body">
        <div class="div-form">
          <form action="" class="form">
            <h1 class="form_title">Sign In</h1>
            <br/>
            <div class="form_div">
              <input type="text" class="form_input" data-input="username" placeholder="" onChange={onChangeUpdateStateText}/>
              <label class="form_label">Username</label>
            </div>
            <div class="form_div">
              <input type="password" class="form_input" data-input="password" placeholder="" onChange={onChangeUpdateStateText}/>
              <label class="form_label">Password</label>
            </div>

            <input type="submit" class="form_button" value="Sign In" onClick={submitLogin}/>
          </form>
        </div>
        <Container className="justify-content-md-center">
        <div class="reg_button" >
        <Nav.Link href="/Register" id="navLink">
                  Sign up
                </Nav.Link>
          </div>
          </Container>
      </div>
    );
    
}
