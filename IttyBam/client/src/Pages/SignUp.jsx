import React from "react";
import { Row, Col, Input, Button } from "antd";
import { connect } from "react-redux";
import { signupUser } from "../actions/authActions";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null
    };
    this.handleAccountCreation = this.handleAccountCreation.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleAccountCreation() {
    const { firstName, lastName, email, password } = this.state;
    console.log("Creating account", this.state);
    this.props.signupUser({
      first_name: firstName,
      last_name: lastName,
      email,
      password
    });
  }

  handleKeyPress(e) {
    if (e.key == "Enter") {
      this.authAttempt();
    }
  }

  renderContents() {
    const { firstName, lastName, email, password } = this.state;
    return (
      <div>
        <div
          onKeyPress={this.handleKeyPress}
          style={{
            textAlign: "center",
            fontSize: 24,
            marginBottom: "2em"
          }}
        >
          Sign up below!
        </div>

        <Row gutter={20} type="flex" style={{ marginBottom: "1em" }}>
          <Col>
            <div>First Name</div>
            <Input
              placeholder="First Name"
              value={firstName}
              onChange={e => this.setState({ firstName: e.target.value })}
            />
          </Col>
          <Col>
            <div>Last Name</div>
            <Input
              placeholder="Last Name"
              value={lastName}
              onChange={e => this.setState({ lastName: e.target.value })}
            />
          </Col>
        </Row>
        <Row gutter={20} type="flex">
          <Col>
            <div>Email</div>
            <Input
              placeholder="Email"
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </Col>
          <Col>
            <div>Password</div>
            <Input
              placeholder="Password"
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </Col>
        </Row>
        <div style={{ textAlign: "center", marginTop: "2em" }}>
          <Button onClick={() => this.handleAccountCreation()} type="primary">
            Create Account
          </Button>
        </div>
      </div>
    );
  }

  renderSignUpBox() {
    const { email, password } = this.state;
    return (
      <Row
        style={{
          height: 400,
          width: 500,
          borderWidth: 1,
          backgroundColor: "#f0f0f0",
          borderStyle: "solid",
          borderColor: "#c0c0c0"
        }}
        type="flex"
        justify="center"
        align="middle"
      >
        <Col>{this.renderContents()}</Col>
      </Row>
    );
  }

  render() {
    return (
      <Row
        onKeyPress={this.handleKeyPress}
        style={{ height: "100vh", width: "100vw", backgroundColor: "#d6d6d6" }}
        type="flex"
        justify="center"
        align="middle"
      >
        <Col>{this.renderSignUpBox()}</Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  //   user: state.auth.user
});

export default connect(
  mapStateToProps,
  { signupUser }
)(SignUp);
