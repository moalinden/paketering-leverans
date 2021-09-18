import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./redux/reducers";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

const middleware = [thunk]

const store = createStore(
  reducers, {}, composeWithDevTools(applyMiddleware(...middleware))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
