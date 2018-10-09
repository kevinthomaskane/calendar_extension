import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from "./store";

import Header from './components/Header'

const year = new Date().getFullYear()

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header year={year}/>
        </div>
      </Provider>
    );
  }
}

export default App;
