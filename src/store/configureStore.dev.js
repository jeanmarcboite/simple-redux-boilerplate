import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../redux/reducer';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import DevTools from '../containers/DevTools';
import persistState from 'redux-localstorage'
import persist from '../redux/persist';
/**
 * Entirely optional, this tiny library adds some functionality to
 * your DevTools, by logging actions/state to your console. Used in
 * conjunction with your standard DevTools monitor gives you great
 * flexibility!
 */
const logger = createLogger({level: 'log', collapsed: true});

const finalCreateStore = compose(
  // Middleware you want to use in development:
  applyMiddleware(logger, thunk),
  persistState(persist.paths, persist.config),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
)(createStore);

module.exports = function configureStore() {
  const store = finalCreateStore(rootReducer);

  return store;
};
