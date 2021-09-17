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
import Register from "./components/register/Register";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newFetch = async () => {
      setLoading(true);
      const response = await fetch("/api/products");
      const data = await response.json();
      console.log(data);
      localStorage.setItem("/api/products", JSON.stringify(data.products));
      setLoading(false);
    };
    newFetch();
  }, []);

  // if (loading === true) { if not mac
  if (loading === false) {
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
          <Switch>
            {/* <Route path="/Navbar">
              <NavbarPage />
            </Route> */}
          </Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
