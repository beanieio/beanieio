import React from 'react';
import Chart from 'chart.js';
import PieceLabel from 'chart.piecelabel.js';

const PieChart = ({data}) =>{
  var ctx = 'pieChart';
  var chart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      legend: {
        display: false
      },
      pieceLabel: {
        // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
        render: 'label',

        // precision for percentage, default is 0
        precision: 0,

        // identifies whether or not labels of value 0 are displayed, default is false
        showZero: false,

        // font size, default is defaultFontSize
        fontSize: 20,

        // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
        fontColor: 'white',

        // font style, default is defaultFontStyle
        fontStyle: 'bold',

        // font family, default is defaultFontFamily
        fontFamily: "'Lato', Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

        // draw label in arc, default is false
        arc: false,

        // position to draw label, available value is 'default', 'border' and 'outside'
        // default is 'default'
        position: 'border',

        // draw label even it's overlap, default is false
        overlap: false,
      }
    }
  });

  return <canvas id="pieChart"></canvas>;
};

export default PieChart;