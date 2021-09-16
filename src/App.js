import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Loading from "./components/loading/Loading";

import AboutPage from "./About";
// import NavbarPage from "./components/navbar/Navbar";

import WineBottles from "./components/wineCards/WineBottles";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CartItems from "./components/cartItems/Cart";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newFetch = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      console.log(data);
      localStorage.setItem("/api/products", JSON.stringify(data.products));
      if (!data) {
        setLoading(true);
      }
    };
    newFetch();
  }, []);
  return (
    <BrowserRouter>
      <div id="App">
        <Header />
        <Switch>
          <Route path="/Login" component={Login}/> 
          <Route path="/About" component={AboutPage}/>
          <Route exact path="/" component={WineBottles} />
          <Route exact path="/cart" component={CartItems}/>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
