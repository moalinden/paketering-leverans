import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LogOut from "./components/login/Logout";
import AboutPage from "./About";
import WineBottles from "./components/wineCards/WineBottles";
import Cart from "./components/cart/Cart";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

import { useDispatch } from "react-redux";
import { isLoggedIn } from "./components/login/LoggedInCheck";
import { initialStore } from "./redux/actions";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const newFetch = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      dispatch(initialStore(data.products));
    };
    newFetch();
    isLoggedIn();
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
          <Route exact path="/Cart" component={Cart} />
          <Route exact path="/logout" component={LogOut} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
