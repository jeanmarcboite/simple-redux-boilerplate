import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, FormControl, Table, RadioGroup, Radio, Checkbox} from 'react-bootstrap'
import math from 'mathjs';
import * as actions from './actions';

function add_a_shorter_suit(hand) {
  const newHand = []
  for (var k = _.last(hand); k >= 0; k--)
  newHand.push(_.concat(hand, k));
  return newHand;
}

function numberOfEqualSuitLength(hand) {
  return hand.reduce(function(dCount, currentD){
    if(typeof dCount[currentD] !== "undefined"){
      dCount[currentD]++;
      return dCount;
    } else {
      dCount[currentD]=1;
      return dCount;
    }
  }, {});
}


class HandDistribution extends React.Component {
  setChecked = (event) => this.props.actions.set2Hands(event.target.checked)

  componentWillReceiveProps = (nextProps) => this.setState(nextProps.state);

  componentWillMount = () => this.setState(this.props.state)

  handCombinations = (handCount) => math.combinations(this.props.suit.count * this.props.suit.length, this.props.hand.length * handCount);

    tableRows = (handCount) => {
      var data = [];

      // start with arrays of one suit
      var distributions = _.range(this.props.suit.length, 0).map(a => [a])
      // replace arrays with arrays of one suit more
      while (distributions[0].length < this.props.suit.count) {
        distributions = _.flatMap(distributions.map(add_a_shorter_suit))
      }
      // filter distributions with wrong number of cards
      _.remove(distributions, el => _.reduce(el, (sum, n) => sum + n, 0) != this.props.hand.length * handCount);

      for (var d of distributions) {
        // find number of duplicates
        var dCount = numberOfEqualSuitLength(d)
        // divide by prod of factorial
        var div = (_.map(dCount, (x) => math.factorial(x))).reduce((p, y) => (p*y), 1);
        // number of permutations of the suits
        var m = math.divide(math.factorial(this.props.suit.count), div);
        // number of permutations for that specific distribution
        var combinations = d.map(x => math.combinations(this.props.suit.length, x)).reduce((p, y) => math.multiply(p, y), 1)
        // total number of combinations: multiply by the permutation count
        var cc = math.multiply(combinations, m);

        data.push(_.concat(d, [math.divide(math.multiply(cc, 100), this.handCombinations(handCount)), cc, m]));
      }

      return data;
    }

  render = () => {
    const centerStyle = {
      textAlign: 'center'
    }
    const rightStyle = {
      textAlign: 'right'
    }
    var key = 0;

    return (
      <div class="container">
        <Table striped bordered condensed hover>
          <caption><h2>Hand distribution probabilities</h2>
        <Checkbox checked={this.state.twohands} onChange={this.setChecked} >
      2 Hands, {parseInt(this.handCombinations(this.state.twohands ? 2 : 1)).toLocaleString()} hand combinations
    </Checkbox>
          </caption>
          <thead>
            <tr>
              <th colSpan={this.props.suit.count} style={centerStyle}>Distribution</th>
              <th style={centerStyle}>Probability</th>
              <th style={centerStyle}>Combinations</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {this.tableRows(this.state.twohands ? 2 : 1).map(item => (<tr key={key++}>{item.map(el => (<td key={key++} style={rightStyle}>{(el > 0.001) ? el.toLocaleString() : el}</td>))}</tr>))}
          </tbody>
        </Table>
      </div>);
    }
  }

  function mapStateToProps(state) {
    return {
      suit: {count: 4, length: 13},
      hand: {count: 4, length: 13},
      state: state.handdistribution
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
  )(HandDistribution);
