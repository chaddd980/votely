import React, { Component } from 'react';
import '../Login.min.css';
import Button from 'react-bootstrap/lib/Button';
import axios from 'axios';
import AlertContainer from 'react-alert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchUser} from "../redux/actions/userActions";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { username: "", password: ""};
    this.alertOptions = {
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    };
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUserLogin(e) {
    e.preventDefault();
    let username = this.state.username;
    let password = this.state.password;
    var self = this;
    let user = { username: username, password: password }
    axios.post('/users/login', user).then(function(res){
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', res.data.user.username)
      self.props.action(fetchUser(res.data.user))
      self.context.router.history.push('/')
    }).catch(err=> {
      console.log(err)
      this.showAlert("Invalid username or password")
    });
  }

  handleUserChange(e){
    this.setState({ username: e.target.value});
  }

  handlePasswordChange(e){
    this.setState({ password: e.target.value});
  }

  showAlert(message){
    this.msg.show(message, {
      time: 2000,
      type: 'error'
    });
  }

  render() {
    console.log(this.props)
    return (
      <div className="main-div">
        <AlertContainer ref={(a) => this.msg = a} {...this.alertOptions} />
        <form className="form-signin" onSubmit={this.handleUserLogin}>
          <h2 className="form-signin-heading">Please sign in</h2>
          <label for="inputUsername" className="sr-only">Username</label>
          <input type="username" id="inputUsername" className="form-control" placeholder="Username" required autofocus onChange={this.handleUserChange} />
          <label for="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required onChange={this.handlePasswordChange} />
          <div className="checkbox">
            <label>
              <input type="checkbox" value="remember-me"/> Remember me
            </label>
          </div>
          <Button bsSize="lg" bsStyle="primary" block type="submit">Sign in</Button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state, prop) {
  return {
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(fetchUser, dispatch)
  }
}
Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
