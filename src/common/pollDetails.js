import React, { Component } from 'react';
import '../poll.min.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {showPoll} from "../redux/actions/pollActions";
import Button from 'react-bootstrap/lib/Button';
import axios from 'axios';
import AlertContainer from 'react-alert';
import Chart from "./chart";
var Confirm = require('react-confirm-bootstrap');



class PollDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {margin: 0, visibility: "hidden", optionChosen: '..'};
    this.alertOptions = {
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewOptionChange = this.handleNewOptionChange.bind(this);
  }

  handleClick(e){
    e.preventDefault()
    if(e.target.value === "Add a New Option") {
      this.setState({
        margin: 15,
        visibility: "visible",
        optionChosen: "New Option"
      })
    } else {
      console.log(e.target.value)
      this.setState({
        margin: 0,
        visibility: "hidden",
        optionChosen: e.target.value
      })
    }
  }

  handleDelete(e){
    let question = {question: this.props.poll.poll.question}
    let self = this
    axios.post('https://vote-chaddly-server.herokuapp.com/polls/delete', question).then(function(res){
      self.context.router.history.push('/')
    })
      .catch(function(err){
        console.log(err)
      })
  }

  handleNewOptionChange(e) {
    this.setState({ addedOption: e.target.value, newOption: true})
  }

  handleSubmit(e){
    e.preventDefault()
    if(this.state.optionChosen === ".." ) {
      this.showAlert("Please select one of the options")
    } else if(this.state.addedOption) {
      let options = this.state.options
      let counts = this.state.counts
      options.push(this.state.addedOption)
      counts.push(1)
      let option = {option: this.state.addedOption}
      let question = this.props.poll.poll.question
      this.setState({
        options: options,
        counts: counts
      })
      axios.post("https://vote-chaddly-server.herokuapp.com/polls/" + question, option)
    } else {
      let self = this
        let option = {option: this.state.optionChosen}
        let options = this.state.options
        let optionIndex = options.indexOf(option.option)
        let counts = this.state.counts
        let updatedCount = counts[optionIndex] + 1
        counts[optionIndex] = updatedCount
        if(this.state.newOption){
          this.setState({counts: counts, options: this.state.optionChosen})
        } else{
          this.setState({counts: counts})
        }
        let question = this.props.poll.poll.question
        axios.post("https://vote-chaddly-server.herokuapp.com/polls/" + question, option)
    }
  }

  showAlert(message){
    this.msg.show(message, {
      time: 2000,
      type: 'error'
    });
  }

  componentDidMount(){
    console.log('waddup famoly')
    let options = this.props.poll.poll.options
    let optionValues = []
    let optionsKeys = []
    for(var i=0; i<options.length; i++){
      let optionKey = Object.keys(options[i])
      optionsKeys = optionsKeys.concat(optionKey)
    }
    for(var i=0; i<optionsKeys.length; i++) {
      // debugger
      let optionValue = options[i][optionsKeys[i]]
      optionValues.push(optionValue)
    }
    this.setState({options: optionsKeys, counts: optionValues, user: this.props.poll.poll.user})
  }


  render() {
    const user = localStorage.getItem('user')
    let deletePoll = ""
    if (user === this.state.user) {
      deletePoll =
      <Confirm
          onConfirm={this.handleDelete}
          body="Are you sure you want to delete this?"
          confirmText="Confirm Delete"
          title="Deleting Stuff">
          <Button bsSize="lg" bsStyle="danger" block>Delete</Button>
      </Confirm>
    }
    let header = {
      "text-align": "center"
    }
    let list = {
      "margin-bottom": this.state.margin
    }
    let visibility = {
      "visibility": this.state.visibility,
      "marginBottom": this.state.margin
    }
    let extraOptions = ""
    let newOption = ""
    if(this.state.options){
      let options = this.state.options
      extraOptions = options.map((option)=>
        <option value={option} name={option} id={option}>{option}</option>
      )
    }
    if(user) {
      newOption =
        <option>Add a New Option</option>
    }

    return (
      <div className="main-div">
        <AlertContainer ref={(a) => this.msg = a} {...this.alertOptions} />
        <h2 style={header}>{this.props.poll.poll.question}</h2>
        <form className="col-md-6" onSubmit={this.handleSubmit}>
          <div className="form-group col-md-9">
            <label for="sel1">Select list:</label>
            <select onChange={this.handleClick} style={list} className="form-control" id="sel1">
              {extraOptions}
              {newOption}
              <option selected> .. </option>
            </select>
            <label for="newOption" className="sr-only">newOption</label>
            <input onChange={this.handleNewOptionChange} style={visibility} type="text" name="newOption" placeholder="New Option"/>
            <Button bsSize="lg" bsStyle="primary" block type="submit">Submit</Button>
            {deletePoll}
          </div>
        </form>
        <div className="col-md-6">
          <Chart options={this.state.options} counts={this.state.counts} />
        </div>
      </div>

    );
  }
}

function mapStateToProps(state, prop) {
  return {
    poll: state.poll
  }
}

PollDetails.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(PollDetails);
