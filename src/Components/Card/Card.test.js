import React from "react";
import { mount } from "enzyme";
import Card from "./Card";
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { createBrowserHistory } from "history";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import rootReducer from "../../reducers";

export const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer(history),
  composeEnhancers(applyMiddleware(thunk))
);

describe("Card Component", () => {
  test("should be rendered without error ", () => {
    mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Card />
        </ConnectedRouter>
      </Provider>
    );
  });
});
