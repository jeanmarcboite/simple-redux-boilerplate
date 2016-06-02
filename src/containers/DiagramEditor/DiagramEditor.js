import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {setParam, prefix} from '../../redux/modules/diagrameditor';
import _ from 'lodash';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {Modal, Navbar, Nav, NavItem, NavItemLink, NavDropdown, MenuItem,
        Form, InputGroup, ListGroup, Button, ButtonGroup,
        DropdownButton, FormGroup, FormControl, Glyphicon} from 'react-bootstrap';
import bigInt from 'big-integer';

import Deal from '../../modules/Deal.js';
import Dealer from '../../modules/Dealer.js';

import DealDiagram from './DealDiagram';
import MissingDiagram from './MissingDiagram';

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

class DiagramEditor extends React.Component {
    logevent = (eventKey, event) => console.log(event.target);
    setParameter = (param, event) => this.props.actions.setParam(param, event.target.value);

    openModal = () => {
        this.setState({showModal: true})
    }

    hideModal = () => {
        this.setState({showModal: false})
    }

    toggleEdit = () => {
        const editable = !this.state.editable;
        if (editable)
            this.props.actions.setParam('selected', 0);
        else {
            this.props.actions.setParam('selected', undefined);
            if (this.deal.allSeatComplete)
                this.setState({ ID: this.deal.id });
        }

        this.setState({
            editable: editable,
            showModal: false
        })

        console.log(this.state);
    }

    handleClick = (deal, suit, face, event) => {
        if (event.altKey) {
            console.log(deal)
        }
        if (!this.state.editable) {
            this.openModal();
        } else {
            if (event.ctrlKey) {
                deal.setOwner([suit, face], undefined)
            } else if (deal.getOwner([suit, face]) == undefined) {
                deal.setOwner([suit, face], this.state.selected);
            }
            // set this.props.state.hn, so it will be persisted in the store
            this.props.actions.setParam('hn', deal.hn);
            this.handleSelect(this.state.selected);
        }
    }

    handleCardClick = (deal, suit, face, event) => {
        const cardClicked = this.deal.dealer.board.deck.indexOf(suit, face)
        let cardSelected = undefined
        console.log(event)
        console.log(`cardClick ${deal} ${suit} ${face}`)
        if (event.ctrlKey) {
            deal.setOwner([suit, face], undefined)
            this.props.actions.setParam('hn', deal.hn);
        } else if (event.shiftKey && this.state.cardSelected) {
            console.log(`swap ${cardClicked} and ${this.state.cardSelected}`)
            deal.swapOwner(this.state.cardSelected, cardClicked)
            this.props.actions.setParam('hn', deal.hn);
        } else {
            console.log(`select card ${cardClicked}`)
            cardSelected = cardClicked;
        }

        this.setState({ cardSelected: cardSelected})
    }

    // I know I do not use event, but I need it so I can curry the function!
    // It is not possible to specify a default to 'hand', or the function will be called
    // instead of curried, and there will be a loop, because state is changed during render
    handleSelect = (hand, event) => {
        if (this.state && this.state.editable) { 
            const selected = hand || 0
            const seatComplete = this.deal.seatComplete;
            for (let h = selected; h < seatComplete.length + selected; h++) {
                if (!seatComplete[h % seatComplete.length]) {
                    this.props.actions.setParam('selected', h);
                    return;
                }
            }
        }
        this.props.actions.setParam('selected', undefined);
    }

    randomQrng = () => {
        if (this.state.editable)
            return;

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

                if (this.state.IDbase > 0) 
                    this.props.actions.setParam('ID', id.toString(this.state.IDbase));
                else 
                    this.props.actions.setParam('ID', id.toString(16))

                this.setState({editable: false})
            }
            console.log(xhr.status)
        }
        
        xhr.send();
    }

    newDeal = () => {
        this.props.actions.setParam('hn', undefined);
    }

    setDeal = (state) => {
        if (this.deal == undefined) {
            const dealer = new Dealer();
            this.deal = new Deal(dealer);
        }

        if (state.ID == undefined)
            this.deal.hn = state.hn;
        else if (state.IDbase == 0)
            this.deal.hn = state.ID;
        else
            this.deal.id = bigInt(state.ID, state.IDbase).toString();

        this.setState(state);
    }
    // Invoked when a component is receiving new props. This method is not called for the initial render.
    componentWillReceiveProps = (nextProps) => {
        this.setDeal(nextProps.state)
    }
    // invoked once, both on the client and server, immediately before the initial rendering occurs. 
    componentWillMount = () => {
        this.setDeal(this.props.state)
        this.handleSelect(this.props.state.selected);
    }

    get id() {
        if (this.state.IDbase == 0)
            return this.state.ID;

        return bigInt(this.state.ID, this.state.IDbase).toString();
    }

    
    render = () => {
        const disabledIfEditable = () => (this.state.editable) ? "className='disabled'" : ""
        const randomItem = () => {
            if (this.state.editable)
                return (<MenuItem eventkey="{1.2}" className="disabled">Random (finish edit to activate)</MenuItem>);
            else
                return (<MenuItem eventkey="{1.2}" onSelect={this.randomQrng}>Random from qrng.anu.edu.au</MenuItem>);
        }

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
                                {randomItem()}
                                <MenuItem divider />
                                <MenuItem eventkey="{1.4}" onSelect={this.newDeal}>New</MenuItem>
                                <MenuItem eventkey="{1.5}" onSelect={this.toggleEdit}>{(this.state.editable) ? 'Finish edit' : 'Edit'}</MenuItem>
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
                <DealDiagram deal={this.deal} selected={this.state.selected} handleCardClick={this.handleCardClick} handleSelect={this.handleSelect} editable={this.state.editable}>
                    <MissingDiagram deal={this.deal} handleClick={this.handleClick} editable={this.state.editable}/>
                </DealDiagram>
                <Modal show={this.state.showModal} onHide={this.hideModal}>
                    <Modal.Body>
                        <h3>The diagram is not editable</h3>
                        You must first select 'Edit' in the deal menu, or
                        choose the 'Edit' button below.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.toggleEdit}>Edit</Button>
                        <Button onClick={this.hideModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
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
