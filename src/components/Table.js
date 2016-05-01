import React, { Component, PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {ButtonGroup, Glyphicon, Button, Table as BTable,
  FormGroup, ControlLabel, FormControl
} from 'react-bootstrap'

export default class Table extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleIncrement() {
    this.props.actions.increment();
  }

  handleDecrement() {
    this.props.actions.decrement();
  }

  render() {
    return (
      <div className="table-container">
        <BootstrapTable data={this.props.users}>
        <TableHeaderColumn dataField='id' isKey={true}>
          <ButtonGroup>
            <Button bsStyle="primary" bsSize="large" active onClick={() => {this.handleDecrement();}}><Glyphicon glyph="glyphicon glyphicon-minus"/></Button>
            <Button bsStyle="primary" bsSize="large" active onClick={() => {this.handleIncrement();}}><Glyphicon glyph="glyphicon glyphicon-plus"/></Button>
          </ButtonGroup>
        </TableHeaderColumn>
        <TableHeaderColumn dataField="name">
          <FormGroup controlID="formName">
            <ControlLabel>Name</ControlLabel>
          </FormGroup>
          </TableHeaderColumn>
          <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
          <TableHeaderColumn dataField="birthday">Bithday</TableHeaderColumn>
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
