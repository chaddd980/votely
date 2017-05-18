import React, { Component } from 'react';
import '../AllPolls.min.css';
import Poll from "./poll"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {showPoll} from "../redux/actions/pollActions";


class AllPolls extends Component {
  constructor(props) {
    super(props);
    this.state = {polls: null}
    this.alertOptions = {
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    };
    this.getUser = this.getUser.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getUser(){
    let self = this;
    axios.get("https://vote-chaddly-server.herokuapp.com/polls/allPolls")
      .then(function(res, rej){
        console.log(res)
        self.setState({polls:res.data})
      })
        .catch(function(err){
          console.log(err)
        })
  }

  handleClick(poll){
    this.props.action(showPoll(poll))
  }

  componentWillMount(){
    this.getUser()
  }
  render() {
    let style = {
      "padding": 0
    }
    let allPolls = ""
    if(this.state.polls){
      let container = []
      let polls = this.state.polls
      allPolls = polls.map((poll)=>
        <Link to="/pollDetails">
          <div onClick={()=>this.handleClick(poll)} className="middle-div">
            <Poll question={poll.question} user={poll.user} />
          </div>
        </Link>
      )
    }
    return (
      <div className='main-div'>
        <h1>All Polls</h1>
        <p>Chose a poll to vote on!</p>
        <ul style={style}>
          {allPolls}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state, prop) {
  return {
    poll: state.poll
  }
}
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(showPoll, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPolls);
