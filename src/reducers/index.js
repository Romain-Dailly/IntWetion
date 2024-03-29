import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import CardReducer from './CardReducer';

export default history => combineReducers({
  router: connectRouter(history),
  card: CardReducer,
});
