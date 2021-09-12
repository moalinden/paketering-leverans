export default async function RegHelper(data) {
  let retObj = {type: data.inpType, OK: false};
  let mail_format = /\S+@\S+\.\S+/;

  //Another check to make sure it's longer than 0
  if(data.inpVal.length < 1){
    retObj.OK = false;
    return retObj;
  }

  //Function to check
  switch(data.inpType){
    case 'username':
    {
      //Add fetch to make sure only 1 username in DB

      retObj.OK = true;
      return retObj;
    }
    case 'firstname':
    {
      retObj.OK = true;
      return retObj;
    }
    case 'lastname':
    {
      retObj.OK = true;
      return retObj;
    }
    case 'email':
    {
      //Email input check
      if(mail_format.test(data.inpVal) == true){
        retObj.OK = true;
      }
      else{
        retObj.OK = false;
        return retObj;
      }

      //Add fetch to make sure only 1 email in DB

      return retObj;
    }
    case 'password':
    {
      //Make sure password is long enough
      if(data.inpVal.length < 5){
        retObj.OK = false;
        return retObj;
      }

      retObj.OK = true;
      return retObj;
    }
    case 'repassword':
    {
      //Check if other password input is !null
      //if they match, OK = true
      if(data.compVal != null){
        if(data.inpVal == data.compVal){
          retObj.OK = true;
        }
      }

      return retObj;
    }
  }
}