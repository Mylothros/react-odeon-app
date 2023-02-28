import React from "react";
import { Provider } from "react-redux";

import "./App.scss";
import store from "./redux/store";
import Header from "./component/header/Header"
import Main from "./component/main/Main"

function App() {
  return (
    <Provider store={store}>
      <Header />
      <div className="app">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
