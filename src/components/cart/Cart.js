import React from "react";
import "./Cart.style.css";

import { useSelector, useDispatch } from "react-redux";
import { addToStore } from "../redux/actions";

function Cart() {
  const store = useSelector((state) => state.storeSlice);
  const storeItems = store.products;
  const dispatch = useDispatch();
  console.log("state received in cart: ", storeItems);

  const Increment = (product) => {
    dispatch(addToStore(product));
  };
  const Decrement = (product) => {};
  return (
    <div id="tableContainer">
      {storeItems.map((product, index) => {
        return (
          <div key={index} className="productCard">
            <img src="../media/red/Contrabandistes.jpg" alt="whinebottle" />
            <div>
              <ul>
                <li id="nameItem" className="listItem">
                  Name: {product.name}
                </li>
                <li id="priceItem" className="listItem">
                  Price: {product.price}
                </li>
              </ul>
            </div>
            <div>
              <button
                className="changeButton"
                onClick={() => Increment(product)}
              >
                increment
              </button>
              <button
                className="changeButton"
                onClick={() => Decrement(product)}
              >
                decrement
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Cart;
