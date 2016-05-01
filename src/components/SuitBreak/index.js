import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';
import {Link} from 'react-router';
import DevTools from '../../containers/DevTools';

class SuitBreak extends React.Component {
  render() {
    return (<div>
      <h1>SuitBreak</h1>
      <Link to={'/'}>Go home</Link>
        <DevTools />
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    precision: state.precision
  };
}


export default connect(
  mapStateToProps
)(SuitBreak);
