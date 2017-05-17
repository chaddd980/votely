import React from 'react';
import { Route } from 'react-router';

import App from './App';

export default (
  <Route path="/" component={App}/>
)

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
