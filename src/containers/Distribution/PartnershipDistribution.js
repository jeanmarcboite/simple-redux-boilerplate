import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, FormControl, Table, RadioGroup, Radio, Checkbox} from 'react-bootstrap'
import math from 'mathjs';
import {setParam, prefix} from '../../redux/modules/distribution';
import _ from 'lodash';

class PartnershipDistribution extends React.Component {
  setParameter = (param, event) => this.props.actions.setParam([param], event.target.value);

  componentWillReceiveProps = (nextProps) => this.setState(nextProps.state);

  componentWillMount = () => this.setState(this.props.state)

  tableRows = () => {
    var data = [];
    const deckSize = this.props.suit.length * this.props.suit.count;
    /** your partner must choose this.props.hand.length cards in the remaining deck */
    let remainingCards = deckSize - this.props.hand.length;
    const totalCombinations = math.combinations(remainingCards, this.props.hand.length);
    var sumcombinations = 0;
    /** in the remaining cards, there are this many cards from other suits */
    let cardsToChooseFrom = remainingCards - (this.props.suit.length - this.state.cardCount);
    for (var partnerCardsInSuit = this.props.suit.length - this.state.cardCount; partnerCardsInSuit >= 0; partnerCardsInSuit--) {
      let combinations = math.multiply(math.combinations(cardsToChooseFrom, this.props.hand.length - partnerCardsInSuit), math.combinations(this.props.suit.length - this.state.cardCount, partnerCardsInSuit));
      let prob = math.multiply(100, math.divide(combinations, totalCombinations));
      sumcombinations += combinations;
      let sumprob = math.multiply(100, math.divide(sumcombinations, totalCombinations));
      data.push([partnerCardsInSuit, combinations.toLocaleString(),
        math.round(prob, this.state.precision),
        math.round(sumprob, this.state.precision)]);
      }
      return data;
    }

    render = () => {
      let key = 0;

      var centerStyle = {
        textAlign: 'center'
      }
      var setParam = _.curry(this.setParameter)
      return (<div class="container">
      <Table striped bordered condensed hover>
        <caption><h2>Partnership probabilities: you have
          <input type="number" min="0" max={this.props.suit.length} value={this.state.cardCount} onChange={setParam('cardCount')}/>
          cards in one suit</h2></caption>
        <thead>
          <tr>
            <th style={centerStyle}> Your partner</th>
            <th style={centerStyle}>Combinations</th>
            <th width="30%" style={centerStyle}>Prob (%) <input type="number"
              min="0" max="3"
              value={this.state.precision} onChange={setParam('precision')} size="3"/> digits</th>
            <th width="30%" style={centerStyle}>&#x2211;(%)</th>
          </tr>
        </thead>
        <tbody id="table-body">
          {this.tableRows().map(item => (<tr key={item[0]}>{item.map(el => (<td key={key++}>{el}</td>))}</tr>))}
        </tbody>
      </Table>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    suit: {count: 4, length: 13},
    hand: {count: 4, length: 13},
    state: state[prefix]
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({setParam}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartnershipDistribution);
