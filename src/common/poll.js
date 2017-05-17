import React, { Component } from 'react';
import '../poll.min.css';


class Poll extends Component {
  render() {
    return (
      <div className='poll'>
        <div className="[ col-xs-12]">
            <div className="[ panel panel-default ] panel-google-plus">
                <div className="panel-heading">
                    <h3>Created By - {this.props.user}</h3>
                </div>
                <div className="panel-body">
                    <p>{this.props.question}</p>
                </div>
            </div>
        </div>
      </div>

    );
  }
}

export default Poll
