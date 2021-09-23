import fetchHelper from './fetchHelper';

//type == form type (eg, register, login)
export default async function submitHelper(type, data) {

  switch(type){
    case 'register':
      {
        let status = await submitRegister(data);
        return status;
      }
    case 'login':
    {
      let status = await submitLogin(data);
      return status;
    }
  }
  return false;
}

function ValidateAllInput(obj, value) {
  for(var id in obj) {
    console.log(obj[id])

    if(obj[id].OK == value) {
      return true;
    }
  }
  return false;
}

async function submitRegister(data){
  //Check in regInfo state object if find Ok that == false
  if(ValidateAllInput(data, false) == true){
    return {auth: false, message: 'Need to fill form correctly!'}
  }
  const dataVal = {
    username: data.username.val,
    firstname: data.firstname.val,
    lastname: data.lastname.val,
    email: data.email.val,
    password: data.password.val
  }

  const settings = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataVal)
  }

  let result = await fetchHelper('/api/addUser', settings);

  return result;
}

async function submitLogin(data){
  //Check in regInfo state object if find Ok that == false
  if(ValidateAllInput(data, false) == true){
    return;
  }
  const dataVal = {
    username: data.username,
    password: data.password
  }

  const settings = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataVal)
  }

  let result = await fetchHelper('/api/loginUser', settings);

  return result;
}



