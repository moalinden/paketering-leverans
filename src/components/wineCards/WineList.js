import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToStore, decrementItem } from "../../redux/actions";
import { isLoggedIn } from "../login/LoggedInCheck";
import handleWine from './handleWine';

function WineList(data) {
  const userChoice = data.data;
  const productsState = useSelector((state) => state.storeSlice);
  const products = productsState.storedProducts;
  const dispatch = useDispatch();
  const filteredProducts = products.filter(
    (element) => element.category === userChoice
  );

  const [loggedIn] = useState(isLoggedIn());

  const addToCart = (product) => {
    const productToDispatch = productsState.products.find(
      (element) => element.id === product.id
    );
    if (productsState.products.length < 1 || productToDispatch === undefined) {
      dispatch(addToStore(product));
    } else {
      dispatch(addToStore(productToDispatch));
    }
    if (loggedIn) {
      handleWine("add", product);
    }
  };

  const decrementCart = (product) => {
    const productToDispatch = productsState.products.find(
      (element) => element.id === product.id
    );
    if (productsState.products.length < 1 || productToDispatch === undefined) {
      return;
    } else {
      dispatch(decrementItem(productToDispatch));
    }
    if (loggedIn) {
      handleWine("decrease", product);
    }
  };

  if (userChoice === "") {
    return products.map((wine, index) => (
      <div className="col-1" id="wineBox" key={index}>
        <div id="bild">
          <img src={wine.imageUrl} alt="wine and dinee" id="winePic"></img>
        </div>
        <div id="wineFacts">
          <h3>{wine.name}</h3>
          <p>{wine.description}</p>
          <p>{wine.price} kr</p>

          <div id="cartButtons">
            <button
              placeholder="add to cart"
              onClick={() => addToCart(wine)}
              id="cartKnapp"
            >
              Add to Cart
            </button>
            <button onClick={() => decrementCart(wine)} id="cartKnapp">
              decrement
            </button>
          </div>
        </div>
      </div>
    ));
  } else {
    return filteredProducts.map((wine, index) => (
      <div className="col-1" id="wineBox" key={index}>
        <div id="bild">
          <img src={wine.imageUrl} alt="wine and dinee" id="winePic"></img>
        </div>
        <div id="wineFacts">
          <h3>{wine.name}</h3>
          <p>{wine.description}</p>
          <p>{wine.price} kr</p>

          <div id="cartButtons">
            <button
              placeholder="add to cart"
              onClick={() => addToCart(wine)}
              id="cartKnapp"
            >
              Add to Cart
            </button>
            <button onClick={() => decrementCart(wine)} id="cartKnapp">
              decrement
            </button>
          </div>
        </div>
      </div>
    ));
  }
}

export default WineList;
