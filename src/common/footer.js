import React, { Component } from 'react';
import '../Footer.min.css';


class Footer extends Component {
  render() {
    var style = {
      "color": "white",
    };
    return (
      <footer className="text-center">
          <div className="footer-above">
              <div className="container">
                  <div className="row">
                      <div className="footer-col col-md-4 col-md-offset-4">
                          <h3 style={style}>View Code on Github</h3>
                          <ul className="list-inline">
                              <li>
                                  <a href="https://github.com/chaddd980" className="btn-social btn-outline"><span className="sr-only">GitHub</span><i className="fa fa-fw fa-2x fa-github"></i></a>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </footer>
    );
  }
}

export default Footer
