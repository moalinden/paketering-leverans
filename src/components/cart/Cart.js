import React, {useEffect, useState} from "react";
import "./Cart.style.css";

import { useSelector, useDispatch } from "react-redux";
import {
  addToStore,
  clearCart,
  decrementItem,
  deleteProduct,
} from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import handleWine from '../wineCards/handleWine';



function Cart() {
  const store = useSelector((state) => state.storeSlice);
  const storeItems = store.products;
  const dispatch = useDispatch();

  const [cart, setCart] = useState();

  useEffect(() => {
    const newFetch = async () => {
      let wines = await handleWine('get');

      setCart(wines);
    };
    newFetch();
  }, []);

  const handleClick = (action, product) => {

    handleWine(action, product);

  }

  const emptyCart = () => {
    dispatch(clearCart());
  };

  const getTotal = (price, count) => {
    const total = price * count;
    return total;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h2 className="item-header"> Products in Cart</h2>
        </div>
      </div>

      {cart != undefined ?
        cart.map((product, index) => {
        return (
          <div key={index} className="col-md-12">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <td>Product</td>
                  <td>Name of Product</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Remove</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="imgCards">
                    <img
                      src="../media/red/Contrabandistes.jpg"
                      alt="whinebottle"
                    />
                  </td>
                  <td> {product.name}</td>
                  <td> {product.price}kr</td>
                  <td>
                    <span
                      className="button-3"
                      id="minus-button"
                      onClick={() => handleClick('decrease', product)}
                    >
                      {" "}
                      -{" "}
                    </span>
                    {product.product_amount}
                    <span
                      className="button-3"
                      id="add-button"
                      onClick={() => handleClick('add', product)}
                    >
                      {" "}
                      +{" "}
                    </span>
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="userIcons"
                      onClick={() => handleClick('remove', product)}
                    />
                  </td>
                  <td>{getTotal(product.price, product.count)}</td>
                </tr>
              </tbody>
              <div className="buttonContainer">
                <button className="button-3">
                  Total Amount: {getTotal(product.price, product.count)}kr
                </button>
                <p
                  className="button-3"
                  id="checkout"
                  onClick={() => emptyCart()}
                >
                  EMPTY CART
                </p>
              </div>
            </table>
          </div>
        );
      })
      :
        null
      }
    </div>
  );
}

export default Cart;
