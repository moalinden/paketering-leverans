import React, {useState, useEffect} from "react";
import "./register.css";

import RegHelper from '../../helper/regHelper'
import RegSubmitHelper from '../../helper/regSubmitHelper'

export default function RegisterPage() {

  const [regInfo, setRegInfo] = useState({username:{val: null, OK: false}, firstname: {val: null, OK: false}, lastname:{val: null, OK: false}, email:{val: null, OK: false}, password:{val: null, OK: false}, repassword:{val: null, OK: false}})

  //Check data onBlur
  const regDataCheck = async(e) => {
    let inpType = e.target.dataset.input;
    let inpVal = e.target.value;
    let compVal = null;

    //Send password or password2 when one of those are entered

    console.log(inpType);

    if(inpType == 'repassword'){
      compVal = regInfo['password'].val;
    }
    if(inpType == 'password'){
      compVal = regInfo['repassword'].val;
    }

    //Get return value from helper
    let result = await RegHelper({inpVal: inpVal, inpType: inpType, compVal: compVal});

    //Manage response from helper
    if(result.OK == false){
      e.target.style.borderColor = 'red';
      setRegInfo((prevState) => ({
        ...prevState,
        [inpType]: {
          ...prevState[inpType],
          OK: result.OK,
        }
      }));

    }
    if(result.OK == true){
      e.target.style.borderColor = 'green';
      setRegInfo((prevState) => ({
        ...prevState,
        [inpType]: {
          ...prevState[inpType],
          OK: result.OK,
        }
      }));

    }
  }

  //Change text in state onChange
  const onChangeUpdateStateText = async(e) => {
    let inpType = e.target.dataset.input;
    let inpVal = e.target.value;

    setRegInfo((prevState) => ({
      ...prevState,
      [inpType]: {
        ...prevState[inpType],
        val: inpVal,
      }
    }));
  }

  //Submit user on submit
  const submitRegister = (event) => {
    event.preventDefault();
    RegSubmitHelper(regInfo)
  }

  return (
    <div className="body">
      <div className="div-form">
        <form action="" className="form">
          <h1 className="form_title">Sign Up</h1>
          <br/>
          <div className="form_div">
            <input type="text" className="form_input" data-input="username" onBlur={regDataCheck} onChange={onChangeUpdateStateText}/>
            <label className="form_label">Username</label>
          </div>
          <div className="form_div">
            <input type="text" className="form_input" data-input="firstname" placeholder="" onBlur={regDataCheck} onChange={onChangeUpdateStateText}/>
            <label className="form_label">First name</label>
          </div>
          <div className="form_div">
            <input type="text" className="form_input" data-input="lastname" placeholder="" onBlur={regDataCheck} onChange={onChangeUpdateStateText}/>
            <label className="form_label">Last name</label>
          </div>
          <div className="form_div">
            <input type="text" className="form_input" data-input="email" placeholder="" onBlur={regDataCheck} onChange={onChangeUpdateStateText}/>
            <label className="form_label">Email</label>
          </div>
          <div className="form_div">
            <input type="text" className="form_input" data-input="password" placeholder="" onBlur={regDataCheck} onChange={onChangeUpdateStateText}/>
            <label className="form_label">Password</label>
          </div>
          <div className="form_div">
            <input type="password" className="form_input" data-input="repassword" placeholder="" onBlur={regDataCheck} onChange={onChangeUpdateStateText}/>
            <label className="form_label">Re-Enter password</label>
          </div>

          <input type="submit" className="form_button" value="Sign Up" onClick={(event) => submitRegister(event)}/>
        </form>
      </div>
    </div>
  );
}