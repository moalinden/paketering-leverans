import React, { useEffect,useState } from "react";
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

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
  
function App() {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  
  
  useEffect(() => {
    const newFetch = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      dispatch(initialStore(data.products));
    };
    newFetch();
    isLoggedIn();
  }, []);
  
  const isMobile = navigator.userAgentData.mobile;
  if (isMobile !== true) {
    console.log("hej mobil")
    return (
      <Router>
        <div id="App">
          <Header />
          <Switch>
            <Route path="/Login" component={Login}/>
            <Route path="/About" component={AboutPage} />
            {/* <Route exact path="/" component={WineBottles} /> */}
            <Route exact path="/" component={WineBottles} >
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/Login" />}
            </Route>
            <Route exact path="/Register" component={Register} />
            <Route exact path="/Cart" component={Cart} >
              {loggedIn ? <Redirect to="/Cart" /> : <Redirect to="/Login" />}
            </Route>
            <Route exact path="/logout" component={LogOut} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }else {return (
    <Router>
      <div id="App">
        <Header />
        <Switch>
          <Route path="/Login" component={Login}/>
          <Route path="/About" component={AboutPage} />
          <Route exact path="/" component={WineBottles}/>
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Cart" component={Cart} />
          <Route exact path="/logout" component={LogOut} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );

  }

  
    

  // console.log(loggedIn)
  
  return (
    <Router>
      <div id="App">
        <Header />
        <Switch>
          <Route path="/Login" component={Login}/>
          <Route path="/About" component={AboutPage} />
          {/* <Route exact path="/" component={WineBottles} /> */}
          <Route exact path="/" component={WineBottles} >
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/Login" />}
          </Route>
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Cart" component={Cart} >
            {loggedIn ? <Redirect to="/Cart" /> : <Redirect to="/Login" />}
          </Route>
          <Route exact path="/logout" component={LogOut} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
