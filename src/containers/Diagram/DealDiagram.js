import React from 'react';
import Deal from '../../modules/Deal.js';
import Dealer from '../../modules/Dealer.js';
import {ListGroup, ListGroupItem, Grid, Row, Col} from 'react-bootstrap'

class HandDiagram extends React.Component {
  suitDisplay = (suit) => suit.split('').join(' ').replace(/T/g, '10')
    
  render = () => {
    var redColor = {
      color: 'red'
    }

    const hand = this.props.hand.split('.');

    return (<ListGroup>
            <ListGroupItem>♠ {this.suitDisplay(hand[0])}</ListGroupItem>
            <ListGroupItem><span style={redColor}>♥</span> {this.suitDisplay(hand[1])}</ListGroupItem>
            <ListGroupItem><span style={redColor}>♦</span> {this.suitDisplay(hand[2])}</ListGroupItem>
            <ListGroupItem>♣ {this.suitDisplay(hand[3])}</ListGroupItem>
          </ListGroup>);
  }
};
 
export default class DealDiagram extends React.Component {
  render = () => {
    var redColor = {
      color: 'red'
    }
    const dealer = new Dealer();
    const deal = new Deal(dealer);
    deal.id = this.props.id;
   const hands = deal.hn.split(' ');
    return (<div class="container">
      <h1>Deal {deal.id}</h1>
      <Grid>
        <Row clsName="show-grid">
          <Col md={4}></Col>
          <Col md={4}><HandDiagram hand={hands[0]}/></Col>
          <Col md={4}></Col>
        </Row>
        <Row clsName="show-grid">
          <Col md={4}><HandDiagram hand={hands[1]}/></Col>
          <Col md={4}></Col>
          <Col md={4}><HandDiagram hand={hands[2]}/></Col>
        </Row>
        <Row clsName="show-grid">
          <Col md={4}></Col>
          <Col md={4}><HandDiagram hand={hands[3]}/></Col>
          <Col md={4}></Col>
        </Row>
      </Grid>
      {deal.hn}
    </div>);
  }
}
