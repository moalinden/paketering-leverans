import fetchHelper from './fetchHelper';

export default async function RegSubmitHelper(data) {
  console.log(data.username)

  //Check in regInfo state object if find Ok that == false
  if(ValidateAllInput(data, false) == true){
    return;
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

  let result = await fetch('/api/addUser', settings);

  return result;
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