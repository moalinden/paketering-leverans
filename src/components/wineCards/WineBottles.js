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
      <div className="container">

        <div id="navbar">
            <Col >
                <Row className="justify-content-md-center">
                    <Nav variant="tabs" defaultActiveKey="/App"  id="navbar" >
                        {/* <h2>MENU</h2> */}
                        <Nav.Item>
                            <Nav.Link href="/App" id="navLink">
                                Red Wine
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/App" id="navLink">
                                White Wine
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/App" id="navLink">
                                Bubbles
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Row>
            </Col>
  </div>

    <div id="systembolaget">
      <div className="row">
        {products != undefined ? products.map((wine, index) => (
          <div className="col-1" id="wineBox" key={index}>
            <div id="bild">
              {/* {console.log(wine)} */}
              <img src={wine.imageUrl} alt="wine and dinee" id="winePic"></img>
            </div>
            <div id="wineFacts">
              <h3>{wine.name}</h3>
              <p>{wine.description}</p>
              <p>{wine.price} kr</p>
              <button id="wishknapp" onCLick={() => saveToWishList()}>♡</button>
              {/* <button id="wishknapp" onClick={() => removeWishList()}>remove</button> */}
              <button
                placeholder="add to cart"
                onClick={() => addToCart(wine)}
                id="cartKnapp"
                >
                Add to Cart
              </button>
              <button onClick={() => decrementCart(wine)} id="cartKnapp">
                Delete
              </button>
            </div>
          </div>
        )) :null }
        {/* {handleGetJson()} */}
        {/* {console.log(bottles)} */}
      </div>
    </div>
        </div>
  );
}

export default WineBottles;
