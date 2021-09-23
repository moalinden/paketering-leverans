import fetchHelper from '../../helper/fetchHelper';
import jwt_decode from "jwt-decode";

//type == form type (eg, register, login)
export default async function handleWine(type, data) {

  let token = localStorage.getItem('user_session')
  let decoded = jwt_decode(token)
  let user_id = decoded.userId;

  const dataVal = {
    productId: data.id,
    userId: user_id,
    orderedAmount: 1
  }

  const settings = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataVal)
  }

  switch(type){
    case 'add':
    {
      let status = await fetchHelper('/api/cart/add', settings);
      console.log(status);
      return status;
    }
    case 'decrease':
    {
      let status = await fetchHelper('/api/cart/decrease', settings);
      return status;
    }
    case 'remove':
    {
      let status = await fetchHelper('/api/cart/remove', settings);
      return status;
    }
  }
  return false;
}





