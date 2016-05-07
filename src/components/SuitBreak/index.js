import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, FormControl, Table} from 'react-bootstrap'
import * as actions from './actions';
import JsonInspector from 'react-json-inspector';
import math from 'mathjs';

class SuitBreak extends React.Component {
  setParameter = (param, event) => {
    console.log(`setParameter ${param} to ${event.target.value}`);
    this.props.actions.setParam([param], event.target.value);
    console.log(`after setParameter ${param} to ${event.target.value}: state = ${this.props.state}`);
  }

  // Invoked whenever there is a prop change
  // Called BEFORE render
  componentWillReceiveProps = (nextProps) => {
    // Not called for the initial render
    // Previous props can be accessed by this.props
    // Calling setState here does not trigger an an additional re-render

    console.log(`componentWillReceiveProps: props = ${this.props}`);
    console.log(`componentWillReceiveProps: props.state = ${this.props.state}`);
    console.log(`componentWillReceiveProps: nextProps.state = ${nextProps.state}`);
    console.log(`componentWillReceiveProps: state.missing = ${this.state.missing}`);

    this.setState(nextProps.state);
  }


  tableRow = () => {
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

        data.push([left, right, math.round(math.divide(math.multiply(combinations, 100), totalCombinations), this.state.precision), combinations]);
      }
    }
    return data;
  }

  componentWillMount() {
    console.log('componentWillMount SuitBreak');
    console.log(this.props.state)
    console.log(this.state)
    this.setState(this.props.state)
    console.log(this.state)
  }
  componentDidMount() {
    console.log('componentDidMount SuitBreak');
  }
  componentWillUpdate() {
    console.log('componentWillUpdate SuitBreak');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate SuitBreak');
  }

  render() {
    console.log('render SuitBreak');
    var centerStyle = {
      textAlign: 'center'
    }
    var k = 0;
    var setParam = _.curry(this.setParameter)
    console.log("props.state, state ");
    console.log(this.props.state);
    console.log(this.state);

    return (
      <div class="container">
        <Table striped bordered condensed hover>
          <caption><h2>Suit Break probabilities for
            <input type="number" min="0" max="13" value={this.state.missing} onChange={setParam('missing')}/>
            missing cards</h2></caption>
          <thead>
            <tr>
              <th colSpan="2" style={centerStyle}>Vacant Places</th>
              <th colSpan="2" style={centerStyle} >Precision <input type="number"
                min="0" max="3"
                value={this.state.precision} onChange={setParam('precision')} size="3"/> digits</th>
            </tr>
            <tr>
              <th width="20%" style={centerStyle}> Left <input type="number"
                min="0" max="13" value={this.state.leftVacant} onChange={setParam('leftVacant')}/></th>
              <th width="20%" style={centerStyle}> Right <input type="number"
                min="0" max="13" value={this.state.rightVacant} onChange={setParam('rightVacant')}/></th>
              <th width="30%" style={centerStyle}>Prob (%) </th>
              <th width="30%" style={centerStyle}>&#x2211;(%)</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {this.tableRow().map(item => (<tr key={item[0]}>{item.map(el => (<td key={k++}>{el}</td>))}</tr>))}
          </tbody>
        </Table>
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
