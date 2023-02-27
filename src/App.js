import React from "react";
import { Provider } from "react-redux";

import "./App.scss";
import store from "./redux/store";
import Header from "./component/header/Header"

function App() {
  return (
    <Provider store={store}>
      <Header />
      <div className="app">
        <h1>Deployment Successfull</h1>
      </div>
    </Provider>
  );
}

export default App;
