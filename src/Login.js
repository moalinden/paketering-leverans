import React from "react";
import "./Login.css";

function loginPage() {
    return (
      <div class="body">
        <div class="div-form">
          <form action="" class="form">
            <h1 class="form_title">Sign In</h1>
            <br/>
            <div class="form_div">
              <input type="text" class="form_input" placeholder="" />
              <label class="form_label">Username</label>
            </div>
            <div class="form_div">
              <input type="password" class="form_input" placeholder="" />
              <label class="form_label">Password</label>
            </div>

            <input type="submit" class="form_button" value="Sign In"/>
          </form>
        </div>
      </div>
    );
}

export default loginPage;