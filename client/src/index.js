import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducers from "./Store/Reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import WebSocketProvider from './WebSocket';

const store = createStore(rootReducers, compose(applyMiddleware(thunk)));
ReactDOM.render(
  <Provider store={store}>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </Provider>,
  document.getElementById("root")
);
