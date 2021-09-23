import React from "react";
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

function Cart() {
  const store = useSelector((state) => state.storeSlice);
  const storeItems = store.products;
  const dispatch = useDispatch();

  const Increment = (product) => {
    dispatch(addToStore(product));
  };
  const Decrement = (product) => {
    dispatch(decrementItem(product));
  };
  const Deletion = (product) => {
    dispatch(deleteProduct(product));
  };
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

      {storeItems.map((product, index) => {
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
                      onClick={() => Decrement(product)}
                    >
                      {" "}
                      -{" "}
                    </span>
                    {product.count}
                    <span
                      className="button-3"
                      id="add-button"
                      onClick={() => Increment(product)}
                    >
                      {" "}
                      +{" "}
                    </span>
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="userIcons"
                      onClick={() => Deletion(product)}
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
      })}
    </div>
  );
}

export default Cart;
