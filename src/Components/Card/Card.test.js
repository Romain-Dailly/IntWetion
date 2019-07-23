import React from 'react';
import { shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import Card from './Card';
import rootReducer from '../../reducers';

// eslint-disable-next-line import/prefer-default-export
export const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer(history),
  composeEnhancers(applyMiddleware(thunk)),
);

describe('Card Component', () => {
  test('should be rendered without error ', () => {
    shallow(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Card />
        </ConnectedRouter>
      </Provider>,
    );
  });
});
