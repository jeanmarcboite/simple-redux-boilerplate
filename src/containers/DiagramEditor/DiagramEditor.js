import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {setParam, prefix} from '../../redux/modules/diagrameditor';
import _ from 'lodash';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavItem, NavItemLink, NavDropdown, MenuItem,
        Form, InputGroup, ListGroup, Button, ButtonGroup,
        DropdownButton, FormGroup, FormControl, Glyphicon} from 'react-bootstrap';
import DealDiagram from './DealDiagram';
import RandomOrg from 'random-org'
import math from 'mathjs'
import bigInt from 'big-integer';
import Deal from '../../modules/Deal.js';
import Dealer from '../../modules/Dealer.js';

// from http://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/
const TDgetContent = function(url) {
    // return new pending promise
    return new Promise((resolve, reject) => {
        // select http or https module, depending on reqested url
        const lib = url.startsWith('https') ? require('https') : require('http');
        const request = lib.get(url, (response) => {
            // handle http errors
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('Failed to load page, status code: ' + response.statusCode));
            }
            // temporary data holder
            const body = [];
            // on every content chunk, push it to the data array
            response.on('data', (chunk) => body.push(chunk));
            // we are done, resolve promise with those joined chunks
            response.on('end', () => resolve(body.join('')));
        });
        // handle connection errors of the request
        request.on('error', (err) => reject(err))
    })
};

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

class MissingDiagram extends React.Component {
    // faces = Array[13]
    suitDisplay = (faces, suit) => (<MissingListItem key={suit} suit={suit} faces={faces} deal={this.props.deal} handleClick={this.props.handleClick}/>)
    
    render = () => {
        const hand =this.props.deal.dealer.board.deck.suitCardFace
        return (<ListGroup>{hand.map(this.suitDisplay)}</ListGroup>);
    }
};

class DiagramEditor extends React.Component {
    logevent = (eventKey, event) => console.log(event.target);
    setParameter = (param, event) => this.props.actions.setParam(param, event.target.value);

    handleClick = (deal, suit, face, event) => {
        if (event.altKey) {
            console.log(deal)
        }
        if (event.ctrlKey) {
            deal.setOwner(suit, face, undefined)
        } else if (deal.getOwner(suit, face) == undefined) {
            deal.setOwner(suit, face, this.state.selected);
        }
        //this.props.actions.setParam('hn', deal.hn);
        // this will change the state, so don't need to force update
        this.handleSelect(this.state.selected);
    }
// I know I do not use event, but I need it so I can curry the function!
    handleSelect = (hand, event) => {
        const seatComplete = this.deal.seatComplete;
        for (let h = hand; h < seatComplete.length + hand; h++) {
            if (!seatComplete[h % seatComplete.length]) {
                this.props.actions.setParam('selected', h);
                return;
            }
        }
        this.props.actions.setParam('selected', undefined);
    }

    randomOrg = () => {
        var xhr = new XMLHttpRequest();
        // xhr.open("GET","https://www.random.org/integers/?num=10&min=0&col=10&base=16&max=65535&format=plain&rnd=new")
        xhr.open('GET', 'http://qrng.anu.edu.au/API/jsonI.php?type=hex16&size=1&length=20')
        xhr.withCredentials = false;
        
        xhr.onload = (e) => {
            if (xhr.status == 200) {
                console.log(xhr.responseText);
                console.log(JSON.parse(xhr.responseText).data);
                var x = JSON.parse(xhr.responseText).data.join('')
                var id = bigInt(x, 16)
                console.log(id.toString());
                this.props.actions.setParam('ID', id.toString(this.state.IDbase));
            }
            console.log(xhr.status)
        }
        
        xhr.send();
    }
    // Invoked when a component is receiving new props. This method is not called for the initial render.
    componentWillReceiveProps = (nextProps) => {
        console.log('componentWillReceiveProps');
        console.log(nextProps.state)
        this.setState(nextProps.state);
    }
    // invoked once, both on the client and server, immediately before the initial rendering occurs. 
    componentWillMount = () => {
        this.setState(this.props.state)
        const dealer = new Dealer();
        this.deal = new Deal(dealer);
        this.deal.id = this.props.state.ID;
        this.handleSelect(0);
    }

    get id() {
        return bigInt(this.state.ID, this.state.IDbase).toString();
    }
    render = () => {
        var centerStyle = {
            textAlign: 'center'
        }
        var key = 0;
        var setParam = _.curry(this.setParameter)
        let html = (<div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <h1>Diagram Editor</h1>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Form inline>
                        <Nav>
                            <NavDropdown eventKey={1} id="deal-nav-dropdown" title="Deal">
                                <MenuItem eventkey="1.1" onSelect={this.logevent} className="disabled">New</MenuItem>
                                <MenuItem eventkey="{1.2}" onSelect={this.randomOrg}>Random.org</MenuItem>
                                <MenuItem eventkey="{1.3}" onSelect={this.logevent}>Random</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventkey="{1.4}" onSelect={this.logevent} className="disabled">New</MenuItem>
                                <MenuItem eventkey="{1.5}" onSelect={this.logevent} className="disabled">Edit</MenuItem>
                                <MenuItem eventkey="{1.6}" onSelect={this.logevent} className="disabled">Edit with keyboard</MenuItem>
                                <MenuItem eventkey="{1.4}" onSelect={this.logevent} className="disabled">Save</MenuItem>
                            </NavDropdown>
                            <NavDropdown eventKey={10} id="display-nav-dropdown" title="Display">
                            </NavDropdown>
                        </Nav>
                        <FormGroup controlId="formDealID">
                            <FormControl type="text" placeholder="Deal id..." onChange={setParam('ID')} value={this.state.ID} size="33"/>
                            <FormControl componentClass="select" onChange={setParam('IDbase')} value={this.state.IDbase}>
                                <option value="0">Hand Notation (TODO)</option>
                                <option value="10">Decimal ID</option>
                                <option value="16">Hexadecimal</option>
                                <option value="36">Base 36</option>
                            </FormControl>
                        </FormGroup>
                    </Form>
                </Navbar>
                <DealDiagram deal={this.deal} selected={this.state.selected} handleSelect={this.handleSelect}>
                    <MissingDiagram deal={this.deal} handleClick={this.handleClick}/>
                </DealDiagram>
        </div>);

        return html;
    }
}

function mapStateToProps(state) {
    return {
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
)(DiagramEditor);
