import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers';

import Quiz from './Quiz';

// eslint-disable-next-line import/prefer-default-export
export const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer(history),
  composeEnhancers(applyMiddleware(thunk)),
);

describe('Video Component', () => {
  test('should be rendered without error ', () => {
    shallow(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Quiz />
        </ConnectedRouter>
      </Provider>,
    );
  });

  test('should have valid props types', () => {
    const expectedProps = {
      color: 'string',
    };

    const error = checkPropTypes(
      Quiz.propTypes,
      expectedProps,
      'props',
      Quiz.name,
    );
    expect(error).toBeUndefined();
  });
});
