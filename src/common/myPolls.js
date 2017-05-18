import React, { Component } from 'react';
import Poll from "./poll"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {showPoll} from "../redux/actions/pollActions";

class MyPolls extends Component {
  constructor(props) {
    super(props);
    this.state = { myPolls: null};
    this.getUser = this.getUserPolls.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getUserPolls(){
    let user = localStorage.getItem("user")
    let self = this;
    axios.get("https://vote-chaddly-server.herokuapp.com/polls/" + user)
      .then(function(res, rej){
        console.log(res)
        self.setState({myPolls:res.data})
      })
      .catch(function(err){
        console.log(err)
      })
    }

    handleClick(poll){
      this.props.action(showPoll(poll))
    }

  componentWillMount(){
    this.getUserPolls()
  }


  render() {
    var style = {
      "margin-bottom": 20
    }
    let allPolls = ""
    if(this.state.myPolls){
      let polls = this.state.myPolls
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
        <h1 style={style} >My Polls</h1>
        <ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyPolls)
