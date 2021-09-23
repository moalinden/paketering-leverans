export function isLoggedIn(){
  let storageVal = localStorage.getItem("logged_in");

  if(storageVal == null || storageVal == "false"){
    return false;
  }else if(storageVal == "true"){
    return true;
  }
}