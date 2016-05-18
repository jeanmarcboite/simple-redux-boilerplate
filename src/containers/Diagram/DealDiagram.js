import React from 'react';
import Deal from '../../modules/Deal.js';
import Dealer from '../../modules/Dealer.js';
import {ListGroup, ListGroupItem, Grid, Row, Col} from 'react-bootstrap'

const redColor = {
      color: 'red'
    }

const blackColor = {
      color: 'black'
    }
const blueColor = {
      color: 'blue'
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
  suitSymbol  = (suit) => <span style={redColor}>♥</span>
  suitDisplay = (hand, suit) => (<ListGroupItem key={suit}>{suitSymbol(suit)} {hand.split('').join(' ').replace(/T/g, '10')} </ListGroupItem>)
    
  render = () => {
    var redColor = {
      color: 'red'
    }

    const hand = this.props.hand.split('.');
    return (<ListGroup>{hand.map(this.suitDisplay)}</ListGroup>);
  }
};
 
export default class DealDiagram extends React.Component {
  render = () => {
    const dealer = new Dealer();
    const deal = new Deal(dealer);
    deal.id = this.props.id;
   const hands = deal.hn.split(' ');
    return (<div class="container">
      <h1>Page {deal.id + 1}</h1>
      <Grid>
        <Row clsName="show-grid">
          <Col md={4}></Col>
          <Col md={4}><HandDiagram hand={hands[0]}/></Col>
          <Col md={4}></Col>
        </Row>
        <Row clsName="show-grid">
          <Col md={4}><HandDiagram hand={hands[3]}/></Col>
          <Col md={4}></Col>
          <Col md={4}><HandDiagram hand={hands[1]}/></Col>
        </Row>
        <Row clsName="show-grid">
          <Col md={4}></Col>
          <Col md={4}><HandDiagram hand={hands[2]}/></Col>
          <Col md={4}></Col>
        </Row>
      </Grid>
      {deal.hn}
    </div>);
  }
}
