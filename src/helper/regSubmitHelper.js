export default async function RegSubmitHelper(data) {

  //Check in regInfo state object if find Ok that == false
  if(ValidateAllInput(data, false) == true){
    return;
  }


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