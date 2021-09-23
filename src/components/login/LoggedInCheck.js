export function isLoggedIn(){
  let userLoggedIn = localStorage.getItem("logged_in");
  let tokenStorageVal = localStorage.getItem("user_session");

  //If userLoggedIn exist but not tokenStorageVal
  //Remove "logged_in" to make user login again
  if(userLoggedIn == 'true' && tokenStorageVal == null){
    localStorage.clear("logged_in");
    return false;
  }

  //If tokenStorageVal exist but not storageVal
  //Create new localStorage set "logged_in" to true
  if(tokenStorageVal != null && userLoggedIn == null){
    localStorage.setItem("logged_in", true);
    return true;
  }

  if(userLoggedIn == null || userLoggedIn == "false"){
    return false;
  }
  if(userLoggedIn == "true"){
    return true;
  }
}