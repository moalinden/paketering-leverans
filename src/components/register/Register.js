import React, {useState, useEffect} from "react";
import "./register.css";

import RegHelper from '../../helper/regHelper'

export default function RegisterPage() {

  const [regInfo, setRegInfo] = useState([{username: null, OK: false}, {firstname: null, OK: false}, {lastname: null, OK: false}, {email: null, OK: false}, {password: null, OK: false}, {password: null, OK: false}])

  const regDataCheck = async(e) => {
    //Send password or password2 when one of those are entered

    //Don't send to helper if nothing is entered
    if(e.target.value.length > 0){
      RegHelper({inpVal: e.target.value, inpType: e.target.dataset.input})
    }
  }

  const submitRegister = (event) => {
    event.preventDefault();
    console.log(RegHelper())
  }

  return (
    <div className="body">
      <div className="div-form">
        <form action="" className="form">
          <h1 className="form_title">Sign Up</h1>
          <br/>
          <div className="form_div">
            <input type="text" className="form_input" data-input="username" onBlur={regDataCheck}/>
            <label className="form_label">Username</label>
          </div>
          <div className="form_div">
            <input type="text" className="form_input" placeholder="" />
            <label className="form_label">First name</label>
          </div>
          <div className="form_div">
            <input type="text" className="form_input" placeholder="" />
            <label className="form_label">Last name</label>
          </div>
          <div className="form_div">
            <input type="text" className="form_input" placeholder="" />
            <label className="form_label">Email</label>
          </div>
          <div className="form_div">
            <input type="text" className="form_input" placeholder="" />
            <label className="form_label">Password</label>
          </div>
          <div className="form_div">
            <input type="password" className="form_input" placeholder="" />
            <label className="form_label">Re-Enter password</label>
          </div>

          <input type="submit" className="form_button" value="Sign Up" onClick={(event) => submitRegister(event)}/>
        </form>
      </div>
    </div>
  );
}