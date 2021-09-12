export default function RegHelper(data) {
  let retObj = {type: null, OK: false};

  //Function to check
  switch(data.inpType){
    case 'username':
    {
      //Perform DB check to make sure it does not exist

      break;
    }
    case 'firstname':
    {
      //Make sure alphabetic(?)
      break;
    }
    case 'lastname':
    {
      //Make sure alphabetic(?)
      break;
    }
    case 'email':
    {
      //Make sure real email
      //Make sure email does not exist already
      break;
    }
    case 'password':
    {
      //Make sure password is long enough
      //Make sure it matches reentered(if entered)
      break;
    }
    case 'password2':
    {
      //Make sure it matches password(if entered)
      break;
    }
  }
}