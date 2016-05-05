import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, FormControl, Table} from 'react-bootstrap'
import * as actions from './actions';
import JsonInspector from 'react-json-inspector';
import math from 'mathjs';

class SuitBreak extends React.Component {
  state = {
    precision: 1, //this.props.state.get('precision'),
  missing: 4,
    leftVacant: 12,
    rightVacant: 13
  }
  handlePrecision = (event) => {
    this.setState({precision: event.target.value})
    this.props.actions.setParam('precision', event.target.value);
  }
  handleMissing = (event) => {
    this.setState({missing: event.target.value})
    this.props.actions.setParam('missing', event.target.value);
  }
  handleLeftVacant = (event) => {
    this.setState({leftVacant: event.target.value})
    this.props.actions.setVacantPlaces('left', event.target.value);
  }
  handleRightVacant = (event) => {
    this.setState({rightVacant: event.target.value})
    this.props.actions.setVacantPlaces('right', event.target.value);
  }

leftRange = () => {
  var data = [];
let vacant = math.add(this.state.leftVacant, this.state.rightVacant);
let vacantPlaces = math.subtract(vacant, this.state.missing);
let totalCombinations = math.combinations(vacant, this.state.leftVacant);
  for (var left = 0; left <= this.state.missing; left++) {
    let right = math.subtract(this.state.missing, left);

    if ((left <= this.state.leftVacant) && (right <= this.state.rightVacant)) {
      let leftCombinations = math.combinations(this.state.missing, left);
      let vacantCombinations = math.combinations(vacantPlaces, math.subtract(this.state.leftVacant, left));
      let combinations = math.multiply(leftCombinations, vacantCombinations);

      data.push([left, right, math.round(math.divide(combinations, totalCombinations), this.state.precision), combinations]);
    }
  }
  return data;
}

  render() {
    var centerStyle = {
      textAlign: 'center'
}

    return (<div>
      <h1>SuitBreak</h1>
<input type="number" min="0" max="3" width="3" value={this.state.precision} onChange={this.handlePrecision}/>
    <h1>Table</h1>
      <div class="container">
    <Table striped bordered condensed hover>
  <caption><h2>Break probabilities for <input type="number" min="0" max="13" size="2" value={this.state.missing} onChange={this.handleMissing}/> missing cards</h2></caption>
    <thead>
      <tr>
        <th colSpan="2" style={centerStyle}>Vacant Places</th>
        <th colSpan="2" style={centerStyle} >Precision <input type="number"
          min="0" max="3"
          value={this.state.precision} onChange={this.handlePrecision} size="3"/> digits</th>
        </tr>
        <tr>
          <th width="20%" style={centerStyle}> Left <input type="number"
            min="0" max="13" value={this.state.leftVacant} onChange={this.handleLeftVacant}/></th>
          <th width="20%" style={centerStyle}> Right <input type="number"
              min="0" max="13" value={this.state.rightVacant} onChange={this.handleRightVacant}/></th>
            <th width="30%" style={centerStyle}>Prob (%) </th>
              <th width="30%" style={centerStyle}>&#x2211;(%)</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {this.leftRange().map(function(item) {
              return(<tr key={item[0]}><td>{item[0]}</td><td>{item[1]}</td><td>{item[2]}</td><td>{item[3]}</td></tr>)
            })}
          </tbody>
    </Table>
  </div>
</div>);
  }
}

function mapStateToProps(state) {
  return {
    state: state.suitbreak
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuitBreak);
