import React, { useState } from "react";
import "./wineBottles.css";
import WineList from "./WineList";
import WishList from "../wishList/WishList";

import { Nav, Col, Row, Button } from "react-bootstrap";
import {
    favoriteProduct, removeWishList, saveToWishList
} from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import Loading from "../loading/Loading";

function WineBottles() {
  const productsState = useSelector((state) => state.storeSlice);
  const products = productsState.storedProducts;
  const [wineCat, setWineCat] = useState("");
  const dispatch = useDispatch();

  const chooseWine = (cat) => {
    setWineCat(cat);
    console.log(cat);
  };
  const saveToWishList = (wine) => {
    dispatch(favoriteProduct(wine));
    return true
  };
  const unfavoriteWine = (wine) => {
    dispatch(removeWishList(wine));
    return true
  }

  if (!products) {
    return <Loading />;
  } else {
    return (
      <div className="container">
        <div id="navbar">
          <Col>
            <Row className="justify-content-md-center">
              <Nav variant="tabs" id="navbar">
                <Button
                  id="navLink"
                  onClick={() => chooseWine("")}
                  style={{ marginRight: "19px" }}
                >
                  All Wine
                </Button>
                <Button id="navLink" onClick={() => chooseWine("red")}>
                  Red Wine
                </Button>
                <Button id="navLink" onClick={() => chooseWine("white")}>
                  White Wine
                </Button>
                <Button id="navLink" onClick={() => chooseWine("sparkling")}>
                  Sparkling Wine
                </Button>
                <Button id="navLink" onClick={() => chooseWine("")} style={{marginRight:'19px'}}>
                  All Wine
                </Button>
                {/*<Button id="navLink" onClick={() => saveToWishList()} style={{marginRight:'19px'}}>
                  Favorites
                </Button>*/}
              </Nav>
            </Row>
          </Col>
        </div>
        <div id="systembolaget">
          <div className="row">
            <WineList data={wineCat} />
          </div>
        </div>
      </div>
    );
  }
}

export default WineBottles;
