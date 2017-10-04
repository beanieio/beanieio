import React, { Component } from 'react';
import PieChart from './charts/pie-chart.jsx';
import axios from 'axios';

const PieReport = ({type, data}) => {
  var id = 'pie-report-' + type.toLowerCase();
  var data = data || {
    labels: ['wheat', 'gluten', 'tree nuts', 'soy', 'dairy'],
    datasets: [{
      data: [10, 20, 30, 10, 5],
      backgroundColor: [
        '#46AAC2',
        '#FFCC57',
        '#FF6B57',
        '#6CC3D7',
        '#FFD77C'
      ]
    }],
  };
  return (
    <div className="pie-chart-container">
      <PieChart data={data} id={id} />
    </div>
  );
};

//to this pass props data and title
//wrap this in meal report, phystag report, emotag report
//this  should be wrapped in a pie-report container div which would include styling to place title and chart

//query outside of this

export default PieReport;