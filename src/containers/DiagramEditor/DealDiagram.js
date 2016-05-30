import React from 'react';
import Deal from '../../modules/Deal.js';
import Dealer from '../../modules/Dealer.js';
import {Button, ButtonGroup, ListGroup, ListGroupItem, Grid, Row, Col} from 'react-bootstrap'

const redColor = {
      color: 'red'
    }

const blackColor = {
      color: 'black'
    }
const blueColor = {
      color: 'blue'
}
const selected = {
    backgroundColor: 'lightgrey'
}

const unselected = {
}

const suits = [
  <span style={blueColor}>?</span>,
  <span style={blackColor}>♠</span>,
  <span style={redColor}>♥</span>,
  <span style={redColor}>♦</span>,
  <span style={blackColor}>♣</span>,
];

const suitSymbol = (suit) => (suit + 1 < suits.length) ? suits[suit + 1] : suits[0]

class HandDiagram extends React.Component {
    suitDisplay = (hand, suit) => (<ListGroupItem key={suit} onClick={this.props.onClick} style={this.props.style} bsStyle="success">{suitSymbol(suit)} {hand.split('').join(' ').replace(/T/g, '10')} </ListGroupItem>)
    
  render = () => {
    const hand = this.props.hand.split('.');
    return (<ListGroup>{hand.map(this.suitDisplay)}</ListGroup>);
  }
};

 
export default class DealDiagram extends React.Component {
    handSelected = (suit) => (suit == this.props.selected) ? selected : unselected

    render = () => {
        const hands = this.props.deal.hn.split(' ')
    return (<div class="container">
      <Grid>
        <Row className="show-grid">
          <Col md={4}></Col>
          <Col md={4}><HandDiagram hand={hands[0]} onClick={_.curry(this.props.handleSelect)(0)} style={this.handSelected(0)}/></Col>
          <Col md={4}></Col>
        </Row>
        <Row className="show-grid">
          <Col md={4}><HandDiagram hand={hands[3]} onClick={_.curry(this.props.handleSelect)(3)} style={this.handSelected(3)}/></Col>
            <Col md={4}>
            {this.props.children}
            </Col>
          <Col md={4}><HandDiagram hand={hands[1]} onClick={_.curry(this.props.handleSelect)(1)} style={this.handSelected(1)}/></Col>
        </Row>
        <Row className="show-grid">
          <Col md={4}></Col>
          <Col md={4}><HandDiagram hand={hands[2]} onClick={_.curry(this.props.handleSelect)(2)} style={this.handSelected(2)}/></Col>
          <Col md={4}></Col>
        </Row>
      </Grid>
    </div>);
  }
}
