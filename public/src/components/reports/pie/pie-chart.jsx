import React from 'react';
import Chart from 'chart.js';

const PieChart = () =>{
  var data = {
    datasets: [{
      data: [10, 20, 30, 10, 5],
      backgroundColor: [
        '#9FDCEB',
        '#FFE5AA',
        '#FFB4AA',
        '#6CC3D7',
        '#FFD77C'
      ]
    }],
  };
  var ctx = 'pieChart';
  var chart = new Chart(ctx, {
    type: 'pie',
    data: data
  });

  return <canvas id="pieChart" width="400" height="400"></canvas>;
};

export default PieChart;