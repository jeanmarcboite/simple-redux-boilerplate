import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavItem, NavItemLink, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import Menu from 'react-motion-menu'
import SideNav from 'react-sidenav'
/**
* It is common practice to have a 'Root' container/component require our main App (this one).
* Again, this is because it serves to wrap the rest of our application with the Provider
* component to make the Redux store available to the rest of the app.
*/
class App extends React.Component {
  state = {menu: {isOpen: false}}
  handleOnOpen = () => {
    this.setState({menu: {isOpen: true}})
  }
  handleOnClose = () => {
    this.setState({menu: {isOpen: false}})
  }

  motionMenuInstance = (<Menu
    direction="vertical"
    distance={80}
    width={50}
    height={50}
    y={0}
    x={-10}
    customStyle={{
      color: "#fff",
      textAlign:"center",
      lineHeight:"50px",
      backgroundColor: "#16A085",
      border: "solid 1px #16A085",
      borderRadius: "50%"
    }}>
    <div><i className={this.state.menu.isOpen ? "fa fa-times" : "fa fa-bars"}></i></div>
    <Link to={'/'}><Glyphicon glyph="home"/></Link>
    <Link to={'/SuitBreak'}><Glyphicon glyph="stats"/></Link>
    <Link to={'/about'}><Glyphicon  glyph="align-left"/></Link>
  </Menu>)

  navbarInstance = (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to='/'>React-Bootstrap</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer to='/Diagram'><NavItem>Diagram Editor</NavItem></LinkContainer>
        <LinkContainer to='/SuitBreak'><NavItem>Suit Break</NavItem></LinkContainer>
        <NavDropdown eventKey={2} id="distribution-nav-dropdown" title="Distribution">
          <LinkContainer to='/Distribution/Hand'><NavItem>Hand Distribution</NavItem></LinkContainer>
            <LinkContainer to='/Distribution/Partnership'><NavItem>Partnership Distribution</NavItem></LinkContainer>
              <LinkContainer to='/Distribution/HCP'><NavItem>Hight Card Points</NavItem></LinkContainer>
        </NavDropdown>
        <LinkContainer to='/about'><NavItem >About</NavItem></LinkContainer>
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <LinkContainer to='/'><NavItem><Glyphicon glyph="home"/> Home</NavItem></LinkContainer>
          <MenuItem divider />
          <LinkContainer to='/about'><NavItem><Glyphicon  glyph="blackboard"/> About</NavItem></LinkContainer>
        </NavDropdown>
      </Nav>
    </Navbar>
  )

  render() {

    // we can use ES6's object destructuring to effectively 'unpack' our props
    const { users, actions } = this.props;

    if (process.env.NODE_ENV === 'production') {
      return (<div>
        {this.navbarInstance}
        {this.props.children}
      </div>);
    } else {
      return (
        <div>
          {this.navbarInstance}
          {this.props.children}
        </div>
      );
    }

  }
}

App.propTypes = {
  //users: PropTypes.array.isRequired,
  //actions: PropTypes.object.isRequired
};

/**
* Keep in mind that 'state' isn't the state of local object, but your single
* state in this Redux application. 'counter' is a property within our store/state
* object. By mapping it to props, we can pass it to the child component Counter.
*/
function mapStateToProps(state) {
  return {
    users: state.users
  };
}

/**
* Turns an object whose values are 'action creators' into an object with the same
* keys but with every action creator wrapped into a 'dispatch' call that we can invoke
* directly later on. Here we imported the actions specified in 'CounterActions.js' and
* used the bindActionCreators function Redux provides us.
*
* More info: http://redux.js.org/docs/api/bindActionCreators.html
*/
function mapDispatchToProps(dispatch) {
  return {
  };
}

/**
* 'connect' is provided to us by the bindings offered by 'react-redux'. It simply
* connects a React component to a Redux store. It never modifies the component class
* that is passed into it, it actually returns a new connected componet class for use.
*
* More info: https://github.com/rackt/react-redux
*/

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
