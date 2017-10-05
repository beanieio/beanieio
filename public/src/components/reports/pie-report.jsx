import React, { Component } from 'react';
import PieChart from './charts/pie-chart.jsx';
const debug = process.env.DEBUG || true;

const PieReport = ({type, data}) => {
  var id = 'pie-report-' + type.toLowerCase();
  if (debug) { console.log('pie-report is getting data: ', data); }
  return (
    <PieChart data={data} id={id} />
  );
};

export default PieReport;