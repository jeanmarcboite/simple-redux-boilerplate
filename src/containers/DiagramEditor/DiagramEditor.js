import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {setParam, prefix} from '../../redux/modules/diagrameditor';
import _ from 'lodash';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavItem, NavItemLink, NavDropdown, MenuItem,
        Form, InputGroup,
        DropdownButton, FormGroup, FormControl, Glyphicon} from 'react-bootstrap';
import DealDiagram from './DealDiagram';
import RandomOrg from 'random-org'
import math from 'mathjs'

//import {XMLHttpRequest} from 'xmlhttprequest'
// from http://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/
const getContent = function(url) {
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

  randomOrg = () => {
    var xhr = new XMLHttpRequest();
    // xhr.open("GET","https://www.random.org/integers/?num=10&min=0&col=10&base=16&max=65535&format=plain&rnd=new")
    xhr.open('GET', 'http://qrng.anu.edu.au/API/jsonI.php?type=hex16&size=1&length=20')
      xhr.withCredentials = false;
    
    xhr.onload = (e) => {
      if (xhr.status == 200) {
        console.log(xhr.responseText);
        console.log(JSON.parse(xhr.responseText).data);
        var x = ["0x"].concat(JSON.parse(xhr.responseText).data).join('')
        var id = math.bignumber(x)
        console.log(id.toString());
        this.props.actions.setParam('ID', id.toString());
      }
      console.log(xhr.status)
    }
    
    xhr.send();
  }

  componentWillReceiveProps = (nextProps) => this.setState(nextProps.state);

  componentWillMount = () => {
    console.log(this.props)
      this.setState(this.props.state)
  }

  setID = (event) =>  {
    console.log(event.target.value);
    }
  render = () => {
    var centerStyle = {
      textAlign: 'center'
    }
    var key = 0;
    var setParam = _.curry(this.setParameter)

      return (<div>
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
              <MenuItem eventkey="{1.2}" onSelect={this.logevent}>Random</MenuItem>
              <MenuItem eventkey="{1.2}" onSelect={this.logevent} className="disabled">Save</MenuItem>
              <MenuItem divider />
            </NavDropdown>
            <NavDropdown eventKey={10} id="display-nav-dropdown" title="Display">
            </NavDropdown>
          </Nav>
          <FormGroup controlId="formDealID">
          <FormControl type="text" placeholder="Deal id..." onChange={setParam('ID')} value={this.state.ID} size="33"/>
          <FormControl componentClass="select" onChange={setParam('IDbase')} value={this.state.IDbase}>
        <option value="10">Hand Notation (TODO)</option>
        <option value="10">Decimal ID</option>
        <option value="16">Hexadecimal</option>
        <option value="36">Base 36</option>
      </FormControl>
          </FormGroup>
          </Form>
        </Navbar>
        <DealDiagram id={this.state.ID}/>
      </div>);
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
