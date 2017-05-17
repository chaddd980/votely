import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchUser, logout} from "../redux/actions/userActions";
import {showPoll} from "../redux/actions/pollActions";


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: this.props.user.loggedIn, hi: "chadd"};
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.setState({loggedIn: false})
  }

  render() {
    const user = localStorage.getItem('user')
    let conditionalNav = ""
    if (!user) {
      conditionalNav =
        <Nav pullRight>
          <NavItem eventKey={1}><Link to="/login">Login</Link></NavItem>
          <NavItem eventKey={2}><Link to="/register">Register</Link></NavItem>
        </Nav>
    } else {
      conditionalNav =
        <Nav pullRight>
          <NavItem><Link to="/allPolls">All Polls</Link></NavItem>
          <NavItem><Link to="/myPolls">My Polls</Link></NavItem>
          <NavItem><Link to="/newPoll">Create New</Link></NavItem>
          <NavItem><Link to="/login" onClick={this.handleLogout}>Logout</Link></NavItem>
        </Nav>
    }
    return (
      <Navbar fixedTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Votely</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse defaultExpanded>
          {conditionalNav}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state, prop) {
  return {
    user: state.user,
    poll: state.poll
  }
}
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(logout, dispatch)
  }
}


export default connect(mapStateToProps)(Main)
