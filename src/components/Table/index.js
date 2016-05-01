import React, { Component, PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {ButtonGroup, Glyphicon, Button, Table as BTable,
  FormGroup, ControlLabel, FormControl
} from 'react-bootstrap'

export default class Table extends Component {
  render() {
    console.log('render Table');
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
      </div>
    );
  }
}

Table.propTypes = {
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};
