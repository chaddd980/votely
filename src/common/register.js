import React, { Component } from 'react';
import '../Register.min.css';
import Button from 'react-bootstrap/lib/Button';
import axios from 'axios';
import AlertContainer from 'react-alert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchUser} from "../redux/actions/userActions";



class Register extends Component {

  constructor(props) {
    super(props);
    this.state = { username: "", email: "", password: "", confirmPassword: "", message: "", loggedIn: false, falseUser: '' };
    this.alertOptions = {
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    };
    this.handleUserRegistration = this.handleUserRegistration.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.validPasswordCheck = this.validPasswordCheck.bind(this);
    this.postUser = this.postUser.bind(this);
  }

  showAlert(message){
    this.msg.show(message, {
      time: 2000,
      type: 'error'
    });
  }

  postUser(user) {
      axios.post('https://vote-chaddly.herokuapp.com/users/register', user)
        .then(function(res){
        })
  }

  handleUserRegistration(e){
    e.preventDefault();
    this.setState({
      message: '',
      falseUser: ''
    })
    var self = this;
    let username = this.state.username;
    let email = this.state.email;
    let password = this.state.password;
    let confirmPassword = this.state.confirmPassword;
    this.validPasswordCheck(password, confirmPassword)
    let user = { username: username, email: email, password: password, confirmPassword: confirmPassword }
    axios.get(`https://vote-chaddly.herokuapp.com/users/register${username}`).then(function(res, rej) {
      if (!res.data) {
        self.postUser(user)
        localStorage.setItem('user', user.username)
        self.props.action(fetchUser(user))
        self.context.router.history.push('/')
      } else {
        self.showAlert('That username is already in use')
      }
    })
    .catch(function(err){
      console.log(err);
    })
  }

  validPasswordCheck(password, confirmPassword){
    if(password.length >= 6 && password === confirmPassword) {
      return true
    } else if (password.length < 6) {
      this.setState({
        message: "Please enter a password with at least 6 characters"
      }, () => {
        this.showAlert(this.state.message)
        return false
      })
    } else {
      this.setState({
        message: "Passwords do not match"
      }, () => {
        this.showAlert(this.state.message)
        return false
      })
    }
  }

  handleUserChange(e){
    this.setState({ username: e.target.value});
  }

  handleEmailChange(e){
    this.setState({ email: e.target.value});
  }

  handlePasswordChange(e){
    this.setState({ password: e.target.value});
  }

  handleConfirmPasswordChange(e){
    this.setState({ confirmPassword: e.target.value});
  }

  render() {
    var style = {
      "margin-bottom": 75,
    };
    return (
      <div style={style} className="main-div">
      <AlertContainer ref={(a) => this.msg = a} {...this.alertOptions} />
        <form className="form-signin" onSubmit={this.handleUserRegistration}>
          <h2 className="form-signin-heading">Please Create an Account</h2>
          <label for="inputUsername" className="sr-only">Username</label>
          <input type="username" id="inputUsername" className="form-control" placeholder="Username" required autofocus onChange={this.handleUserChange} />
          <label for="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus onChange={this.handleEmailChange} />
          <label for="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required onChange={this.handlePasswordChange} />
          <label for="inputPassword" className="sr-only">Confirm Password</label>
          <input type="password" id="confirmPassword" className="form-control" placeholder="Confirm Password" required onChange={this.handleConfirmPasswordChange} />
          <div className="checkbox">
            <label>
              <input type="checkbox" value="remember-me"/> Remember me
            </label>
          </div>
          <Button bsSize="lg" bsStyle="primary" block type="submit">Register</Button>
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

Register.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
