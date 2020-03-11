import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { signup, login } from '../queries/AuthenticationQueries';
import { connect } from 'react-redux';
import { setClient } from '../actions/clientActions';
import { changeIsLogged } from '../actions/userActions';
import { withRouter } from 'react-router';

interface State {
  showSignUp: boolean;
  showLogin: boolean;
  newAccount: any;
  newLoging: any;
}

interface Props {
  history: any;
  setClient: any;
  client: any;
  changeIsLogged: any;
  id: number;
  name: string;
  isLogged: boolean;
}

class Navigation extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      showSignUp: false,
      showLogin: false,
      newAccount: {
        email: '',
        username: '',
        name: '',
        password: '',
      },
      newLoging: {
        usernameOrEmail: '',
        password: '',
      },
    };

    this.onSignUpClick = this.onSignUpClick.bind(this);
    this.onModalSignUpClick = this.onModalSignUpClick.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onModalLoginClick = this.onModalLoginClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onSignUpClick() {
    this.setState(() => ({ showSignUp: true }));
    console.log(this.props);
  }

  onModalSignUpClick() {
    console.log('Signup');
    signup(this.state.newAccount)
      .then(response => {
        console.log('Sucess');
      })
      .catch(error => {
        console.log('Error');
      });
    this.setState(() => ({ showSignUp: false }));
  }

  onLoginClick() {
    this.setState(() => ({ showLogin: true }));
  }

  async onModalLoginClick() {
    console.log('Login');
    await login(this.state.newLoging)
      .then(async response => {
        const newClient = {
          headers: {
            authorization: `Bearer ${response.accessToken}`,
          },
          uri: 'http://localhost:8080/graphql',
        };
        this.props.setClient(newClient);
        this.props.changeIsLogged(true);
        this.props.history.push('/user');
        console.log('Sucess');
      })
      .catch(error => {
        console.log('Error');
      });
    this.setState(() => ({ showSignUp: false }));
    this.setState(() => ({ showLogin: false }));
  }

  async onLogoutClick() {
    console.log('Logout');
    const newClient = {
      headers: {
        authorization: ``,
      },
      uri: 'http://localhost:8080/graphql',
    };
    this.props.setClient(newClient);
    this.props.changeIsLogged(false);
    this.props.history.push('/');
    console.log('Sucess');
  }

  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#/">TPM</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#/">Home</Nav.Link>
          {this.props.isLogged ? (
            <Nav.Link href="#user">User</Nav.Link>
          ) : (
            <div />
          )}
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>
        <Form inline>
          {this.props.isLogged ? (
            <Button variant="outline-light" onClick={this.onLogoutClick}>
              Logout
            </Button>
          ) : (
            <div>
              <Button variant="outline-light" onClick={this.onSignUpClick}>
                Sign up
              </Button>
              &nbsp;&nbsp;
              <Button variant="outline-light" onClick={this.onLoginClick}>
                Login
              </Button>
            </div>
          )}
        </Form>

        <Modal
          show={this.state.showSignUp}
          onHide={() => this.setState(() => ({ showSignUp: false }))}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="Form.Email">
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e: any) => {
                  let temporaryAccount = this.state.newAccount;
                  temporaryAccount.email = e.target.value;
                  this.setState({ newAccount: temporaryAccount });
                }}
              />
            </Form.Group>
            <Form.Group controlId="Form.FirstName">
              <Form.Control
                type="text"
                placeholder="First name"
                onChange={(e: any) => {
                  let temporaryAccount = this.state.newAccount;
                  temporaryAccount.username = e.target.value;
                  this.setState({ newAccount: temporaryAccount });
                }}
              />
            </Form.Group>
            <Form.Group controlId="Form.LastName">
              <Form.Control
                type="text"
                placeholder="Last name"
                onChange={(e: any) => {
                  let temporaryAccount = this.state.newAccount;
                  temporaryAccount.name = e.target.value;
                  this.setState({ newAccount: temporaryAccount });
                }}
              />
            </Form.Group>
            <Form.Group controlId="Form.Password">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e: any) => {
                  let temporaryAccount = this.state.newAccount;
                  temporaryAccount.password = e.target.value;
                  this.setState({ newAccount: temporaryAccount });
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState(() => ({ showSignUp: false }))}
            >
              Close
            </Button>
            <Button variant="primary" onClick={this.onModalSignUpClick}>
              Sign Up
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showLogin}
          onHide={() => this.setState(() => ({ showLogin: false }))}
        >
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="Form.Email">
              <Form.Control
                type="email"
                placeholder="Email or User Name"
                onChange={(e: any) => {
                  let temporaryLogin = this.state.newLoging;
                  temporaryLogin.usernameOrEmail = e.target.value;
                  this.setState({ newAccount: temporaryLogin });
                }}
              />
            </Form.Group>
            <Form.Group controlId="Form.Password">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e: any) => {
                  let temporaryLogin = this.state.newLoging;
                  temporaryLogin.password = e.target.value;
                  this.setState({ newAccount: temporaryLogin });
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState(() => ({ showLogin: false }))}
            >
              Close
            </Button>
            <Button variant="primary" onClick={this.onModalLoginClick}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </Navbar>
    );
  }
}

function mapStatetoProps(state: any) {
  return {
    client: state.clientReducer.client,
    id: state.userReducer.id,
    name: state.userReducer.name,
    isLogged: state.userReducer.isLogged,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    setClient: (client: any) => {
      dispatch(setClient(client));
    },
    changeIsLogged: (isLogged: boolean) => {
      dispatch(changeIsLogged(isLogged));
    },
  };
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withRouter(Navigation));
