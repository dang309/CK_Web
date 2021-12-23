import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import ThemeConfig from "./theme/index";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { BrowserRouter } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "cropperjs/dist/cropper.css";

import "simplebar/dist/simplebar.min.css";

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeConfig>
        <BrowserRouter>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </BrowserRouter>
      </ThemeConfig>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
