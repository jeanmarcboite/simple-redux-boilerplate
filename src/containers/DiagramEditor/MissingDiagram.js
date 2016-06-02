import React from 'react';

import {ListGroup, ListGroupItem, Button, ButtonGroup} from 'react-bootstrap'

class MissingListItem extends React.Component {
    style = (suit, face) => (this.props.deal.getOwner([suit, face]) === undefined) ? 'primary' : 'warning'
    render = () => {
        return (
            <ListGroupItem bsStyle={this.props.bsStyle}>
                <ButtonGroup bsSize="xsmall">
                    {this.props.faces.map((face, k) => {
                         return (<Button key={k} bsStyle={this.style(this.props.suit, face)} onClick={_.curry(this.props.handleClick)(this.props.deal, this.props.suit, face)}>{face}</Button>)
                     })}
                </ButtonGroup>
            </ListGroupItem>
        )
    }
};

export default class MissingDiagram extends React.Component {
    // faces = Array[13]
    suitDisplay = (faces, suit) => (<MissingListItem key={suit} suit={suit} faces={faces} deal={this.props.deal} handleClick={this.props.handleClick} bsStyle={(this.props.editable) ? "info" : "warning"}/>)
    
    render = () => {
        if (!this.props.editable && this.props.deal.allSeatComplete)
            return (<div/>);

        const hand = this.props.deal.dealer.board.deck.suitCardFace
        return (<ListGroup bsStyle="info">{hand.map(this.suitDisplay)}</ListGroup>);
    }
};
