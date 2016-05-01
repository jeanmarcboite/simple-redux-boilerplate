import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import SuitBreak from '../components/SuitBreak';
import About from '../components/About';
import DevTools from './DevTools';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore} from 'react-router-redux'

/**
 * Component is exported for conditional usage in Root.js
 */
module.exports = class Root extends Component {
  render() {
    const { store } = this.props;

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

    return (
      /**
       * Provider is a component provided to us by the 'react-redux' bindings that
       * wraps our app - thus making the Redux store/state available to our 'connect()'
       * calls in component hierarchy below.
       */
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <Route path="about" component={About}/>
<Route path="SuitBreak" component={SuitBreak}/>
</Route>
          </Router>
      </Provider>
    );
  }
};
