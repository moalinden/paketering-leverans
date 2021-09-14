import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AboutPage from "./About"
// import WineBottles from "./components/wineCards/WineBottles";

import "bootstrap/dist/css/bootstrap.min.css";

import LoginPage from "./Login";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";





function App() {
  return (
    
    <Router>
        <div id="App">
          <Header />
          {/* <WineBottles /> */}
            <Switch>
              <Route path="/Login" component={LoginPage}>
                <LoginPage />
              </Route>
              <Route path="/About" component={AboutPage}>
                <AboutPage />
              </Route>
            </Switch>
          <Footer />
        </div>
    </Router>
  );
}

export default App;
