import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  browserHistory
} from 'react-router-dom';
import Main from './common/main.js';
import Login from './common/login.js';
import Register from './common/register.js';
import Poll from './common/poll.js';
import AllPolls from './common/allPolls.js';
import NewPoll from './common/newPoll.js';
import MyPolls from './common/myPolls.js';
import Footer from './common/footer.js';
import PollDetails from './common/pollDetails.js';
import routes from './routes'

class App extends Component {

  render() {
    return (
      <Router history={browserHistory} routes={routes}>
        <div>
          <Main />
          <Route exact path="/" component={AllPolls}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/poll" component={Poll}/>
          <Route path="/newPoll" component={NewPoll}/>
          <Route path="/myPolls" component={MyPolls}/>
          <Route path="/allPolls" component={AllPolls}/>
          <Route path="/pollDetails" component={PollDetails}/>
          <Footer className='foot' />
        </div>
      </Router>
    );
  }
}

export default App;



//   render() {
//     return (
      // <Router history={browserHistory} routes={routes}>
      //   <div>
      //     <Main />
      //     <Route exact path="/" component={AllPolls}/>
      //     <Route path="/login" component={Login}/>
      //     <Route path="/register" component={Register}/>
      //     <Route path="/poll" component={Poll}/>
      //     <Footer className='foot' />
      //   </div>
      // </Router>
//     );
//   }
// }
