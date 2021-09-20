import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
// import Footer from "./components/footer/Footer";
import Loading from "./components/loading/Loading";

import AboutPage from "./About";
// import NavbarPage from "./components/navbar/Navbar";

import WineBottles from "./components/wineCards/WineBottles";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login/Login";
import Register from "./components/register/Register";

import { useDispatch, useSelector } from "react-redux";
import { addToStore } from "./redux/actions";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Cart from "./components/cart/Cart";

function App() {
  const [loading, setLoading] = useState(true);
  const productsState = useSelector((state) => state.storeSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const newFetch = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      localStorage.setItem("/api/products", JSON.stringify(data.products));
      dispatch(addToStore(data.products));

      setLoading(false);
    };
    newFetch();
  }, []);

  if (loading) {
    return (
      <div id="app">
        <Loading />
      </div>
    );
  } else {
    return (
      <Router>
        <div id="App">
          <Header />
          <Switch>
            <Route path="/Login">
              <Login />
            </Route>
            <Route path="/Register">
              <Register />
            </Route>
            <Route path="/About">
              <AboutPage />
            </Route>
            <Route>
              <WineBottles path="/" />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
