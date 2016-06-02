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

const cardStyle = {
    backgroundColor: 'lightgrey'
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

class EditableListItem extends React.Component {
    style = (suit, face) => (this.props.deal.getOwner([suit, face]) === undefined) ? 'primary' : 'warning'
    render = () => {
        return (
            <ListGroupItem bsStyle={this.props.bsStyle}>
                <ButtonGroup bsSize="xsmall">
                    {this.props.faces.split('').map((face, k) => {
                         return (<Button key={k} style={cardStyle} onClick={_.curry(this.props.handleCardClick)(this.props.deal, this.props.suit, face)}>{face.replace(/T/g, '10')}</Button>)
                     })}
                </ButtonGroup>
            </ListGroupItem>
        )
    }
};

class HandDiagram extends React.Component {
    style = () => (this.props.seat == this.props.selected) ? selected : unselected
    bsStyle = () => (this.props.deal.seatComplete[this.props.seat]) ? 'success' : 'danger'

    suitDisplay = (hand, suit) => (<ListGroupItem {...this.props} key={suit} style={this.style()} bsStyle={this.bsStyle()}>{suitSymbol(suit)} {hand.split('').join(' ').replace(/T/g, '10')} </ListGroupItem>)
    editableDisplay = (faces, suit) => (<EditableListItem {...this.props} key={suit} suit={suit} faces={faces} deal={this.props.deal} handleClick={this.props.handleClick}  bsStyle={this.bsStyle()}/>)
    
    
    render = () => {
        const hand = this.props.deal.hn.split(' ')[this.props.seat].split('.');
        const onSelect = _.curry(this.props.handleSelect)(this.props.seat)
        const style = (this.props.seat == this.props.selected) ? selected : unselected
        const bsStyle = (this.props.deal.seatComplete[this.props.seat]) ? 'success' : 'danger'

      if (this.props.editable)
          return (<ListGroup onClick={onSelect} style={style} bsStyle={bsStyle}>{hand.map(this.editableDisplay)}</ListGroup>)
      else
          return (<ListGroup style={style} bsStyle={bsStyle}>{hand.map(this.suitDisplay)}</ListGroup>);
  }
};

 
export default class DealDiagram extends React.Component {

    render = () => {
        const hands = this.props.deal.hn.split(' ')
    return (<div class="container">
      <Grid>
        <Row className="show-grid">
          <Col md={4}></Col>
          <Col md={4}><HandDiagram {...this.props} seat={0}/></Col>
          <Col md={4}></Col>
        </Row>
        <Row className="show-grid">
            <Col md={4}><HandDiagram {...this.props} seat={3}/></Col>
            <Col md={4}>
                {this.props.children}
            </Col>
            <Col md={4}><HandDiagram {...this.props} seat={1}/></Col>
        </Row>
        <Row className="show-grid">
            <Col md={4}></Col>
            <Col md={4}><HandDiagram {...this.props} seat={2}/></Col>
          <Col md={4}></Col>
        </Row>
      </Grid>
    </div>);
  }
}
