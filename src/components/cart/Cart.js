import React from "react";
import "./Cart.style.css";

import { useSelector, useDispatch } from "react-redux";
import { addToStore } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { removeFromCart } from "../../redux/actions/cart";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cart);
  //const storeItems = store.products;
  const dispatch = useDispatch();
  console.log("state received in cart: ", cartItems);

  const totalPrice = cartItems.length > 0 && cartItems.map(item => Number(item.price)).reduce( (previousValue, currentValue) =>  {
    return previousValue + currentValue
  }) || 0

  console.log(totalPrice, "<===price")

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
   }
  const Increment = (product) => {
    dispatch(addToStore(product));
  };
  
  return (
    <div id="tableContainer">
      {cartItems.map((product, index) => {
        return (
          <div key={index} className="productCard">
            <img src="../media/red/Contrabandistes.jpg" alt="whinebottle" />
            <div>
              <ul>
                <li id="nameItem" className="listItem">
                  Name: {product.name}
                </li>
                <li id="priceItem" className="listItem">
                  Price: ${product.price}
                </li>
              </ul>
            </div>
            <div>
              <button className="changeButton" onClick={() => Increment(product)}>
                add
              </button>
              <FontAwesomeIcon icon = {faTrash}className = "userIcons" onClick = {() => handleRemove(product.id)}
              />
            </div>
          </div>
        );
      })}

      <p>Total: ${totalPrice}</p>
    </div>
  );
}

export default Cart;
