import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StylesProvider } from "@material-ui/core";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <StylesProvider injectFirst>
        <App />
      </StylesProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
