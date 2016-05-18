import React from 'react';
import Deal from '../../modules/Deal.js';
import Dealer from '../../modules/Dealer.js';
import {ListGroup, ListGroupItem, Grid, Row, Col} from 'react-bootstrap'
export default class DealDiagram extends React.Component {
  render = () => {
    var redColor = {
      color: 'red'
    }
    const dealer = new Dealer();
    const deal = new Deal(dealer);
    deal.id = this.props.id;
    return (<div class="container">
      <h1>Deal {deal.id}</h1>
      <Grid>
        <Row clsName="show-grid">
          <Col md={4}></Col>
          <Col md={4}>
            <ListGroup>
              <ListGroupItem>♠ ARD</ListGroupItem>
              <ListGroupItem><span style={redColor}>♥</span> ARD</ListGroupItem>
              <ListGroupItem><span style={redColor}>♦</span> ARD</ListGroupItem>
              <ListGroupItem>♣ 432</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={4}></Col>
        </Row>
        <Row clsName="show-grid">
          <Col md={4}>
          <ListGroup>
            <ListGroupItem>♠ ARD</ListGroupItem>
            <ListGroupItem><span style={redColor}>♥</span> ARD</ListGroupItem>
            <ListGroupItem><span style={redColor}>♦</span> ARD</ListGroupItem>
            <ListGroupItem>♣ 432</ListGroupItem>
          </ListGroup>
          </Col>
          <Col md={4}></Col>
          <Col md={4}>
          <ListGroup>
            <ListGroupItem>♠ ARD</ListGroupItem>
            <ListGroupItem><span style={redColor}>♥</span> ARD</ListGroupItem>
            <ListGroupItem><span style={redColor}>♦</span> ARD</ListGroupItem>
            <ListGroupItem>♣ 432</ListGroupItem>
          </ListGroup>
          </Col>
        </Row>
        <Row clsName="show-grid">
          <Col md={4}></Col>
          <Col md={4}>
          <ListGroup>
            <ListGroupItem>♠ ARD</ListGroupItem>
            <ListGroupItem><span style={redColor}>♥</span> ARD</ListGroupItem>
            <ListGroupItem><span style={redColor}>♦</span> ARD</ListGroupItem>
            <ListGroupItem>♣ 432</ListGroupItem>
          </ListGroup>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Grid>
      {deal.hn}
    </div>);
  }
}
