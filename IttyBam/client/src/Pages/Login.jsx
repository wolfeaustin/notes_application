import React from "react";
// import LoginBox from "../Components/LoginBox";
import { Col, Row, Input, Button, notification } from "antd";
import { connect } from "react-redux";
import { authenticateUser } from "../actions/authActions";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null
    };
    this.sendToSignUp = this.sendToSignUp.bind(this);
    this.authAttempt = this.authAttempt.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, user, history } = this.props;
    if (prevProps.error === null && error) {
      notification.error({
        message: `Error`,
        description: `${error.msg}`
      });
    }
    if (prevProps.user === null && user) {
      notification.success({
        message: "Welcome back!",
        description: `${user.user.email}`
      });
      history.push(`/user/${user.user.id}`);
    }
  }

  sendToSignUp() {
    this.props.history.push("/signup");
  }

  authAttempt() {
    const { email, password } = this.state;
    this.props.authenticateUser({ email, password });
  }

  handleKeyPress(e) {
    if (e.key == "Enter") {
      this.authAttempt();
    }
  }

  renderLoginBox() {
    const { email, password } = this.state;
    return (
      <Row
        style={{
          height: 300,
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
        <Col>
          <div
            style={{ fontSize: 24, textAlign: "center", marginBottom: "1em" }}
          >
            <div>We're glad you're back.</div>
            <div>We missed you!</div>
          </div>
          <div>Email</div>
          <Input
            style={{ marginBottom: ".5em" }}
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            placeholder="Email"
          />
          <div>Password</div>
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <div style={{ textAlign: "center", marginTop: "1em" }}>
            <Button type="primary" onClick={this.authAttempt}>
              Login
            </Button>
            <div>
              Don't have an account? <a onClick={this.sendToSignUp}>SignUp</a>
            </div>
          </div>
        </Col>
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
        <Col>{this.renderLoginBox()}</Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { authenticateUser }
)(Login);
