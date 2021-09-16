import React from "react";
import { useSelector } from "react-redux";

function CountIndicator() {
  const store = useSelector((state) => state.storeSlice);
  if (store.productCount === 0) {
    return null;
  } else {
    return <div id="cartCount">{store.productCount}</div>;
  }
}

export default CountIndicator;
