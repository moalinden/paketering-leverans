import React, { useEffect, useState } from "react";
import "./wineBottles.css";

import { useDispatch, useSelector } from "react-redux";
import { addToStore } from "../../redux/actions";

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

  // const [bottles, setBottles] = useState();
  // useEffect(() => {
  //   (async () => {
  //     const wines = await (await fetch("/api/products")).json();
  //     setBottles(wines.products);
  //     return wines;
  //   })();
  // }, []);

  //Axel korrigerade lite för att det ska funka med redux/localstorage

  return (
      <div className="container" id="systembolaget">
          
          <div className="row">
              {products != undefined ? [products.map((wine, index) => (
                  <div className="col-1" id="wineBox" key={index}>
                      <div id="bild">
                          {/* {console.log(wine)} */}
                          <img src={wine.imageUrl} alt="wine and dinee" id="winePic"></img>
                      </div>
                      <div id="wineFacts">
                          <h3>{wine.name}</h3>
                          <p>{wine.description}</p>
                          <p>{wine.price}</p>
                          {/*<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                              <div class="toast-header">
                                  <img src="..." class="rounded mr-2" alt="..." />
                                  <strong class="mr-auto">Notification</strong>
                                  <small class="text-muted">just now</small>
                                  <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                              <div class="toast-body">Product added to cart</div>
                          </div>*/}
                          <button id="cartKnapp" placeholder="add to cart"
                              onClick={() => addToCart(wine)}>Add to cart</button>
                      </div>
                  </div>
        ))
        ] : null 
           }
        {/* {handleGetJson()} */}
        {/* {console.log(bottles)} */}
      </div>
    </div>
  );
}

export default WineBottles;
