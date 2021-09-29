import React from "react";
import "./Wishlist.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function Wishlist() {
  const wishList = useSelector((state) => state.storeSlice.wishList);
  const store = useSelector((state) => state.storeSlice.storedProducts);
  console.log(wishList);
  console.log(store);

  const getTotal = (product) => {
    const total = product.price * product.count;
    return total;
  };

  const totalPrice =
    (wishList.length > 0 &&
      wishList.reduce((previousValue, item) => {
        const price = getTotal(item);
        return previousValue + price;
      }, 0)) ||
    0;
  return (
    <div id="mainElectronContainer">
      <div id="productContainer">
        {wishList.map((product, index) => (
          <div className="col-1" id="wineBox" key={index}>
            <div id="bild">
              <img
                src={product.imageUrl}
                alt="wine and dinee"
                id="winePic"
              ></img>
            </div>
            <div id="wineFacts">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price} kr</p>
              <p>{product.count} st</p>
              <p>{getTotal(product)} kr</p>
            </div>
          </div>
        ))}
      </div>

      {totalPrice > 0 ? (
        <Button
          id="checkoutBtn"
          type="button"
          className="btn btn-info btn-block btn-lg"
        >
          <div className="d-flex justify-content-between">
            <span className="cart-price"> {totalPrice}kr</span>
            <span className="checkout-btn">
              Checkout
              <FontAwesomeIcon icon={faLongArrowAltRight} className="me-2" />
            </span>
          </div>
        </Button>
      ) : null}
    </div>
  );
}

export default Wishlist;
