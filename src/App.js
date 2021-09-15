import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import AboutPage from "./About";

import WineBottles from "./components/wineCards/WineBottles";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    const newFetch = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      console.log(data);
      localStorage.setItem("/api/products", JSON.stringify(data));
    };
    newFetch();
  }, []);
  return (
    <Router>
      <div id="App">
        <Header />
        <Switch>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/About">
            <AboutPage />
          </Route>
          <Route>
            <WineBottles path="/" />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
