import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Loading from "./components/loading/Loading";
import { useSelector, useDispatch } from "react-redux";

import AboutPage from "./About";
// import NavbarPage from "./components/navbar/Navbar";

import WineBottles from "./components/wineCards/WineBottles";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login/Login";
import Register from "./components/register/Register";

import { initialStore } from "./redux/actions";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from "./components/cart/Cart";

function App() {
  const currentProductState = useSelector((state) => state.storeSlice.products);

  const dispatch = useDispatch();

  useEffect(() => {
    const newFetch = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      dispatch(initialStore(data.products));
    };
    newFetch();
  }, []);

  return (
    <Router>
      <div id="App">
        <Header />
        <Switch>
          <Route path="/Login" component={Login} />
          <Route path="/About" component={AboutPage} />
          <Route exact path="/" component={WineBottles} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
