import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { loadWishList } from "../../redux/actions";

function Wishlist() {
  //////////////////////////////////////////////////////////////////////////////
  //////////////ELECTRON
  const store = useSelector((state) => state.storeSlice);
  const productsState = useSelector((state) => state.storeSlice.products);
  const dispatch = useDispatch();

  const [menuChoice, setMenuChoice] = useState("");
  const { ipcRenderer } = window.require("electron");
  const remote = window.require("@electron/remote");
  const fs = window.require("fs");

  const { dialog } = remote;

  ipcRenderer.on("menuChoice", (ipcEvent, menuItemLabel) => {
    setMenuChoice(menuItemLabel);
  });

  useEffect(() => {
    if (menuChoice === "Save File") {
      let filePath = dialog.showSaveDialogSync({
        properties: ["createDirectory"],
      });
      let fileExtensionToUse = "myext";

      if (filePath) {
        if (
          filePath.slice(-fileExtensionToUse.length - 1) !==
          "." + fileExtensionToUse
        ) {
          filePath += "." + fileExtensionToUse;
        }
        fs.writeFileSync(
          filePath,
          JSON.stringify(productsState, null, "  "),
          "utf-8"
        );
      }
    }
    if (menuChoice === "Load File") {
      let filePaths = dialog.showOpenDialogSync({
        properties: ["openFile"],
        options: { filters: { extensions: [".wishlist"] } },
      });
      if (filePaths) {
        let json = fs.readFileSync(filePaths[0], "utf-8");
        let data = JSON.parse(json);
        data.forEach((element) => {
          dispatch(loadWishList(element));
        });
      }
    }
  }, [menuChoice]);
  //ELECTRON
  ////////////////////////////////////////////////////////////////////////
  const wishList = useSelector((state) => state.storeSlice.wishList);

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
