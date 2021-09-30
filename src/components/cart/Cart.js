// import React, {useEffect, useState} from "react";
// import "./Cart.style.css";

// import { useSelector, useDispatch } from "react-redux";
// import {
//   addToStore,
//   clearCart,
//   decrementItem,
//   deleteProduct,
// } from "../../redux/actions";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import handleWine from '../wineCards/handleWine';

// function Cart() {
//   const store = useSelector((state) => state.storeSlice);
//   const storeItems = store.products;
//   const dispatch = useDispatch();

//   const [cart, setCart] = useState();

//   useEffect(() => {
//     const newFetch = async () => {
//       let wines = await handleWine('get');

//       setCart(wines);
//     };
//     newFetch();
//   }, []);

//   const handleClick = (action, product) => {

//     handleWine(action, product);

//   }

//   const emptyCart = () => {
//     dispatch(clearCart());
//   };

//   const getTotal = (price, count) => {
//     const total = price * count;
//     return total;
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-12">
//           <h2 className="item-header"> Products in Cart</h2>
//         </div>
//       </div>

//       {cart != undefined ?
//         cart.map((product, index) => {
//         return (
//           <div key={index} className="col-md-12">
//             <table className="table table-bordered text-center">
//               <thead>
//                 <tr>
//                   <td>Product</td>
//                   <td>Name of Product</td>
//                   <td>Price</td>
//                   <td>Quantity</td>
//                   <td>Remove</td>
//                   <td>Total</td>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="imgCards">
//                     <img
//                       src="../media/red/Contrabandistes.jpg"
//                       alt="whinebottle"
//                     />
//                   </td>
//                   <td> {product.name}</td>
//                   <td> {product.price}kr</td>
//                   <td>
//                     <span
//                       className="button-3"
//                       id="minus-button"
//                       onClick={() => handleClick('decrease', product)}
//                     >
//                       {" "}
//                       -{" "}
//                     </span>
//                     {product.product_amount}
//                     <span
//                       className="button-3"
//                       id="add-button"
//                       onClick={() => handleClick('add', product)}
//                     >
//                       {" "}
//                       +{" "}
//                     </span>
//                   </td>
//                   <td>
//                     <FontAwesomeIcon
//                       icon={faTrash}
//                       className="userIcons"
//                       onClick={() => handleClick('remove', product)}
//                     />
//                   </td>
//                   <td>{getTotal(product.price, product.count)}</td>
//                 </tr>
//               </tbody>
//               <div className="buttonContainer">
//                 <button className="button-3">
//                   Total Amount: {getTotal(product.price, product.count)}kr
//                 </button>
//                 <p
//                   className="button-3"
//                   id="checkout"
//                   onClick={() => emptyCart()}
//                 >
//                   EMPTY CART
//                 </p>
//               </div>
//             </table>
//           </div>
//         );
//       })
//       :
//         null
//       }
//     </div>
//   );
// }

// export default Cart;

/*
Vi blev tvugna att skala av sena förändringar för att spara tid. Så koden ovanför är Timmies som vi beslöt att ersätta med gammal fungerande kod.
*/

import React, {useState, useEffect} from "react";
import "./Cart.style.css";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  addToStore,
  clearCart,
  decrementItem,
  deleteProduct,
} from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faLongArrowAltLeft,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import handleWine from '../wineCards/handleWine';
import { isLoggedIn } from "../login/LoggedInCheck";
import jwt_decode from "jwt-decode";


function Cart() {
  const history = useHistory();
  const store = useSelector((state) => state.storeSlice);
  const storeItems = store.products;
  const dispatch = useDispatch();

  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [products, setProducts] = useState();

  useEffect(() => {
    if(localStorage.getItem('products')){
      let token = localStorage.getItem('products');
      setProducts(jwt_decode(token));
    }

    isLoggedIn();
  }, [localStorage.getItem('products')]);

  const Increment = async(product) => {
    dispatch(addToStore(product));
    if(loggedIn){
      let token = await handleWine('add', product);
      setProducts(jwt_decode(token.token))
    }
  };
  const Decrement = async(product) => {
    dispatch(decrementItem(product));
    if(loggedIn){
      let token = await handleWine('decrease', product);
      setProducts(jwt_decode(token.token))
    }
  };
  const Deletion = async(product) => {
    dispatch(deleteProduct(product));
    if(loggedIn){
      let token = await handleWine('remove', product);
      setProducts(jwt_decode(token.token))
    }
  };
  const emptyCart = async() => {
    dispatch(clearCart());
    history.push("/");
    if(loggedIn){
      let token = await handleWine('clear');
      setProducts(jwt_decode(token.token))
    }
  };

  const getTotal = (item) => {
    const total = Number(item.price) * Number(item.count);
    return total;
  };
  const totalPrice =
    (storeItems.length > 0 &&
      storeItems.reduce((previousValue, item) => {
        const price = getTotal(item);
        return previousValue + price;
      }, 0)) ||
    0;

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card">
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-lg-7">
                    <h5 className="mb-3">
                      <a
                        onClick={() => history.push("/")}
                        className="text-body"
                        style={{ textDecoration: "none" }}
                      >
                        <FontAwesomeIcon
                          icon={faLongArrowAltLeft}
                          className="me-2"
                        />
                        Continue shopping
                      </a>
                    </h5>
                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                        <p className="mb-0">
                          You have {products != null ? products.productCount : 0} items in your cart
                        </p>
                      </div>
                    </div>
                    {products != null ? products.productDetails.map((product, index) => {
                      return (
                        <div>
                          <div key={index} className="card mb-3">
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-flex-start">
                                  <div>
                                    <img
                                      src={product.imageUrl}
                                      alt="whinebottle"
                                      className="img-fluid rounded-3"
                                      style={{ width: "65px" }}
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <h5>{product.name}</h5>
                                    <p className="small mb-0">
                                      {product.description}
                                    </p>
                                    <p className="sub-total">
                                      Sub-total:
                                      <span>{getTotal(product)} </span>
                                    </p>
                                  </div>
                                </div>
                                <div className="col-md-7 col-lg-3 col-xl-2 d-flex">
                                  <button
                                    className="btn btn-link px-2 cart-btn"
                                    onClick={() => Decrement(product)}
                                  >
                                    {" "}
                                    -{" "}
                                  </button>
                                  <button className="btn btn-link px-2 cart-btn2">
                                    {" "}
                                    {product.count}{" "}
                                  </button>
                                  <button
                                    className="btn btn-link px-2 cart-btn2"
                                    onClick={() => Increment(product)}
                                  >
                                    {" "}
                                    +{" "}
                                  </button>

                                  <div style={{ width: "80px" }}>
                                    <h5 className="price-tag">
                                      {product.price}kr
                                    </h5>
                                  </div>
                                  <div className="trash-btn2">
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      className="trash-icon"
                                      onClick={() => Deletion(product)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }) : null}
                    <div className="button-container">
                      <button
                        type="button"
                        className="btn btn-info btn-block btn-lg"
                        onClick={() => emptyCart()}
                      >
                        <div className="d-flex justify-content-between">
                          <span className="cart-price"> {totalPrice}kr</span>
                          <span className="checkout-btn">
                            Checkout
                            <FontAwesomeIcon
                              icon={faLongArrowAltRight}
                              className="me-2"
                            />
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
