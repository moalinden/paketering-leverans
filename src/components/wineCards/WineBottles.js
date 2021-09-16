import React, { useEffect, useState } from "react";
import "./wineBottles.css";

import { Nav, Col, Row } from 'react-bootstrap';

import { useDispatch, useSelector } from "react-redux";
import { addToStore } from "../../redux/actions";

//import result from ../../../server/index.js

function WineBottles() {
    const dispatch = useDispatch();
    const productsState = useSelector((state) => state.storeSlice);
    const products = productsState.storedProducts;
    console.log(productsState);
    console.log(products);

    const addToCart = (product) => {
        console.log("products: ", productsState.products);
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
            <Col >
                <Row className="justify-content-md-center">
                    <Nav variant="tabs" defaultActiveKey="/App" style={{ padding: "40px" }} >
                        <h2 style={{ color: "#bf8596" }}>MENU</h2>
                        <Nav.Item>
                            <Nav.Link href="/App" style={{ color: "#bf8596" }}>
                                Red Wine
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/App" style={{ color: "#bf8596" }}>
                                White Wine
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/App" style={{ color: "#bf8596" }}>
                                Bubbles
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Row>
            </Col>

            <div className="row" id='testTest'>
                {products != undefined ? [
                    products.map((wine, index) => (
                        <div className="col-1" id="wineBox" key={index}>
                            <div id="bild">
                                {/* {console.log(wine)} */}
                                <img src={wine.imageUrl} alt="wine and dinee" id="winePic"></img>
                            </div>
                            <div id="wineFacts">
                                <h3>{wine.name}</h3>
                                <div id='detail'>
                                    <p>{wine.description}</p>
                                    <p>{wine.price}kr</p>
                                </div>
                                <button
                                    placeholder="add to cart"
                                    id="cartKnapp"
                                    onClick={() => addToCart(wine)}
                                > add to cart
                                </button>
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
