import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch } from "react-redux"
import { addToStore, decrementItem, storeWishList } from "../../redux/actions";




function WineList(data) {
    const userChoice = data.data
    const productsState = useSelector((state) => state.storeSlice);
    const products = productsState.storedProducts;
    const dispatch = useDispatch();
    const filteredProducts = products.filter((element)=> element.category === userChoice)
    console.log(products)
    console.log(filteredProducts)

    const addToCart = (product) => {
        console.log("inside: ", productsState);
        const productToDispatch = productsState.products.find(
          (element) => element.id === product.id
        );
        console.log(productToDispatch);
        if (productsState.products.length < 1 || productToDispatch === undefined) {
          dispatch(addToStore(product));
        } else {
          dispatch(addToStore(productToDispatch));
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
      };
    
      const saveToWishList = () => {
    const wishList = productsState.products;
    const keyGen = Math.random() * 1000;
    localStorage.setItem(keyGen, wishList);
    dispatch(storeWishList(keyGen));
  };
  
  if(userChoice === ""){
      return (
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
                <p>{wine.price} kr</p>
                <button id="wishknapp" onClick={() => saveToWishList()}>
                  ♡
                </button>
                {/* <button id="wishknapp" onClick={() => removeWishList()}>remove</button> */}
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
          ))
        )
  }else {

    return (
        filteredProducts.map((wine ,index) => (
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
              <p>{wine.price} kr</p>
              <button id="wishknapp" onClick={() => saveToWishList()}>
                ♡
              </button>
              {/* <button id="wishknapp" onClick={() => removeWishList()}>remove</button> */}
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
        ))
    )
      
  }
}




   


export default WineList
