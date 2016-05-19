import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {ButtonGroup, Glyphicon, Button, Table as BTable,
  FormGroup, ControlLabel, FormControl
} from 'react-bootstrap'
import * as actions from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import JsonInspector from 'react-json-inspector';

class Table extends React.Component {
  render() {
    return (
      <div className="table-container">
        <BootstrapTable data={this.props.users}>
        <TableHeaderColumn dataField='id' isKey={true}>
          <ButtonGroup>
            <Button bsStyle="primary" bsSize="large" active onClick={() => {this.props.actions.decrement();}}><Glyphicon glyph="glyphicon glyphicon-minus"/></Button>
            <Button bsStyle="primary" bsSize="large" active onClick={() => {this.props.actions.increment();}}><Glyphicon glyph="glyphicon glyphicon-plus"/></Button>
          </ButtonGroup>
        </TableHeaderColumn>
        <TableHeaderColumn dataField="name">
          <FormGroup controlID="formName">
            <ControlLabel>Name</ControlLabel>
          </FormGroup>
          </TableHeaderColumn>
          <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
          <TableHeaderColumn dataField="birthday">Birthday</TableHeaderColumn>
      </BootstrapTable>
        <br />
        <JsonInspector data={this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
