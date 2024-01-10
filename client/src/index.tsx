import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import { PrismaneProvider, PRISMANE_COLORS } from "@prismane/core";

console.log("%csimply.", "color:#00bfff; font-size:16pt");

const theme = {
  colors: {
    primary: PRISMANE_COLORS.amethyst,
  },
};

ReactDOM.render(
  <React.StrictMode>
    <PrismaneProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </PrismaneProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
