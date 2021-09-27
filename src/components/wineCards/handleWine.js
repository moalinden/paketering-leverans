import fetchHelper from "../../helper/fetchHelper";
import jwt_decode from "jwt-decode";

export default async function handleWine(type, data) {
  let token = localStorage.getItem("user_session");
  let decoded = jwt_decode(token);
  let user_id = decoded.userId;

  let dataVal = {
    userId: user_id,
    orderedAmount: 1,
  };
  if (type != "get") {
    dataVal.productId = data.id;
  }

  const settings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataVal),
  };

  switch (type) {
    case "add": {
      let status = await fetchHelper("/api/cart/add", settings);
      return status;
    }
    case "decrease": {
      let status = await fetchHelper("/api/cart/decrease", settings);
      return status;
    }
    case "remove": {
      let status = await fetchHelper("/api/cart/remove", settings);
      return status;
    }
    case "get": {
      let status = await fetchHelper("/api/cart/get", settings);
      console.log(status);
      return status;
    }
  }
  return false;
}
