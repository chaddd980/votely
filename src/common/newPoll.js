import React, { Component } from 'react';
import '../newPoll.min.css';
import axios from 'axios';
import AlertContainer from 'react-alert';


class NewPoll extends Component {
  //
  constructor(props) {
    super(props);
    this.state = { option: "", optionCount: 1, options: []};
    this.alertOptions = {
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    };

    this.handlePollCreation = this.handlePollCreation.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    // this.handleKeyPress = this.handleKeyPress.bind(this);
    // this.handleRemoveOptionClick = this.handleRemoveOptionClick.bind(this);
  }
  handleQuestionChange(e){
    this.setState({ question: e.target.value })

  }

  handlePollCreation(e){
    e.preventDefault()
    let self = this
    let poll = {question: this.state.question, option: this.state.option}
    let optionsText = this.state.option
    optionsText = optionsText.replace(/ /g, "");
    let optionsArray = optionsText.split("\n")
    if(optionsArray.length < 2) {
      this.showAlert("Please enter at least 2 options")
    } else {
      this.setState({options: optionsArray})
      axios.post("https://vote-chaddly-server.herokuapp.com/polls/newPoll", poll).then(function(res){
        self.context.router.history.push('/')
      })
        .catch(function(err){
          console.log(err)
        })
    }
  }

  handleOptionChange(e) {
    this.setState({ option: e.target.value})
  }

  showAlert(message){
    this.msg.show(message, {
      time: 2000,
      type: 'error'
    });
  }

  render() {
    let style = {
      "min-height": "40vw"
    }

    return (
      <div style={style} className="col-md-6 col-md-offset-3 contain">
          <AlertContainer ref={(a) => this.msg = a} {...this.alertOptions} />
          <div className="form-area">
              <form role="form" onSubmit={this.handlePollCreation}>
              <br Style="clear:both"/>
                <h3 Style="margin-bottom: 25px; text-align: center;">New Poll</h3>
                <div className="form-group">
                  <input type="text" className="form-control" name="question" name="subject" placeholder="New Question" required onChange={this.handleQuestionChange}/>
                </div>
                <div className="form-group">
                  <textarea className="form-control" type="textarea" name="option" placeholder="Option" maxlength="140" rows="7" onChange={this.handleOptionChange}  ></textarea>
                </div>
                <button type="submit" id="submit" name="submit" className="btn btn-primary pull-right">Submit Poll</button>
              </form>
          </div>
      </div>
    );
  }
}

NewPoll.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default NewPoll
