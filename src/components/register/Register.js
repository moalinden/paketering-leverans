import React, {useState, useEffect} from "react";
import "./register.css";

export default function RegisterPage() {

  return (
    <div className="body">
      <div className="div-form">
        <form action="" className="form">
          <h1 className="form_title">Sign Up</h1>
          <br/>
          <div className="form_div">
            <input type="text" className="form_input" placeholder="" />
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
            <label className="form_label">Reenter password</label>
          </div>

          <input type="submit" className="form_button" value="Sign Up"/>
        </form>
      </div>
    </div>
  );
}