import React, {useState} from "react";
import "./wineBottles.css";
import WineList from "./WineList";

import { Nav, Col, Row, Button } from "react-bootstrap";

import { useSelector } from "react-redux";
import Loading from "../loading/Loading";

function WineBottles() {
  // const dispatch = useDispatch();
  const productsState = useSelector((state) => state.storeSlice);
  const products = productsState.storedProducts;
  const [wineCat, setWineCat] = useState("")
  // console.log("outside function: ", productsState);


  // const saveToWishList = () => {
  //   const wishList = productsState.products;
  //   const keyGen = Math.random() * 1000;
  //   localStorage.setItem(keyGen, wishList);
  //   dispatch(storeWishList(keyGen));
  // };
  // const removeWishList = (key) => {
  //   dispatch(removeWishList(key));
  //   const keyToRemove = productsState.keyToRemove;
  //   localStorage.removeItem(keyToRemove);
  // };

  const chooseWine = (cat) => {
    setWineCat(cat)
    console.log(cat)
    
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
                <Button id="navLink" onClick={() => chooseWine("")} style={{marginRight:'19px'}}>
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
              </Nav>
            </Row>
          </Col>
        </div>
        <div id="systembolaget">
          <div className="row">
            <WineList data={wineCat}/>
          </div>
        </div>
      </div>
    );
  }
}

export default WineBottles;
