import React from 'react';

import {ListGroup, Button, ButtonGroup} from 'react-bootstrap'

class MissingListItem extends React.Component {
    style = (suit, face) => (this.props.deal.getOwner(suit, face) === undefined) ? 'primary' : 'warning'
    render = () => {
        return (
            <li
                className="list-group-item"
                onClick={() => {}}>
                <ButtonGroup bsSize="xsmall">
                    {this.props.faces.map((face, k) => {
                         return (<Button key={k} bsStyle={this.style(this.props.suit, face)} onClick={_.curry(this.props.handleClick)(this.props.deal, this.props.suit, face)}>{face}</Button>)
                     })}
                </ButtonGroup>
            </li>
        )
    }
};

export default class MissingDiagram extends React.Component {
    // faces = Array[13]
    suitDisplay = (faces, suit) => (<MissingListItem key={suit} suit={suit} faces={faces} deal={this.props.deal} handleClick={this.props.handleClick}/>)
    
    render = () => {
        const hand = this.props.deal.dealer.board.deck.suitCardFace
        return (<ListGroup>{hand.map(this.suitDisplay)}</ListGroup>);
    }
};
