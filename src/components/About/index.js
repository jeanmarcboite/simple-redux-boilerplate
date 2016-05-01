import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router';

class About extends React.Component {
  render() {
    return (<div>
      <h1>About</h1>
      <Link to={'/'}>Go home</Link>
        <Link to={'/SuitBreak'}>SuitBreak</Link>
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
)(About);
