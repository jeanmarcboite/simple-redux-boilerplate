import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {setParam, prefix} from '../../redux/modules/diagram';
import _ from 'lodash';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavItem, NavItemLink, NavDropdown, MenuItem,
        Form, InputGroup,
        DropdownButton, FormGroup, FormControl, Glyphicon} from 'react-bootstrap';
import DealDiagram from './DealDiagram';

class Diagram extends React.Component {
  logevent = (eventKey, event) => console.log(event.target)
    setParameter = (param, event) => this.props.actions.setParam([param], event.target.value);

  componentWillReceiveProps = (nextProps) => this.setState(nextProps.state);

  componentWillMount = () => {
    console.log(this.props)
      this.setState(this.props.state)
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
              <MenuItem eventkey="1.1" onSelect={this.logevent}>New</MenuItem>
              <MenuItem eventkey="{1.2}" onSelect={this.logevent}>Random.org</MenuItem>
              <MenuItem eventkey="{1.2}" onSelect={this.logevent}>Random</MenuItem>
              <MenuItem eventkey="{1.2}" onSelect={this.logevent}>Save</MenuItem>
              <MenuItem divider />
            </NavDropdown>
            <NavDropdown eventKey={10} id="display-nav-dropdown" title="Display">
            </NavDropdown>
          </Nav>
          <FormGroup controlId="formHorizontalEmail">
          <FormControl type="text" placeholder="Deal id..." size="33"/>
          <FormControl componentClass="select" onChange={setParam('IDbase')} value={this.state.IDbase}>
        <option value="0">Hand Notation</option>
        <option value="10">Decimal ID</option>
        <option value="16">Hexadecimal</option>
        <option value="36">Base 36</option>
      </FormControl>
          </FormGroup>
          </Form>
        </Navbar>
        <DealDiagram id="456"/>
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
)(Diagram);
