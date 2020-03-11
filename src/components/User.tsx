import * as React from 'react';
import { connect } from 'react-redux';
import { changeName } from '../actions/userActions';
import { userModel } from '../models/userModel';
import Form from 'react-bootstrap/Form';

interface Props {
  onNameChange: any;
  id: any;
  name: any;
  isLogged: any;
}

class UserComponent extends React.Component<Props> {
  render() {
    return (
      <div>
        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea2">
            <Form.Label>User ID: {this.props.id}</Form.Label>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>User Name: {this.props.name}</Form.Label>
            <Form.Control as="input" onChange={this.props.onNameChange} />
          </Form.Group>

          <Form.Label>
            Is Logged:
            {this.props.isLogged ? <div>Logged</div> : <div>Not Logged</div>}
          </Form.Label>
        </Form>
      </div>
    );
  }
}

function mapPropsToState(state: any): userModel {
  return {
    id: state.userReducer.id,
    name: state.userReducer.name,
    isLogged: state.userReducer.isLogged,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onNameChange: (event: any) => {
      dispatch(changeName(event.target.value));
    },
  };
}

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(UserComponent);
