import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.min.css';
import { Provider } from "react-redux"
import store from "./redux/store"
import { connect } from 'react-redux';


const StoreInstance = store()

ReactDOM.render(
  <Provider store={StoreInstance}>
    <App />
  </Provider>,
  document.getElementById('app')
);
