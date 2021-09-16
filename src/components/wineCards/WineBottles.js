import React from "react";
import "./wineBottles.css";

import { useDispatch, useSelector } from "react-redux";
import { addToStore, decrementItem } from "../../redux/actions";

//import result from ../../../server/index.js

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
  return (
    <div className="container" id="systembolaget">
      <div className="row">
        {products != undefined
          ? [
              products.map((wine, index) => (
                <div className="col-1" id="wineBox" key={index}>
                  <div id="bild">
                    {/* {console.log(wine)} */}
                    <img
                      src={wine.imageUrl}
                      alt="wine and dinee"
                      id="winePic"
                    ></img>
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
                  </div>
                </div>
              )),
            ]
          : null}
        {/* {handleGetJson()} */}
        {/* {console.log(bottles)} */}
      </div>
    </div>
  );
}

export default WineBottles;
