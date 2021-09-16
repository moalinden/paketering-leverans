import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import AboutPage from "./About";
import NavbarPage from "./components/navbar/Navbar";

import WineBottles from "./components/wineCards/WineBottles";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div id="App">
        
        <Header />
        <WineBottles />
        <Switch>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/About">
            <AboutPage />
          </Route>
        </Switch>
        <Switch>
        <Route path="/Navbar">
            <NavbarPage />
          </Route>
        </Switch>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
