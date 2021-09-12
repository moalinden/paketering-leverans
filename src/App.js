import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";


import LoginPage from "./Login";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <Router>
        <div id="App">
          <Header />
            <Switch>
              <Route path="/Login" component={LoginPage}>
                <LoginPage />
              </Route>
            </Switch>
          <Footer />
        </div>
    </Router>
  );
}

export default App;
