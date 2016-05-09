import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {App,
  Home,
  About,
  HandDistribution,
  SuitBreak,
  NotFound
} from './containers';

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore} from 'react-router-redux'

/**
 * Component is exported for conditional usage in Root.js
 */
export default class Root extends Component {
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
            { /* Home (main) route */ }
            <IndexRoute component={Home}/>

            { /* Routes */ }
            <Route path="about" component={About}/>
            <Route path="SuitBreak" component={SuitBreak}/> }
            <Route path="Distribution/Hand" component={HandDistribution}/>

            { /* Catch all route */ }
            <Route path="*" component={NotFound} status={404} />
          </Route>
          </Router>
      </Provider>
    );
  }
};
