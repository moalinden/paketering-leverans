import React from "react";
import "./Cart.style.css";

import { useSelector, useDispatch } from "react-redux";
import { addToStore, clearCart, decrementItem, deleteProduct } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Cart() {
  const store = useSelector((state) => state.storeSlice);
  const storeItems = store.products;
  const totalCount = store.myTotalCount;
  const dispatch = useDispatch();
  console.log("state received in cart: ", storeItems);

  const Increment = (product) => {
    dispatch(addToStore(product));
  };
  const Decrement = (product) => {
    dispatch(decrementItem(product));
  };
  const Deletion = (product) => {
    dispatch(deleteProduct(product));
    
  };
  const emptyCart = ()=> {
    dispatch(clearCart())
    
  }

  const getTotal = (item) => item.count * Number(item.price)

  const totalPrice = storeItems.length > 0 &&
    storeItems.reduce((previousValue, item) => {
      const price = getTotal(item);
      return previousValue + price;
    },0) || 0;


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
                  
                  Price: {getTotal(product) }
                </li>
              </ul>
            </div>
            <div>
              <span onClick={() => Decrement(product)}> - </span>
              <span>{product.count} x ${ product.price}</span>
              <span
                className="changeButton"
                onClick={() => Increment(product)}
              >
                 +
                     </span>
                    < FontAwesomeIcon icon={faTrash} className="userIcons" onClick={() => Deletion(product)} />
    
            </div>
          </div>
        );
      })}
      <button onClick={()=> emptyCart()}>EMPTY CART</button>
      <p>Total: ${totalPrice}</p>
    </div>
  );
}

export default Cart;
