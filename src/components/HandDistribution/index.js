import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, FormControl, Table} from 'react-bootstrap'
import math from 'mathjs';

class HandDistribution extends React.Component {
  tableRow = () => {
    var data = [];

    for (var d1 = 13; d1 >= 0; d1--) {
      for (var d2 = 13 - d1; d2 >= 0; d2--) {
        for (var d3 = 13 - (d1 + d2); d3 >= 0; d3--) {
          var d4 = 13 - (d1 + d2 + d3);
          if ((d4 <= d3) && (d3 <= d2) && (d2 <= d1)) {
            var m = 24;
            if (d4 == d3) {
              if (d3 == d2)
                m = 4;
              else
                m = 12;
            }
            else {
              if (d3 == d2)
                m = 12;
              else if (d2 == d1) {
                m = 12;
              }
            }

            var c12 = math.multiply(math.combinations(13, d1), math.combinations(13, d2))
            var c34 = math.multiply(math.combinations(13, d3), math.combinations(13, d4))
            var c1234 = math.multiply(c12, c34)
            var cc = math.multiply(c1234, m);

          data.push([((d1*13+d2)*13+d3)*13 + d4,d1, d2, d3, d4, cc, m]);
        }
      }
    }
  }

  return data;
}

render = () => {
  var centerStyle = {
    textAlign: 'center'
  }
  var key = 0;

  return (
    <div class="container">
      <Table striped bordered condensed hover>
        <caption><h2>Hand distribution probabilities</h2></caption>
        <thead>
          <tr>
            <th style={centerStyle}>KEY</th>
            <th colSpan="4" style={centerStyle}>Distribution</th>
            <th style={centerStyle}>Combinations</th>
            <th style={centerStyle}>Probability</th>
          </tr>
        </thead>
        <tbody id="table-body">
          {this.tableRow().map(item => (<tr key={item[0]}>{item.map(el => (<td key={key++}>{el}</td>))}</tr>))}
        </tbody>
      </Table>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    state: state.handdistribution
  };
}

export default connect(
  mapStateToProps
)(HandDistribution);
