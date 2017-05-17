import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';
import randomColor from 'randomcolor';



class Chart extends Component {
  render() {
    let self = this
    var colors = randomColor({count: 3});
    var data = {
                labels: self.props.options,
                datasets: [{
                    data: self.props.counts,
                    backgroundColor: colors,
                    hoveBackgroundColor: colors
                }]
            };
    return (
      <div style={{'height':'370px'}}>
          <Pie data={data}
          options={{maintainAspectRatio: false, responsive: true}} />
      </div>
    );
  }
}

export default Chart
