import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from "./store";

import Header from './components/Header';
import Body from "./components/Body";

const year = new Date().getFullYear();
const current_date = new Date().toLocaleDateString("en-US");

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header year={year}/>
          <Body />
        </div>
      </Provider>
    );
  }
}

export default App;
