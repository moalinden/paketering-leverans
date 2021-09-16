import React from "react";
import "./wineBottles.css";

import { Nav, Col, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { addToStore, decrementItem, storeWishList } from "../../redux/actions";

function WineBottles() {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.storeSlice);
  const products = productsState.storedProducts;
  const addToCart = (product) => {
    const productToDispatch = productsState.products.find(
      (element) => element.id === product.id
    );
    if (productsState.products.length < 1 || productToDispatch === undefined) {
      dispatch(addToStore(product));
    } else {
      dispatch(addToStore(productToDispatch));
    }
  };

  const decrementCart = (product) => {
    dispatch(decrementItem(product));
  };

  const saveToWishList = () => {
    const wishList = productsState.products;
    const keyGen = Math.random() * 1000;
    localStorage.setItem(keyGen, wishList);
    dispatch(storeWishList(keyGen));
  };

  const removeWishList = (key) => {
    dispatch(removeWishList(key));
    const keyToRemove = productsState.keyToRemove;
    localStorage.removeItem(keyToRemove);
  };

  return (
    <div className="container" id="systembolaget">
      <div className="row">
        {products.map((wine, index) => (
          <div className="col-1" id="wineBox" key={index}>
            <div id="bild">
              {/* {console.log(wine)} */}
              <img src={wine.imageUrl} alt="wine and dinee" id="winePic"></img>
            </div>
            <div id="wineFacts">
              <h3>{wine.name}</h3>
              <p>{wine.description}</p>
              <p>{wine.price}</p>
              <button
                placeholder="add to cart"
                onClick={() => addToCart(wine)}
                id="cartKnapp"
              >
                Add to Cart
              </button>
              <button onClick={() => decrementCart(wine)} id="cartKnapp">
                -1
              </button>
              <button onCLick={() => saveToWishList()}>Save to Wishlist</button>
              <button onClick={() => removeWishList()}>remove Wishlist</button>
            </div>
          </div>
        ))}
        {/* {handleGetJson()} */}
        {/* {console.log(bottles)} */}
      </div>
    </div>
  );
}

export default WineBottles;
