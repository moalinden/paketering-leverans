import React, { useEffect, useState } from "react";
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

import { useDispatch, useSelector } from "react-redux";
import { loadWishList } from "./redux/actions";

import { isLoggedIn } from "./components/login/LoggedInCheck";
import { initialStore } from "./redux/actions";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  //////////////////////////////////////////////////////////////////////////////
  //////////////ELECTRON
  const store = useSelector((state) => state.storeSlice);
  const productsState = useSelector((state) => state.storeSlice.products);

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
  }, [loggedIn]);
  // OBS OBS! För claras dator funkar detta :
  // const isMobile = navigator.userAgentData.mobile;
  // if (isMobile !== true) {

  // på claras dator säger denna "hej mobil" alltid, kolla era i consolen
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    return (
      <Router>
        <div id="App">
          <Header />
          <Switch>
            <Route path="/Login" component={Login} />
            <Route path="/About" component={AboutPage} />
            <Route exact path="/" component={WineBottles}>
              {!loggedIn && <Redirect to="/Login" />}
            </Route>
            <Route exact path="/Register" component={Register} />
            <Route exact path="/Cart" component={Cart}>
              {loggedIn ? <Redirect to="/Cart" /> : <Redirect to="/Login" />}
            </Route>
            <Route exact path="/logout" component={LogOut} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  } else if (navigator.userAgent.includes("Electron")) {
    return (
      <Router>
        <div id="App">
          <Header />
          <Switch>
            <Route path="/Login" component={Login} />
            <Route path="/About" component={AboutPage} />
            <Route exact path="/" component={WineBottles}>
              {!loggedIn && <Redirect to="/Login" />}
            </Route>
            <Route exact path="/Register" component={Register} />
            <Route exact path="/Cart" component={Cart}>
              {!loggedIn && <Redirect to="/Login" />}
            </Route>
            <Route exact path="/logout" component={LogOut} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  } else {
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
}

export default App;
