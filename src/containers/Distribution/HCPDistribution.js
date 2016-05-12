import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, FormControl, Table, RadioGroup, Radio, Checkbox} from 'react-bootstrap'
import math from 'mathjs';
import {setParam, prefix} from '../../redux/modules/distribution';
import _ from 'lodash';

class HCPDistribution extends React.Component {
    setChecked = (event) => this.props.actions.setParam('twoHands', event.target.checked);

    setParameter = (param, event) => this.props.actions.setParam([param], event.target.value);

    componentWillReceiveProps = (nextProps) => this.setState(nextProps.state);

    componentWillMount = () => this.setState(this.props.state)


    tableRows = (handCount) => {
        /* helper functions */
        const highCardsCount = (highCards) => _.reduce(highCards, _.add, 0);
        const highCardsCombination = (highCards) => highCards.map(el => math.combinations(this.props.hcp.length, el));
        const highCardsCombinations = (highCards) => _.reduce(highCardsCombination(highCards), _.multiply, 1);
        const highCardsPointCount = (highCards) => math.multiply(highCards, this.props.hcp);

        const lowCardsCount = this.props.suit.count * ( this.props.suit.length - this.props.hcp.length);
        const lowCards2Choose = (highCards) => (this.props.hand.length * handCount) - highCardsCount(highCards);
        const lowCardsCombinations = (highCards) => math.combinations(lowCardsCount, lowCards2Choose(highCards));

        /** gather all high cards combinations */
        const highCards = (handCount) => {
            var data = [[]];
            const add_a_high_card_count = (hand) => _.range(0, this.props.hcp.length + 1).map(a => _.concat(hand, a))

            while (data[0].length < this.props.hcp.length) {
                data = _.flatMap(data.map(add_a_high_card_count));
            }

            _.remove(data, a => highCardsCount(a) > this.props.hand.length * handCount);

            return data;
        }

        /* add different combinations */
        const combinationsReducer = (rows, highCards) => {
            const pointCount = highCardsPointCount(highCards);
            const combinations = math.multiply(highCardsCombinations(highCards),
                                               lowCardsCombinations(highCards));

            rows[pointCount] = math.add(combinations, rows[pointCount] || 0);

            return rows;
        }

        return _.reduce(highCards(handCount), combinationsReducer, {});
    }

    render = () => {
        const centerStyle = {
            textAlign: 'center'
        }
        const rightStyle = {
            textAlign: 'right'
        }
        var key = 0;

        const handCombinations = math.combinations(this.props.suit.count * this.props.suit.length, this.props.hand.length * (this.state.twoHands ? 2 : 1));
        const probability = (combinations) => math.divide(math.multiply(combinations, 100), handCombinations);

        const data = [];
        const addRow = (combinations, hcp) => {
            data.push([hcp, probability(combinations), combinations]);
        }
        _.forEach(this.tableRows(this.state.twoHands ? 2 : 1), addRow);

        return (
                <div class="container">
                <Table striped bordered condensed hover>
                <caption><h2>High card points probabilities</h2>
                <Checkbox checked={this.state.twoHands} onChange={this.setChecked} >
                multiple ({this.state.twoHands ? 2 : 1} hand{this.state.twoHands ? "s" : ""}, {handCombinations.toLocaleString()} hand combinations)
            </Checkbox>
                </caption>
                <thead>
                <tr>
                <th style={centerStyle}>High Cards Points</th>
                <th style={centerStyle}>Probability</th>
                <th style={centerStyle}>Combinations</th>
                </tr>
                </thead>
                <tbody id="table-body">
                {data.map(item => (<tr key={key++}>{item.map(el => (<td key={key++} style={rightStyle}>{(el > 0.01) ? el.toLocaleString() : el}</td>))}</tr>))}
            </tbody>
                </Table>
                </div>);
    }
}

function mapStateToProps(state) {
    return {
        hcp: [4, 3, 2, 1],
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
)(HCPDistribution);
