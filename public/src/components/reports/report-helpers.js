import moment from 'moment';
import _ from 'lodash';

// Helper methods useful in aggregating and filtering data for reporting
//  - each assumes input data as an array of entries (structured as returned from db)

// Aggregation helpers return an object with:
//   week - array of momentjs time objects to be used by charts as a time-axis
//   totals/avgs - array of aggregated values for each day of the current week
export const aggregateCurrentWeek = (entries, field) => {
  entries = filterToCurrentWeek(entries);
  let week = [0, 1, 2, 3, 4, 5, 6].map(n => moment().startOf('week').add(n, 'days'));
  let totals = [0, 0, 0, 0, 0, 0, 0];
  entries.forEach(entry => totals[moment(entry.datetime).weekday()] += entry[field]);
  return {week, totals};
};

export const aggregateAvgCurrentWeek = (entries, field) => {
  entries = filterToCurrentWeek(entries);
  let week = [0, 1, 2, 3, 4, 5, 6].map(n => moment().startOf('week').add(n, 'days'));
  let totals = [0, 0, 0, 0, 0, 0, 0];
  let counts = [0, 0, 0, 0, 0, 0, 0];
  entries.forEach(entry => {
    let day = moment(entry.datetime).weekday();
    totals[day] += entry[field];
    counts[day]++;
  });
  avgs = totals.map((tot, i) => count[i] ? tot / count : 0);
  return {week, avgs};
};

// returns an array filtered to the current week of data
export const filterToCurrentWeek = (entries) => {
  return _.filter(entries, entry => moment(entry.datetime).isBetween(moment().startOf('week'), moment().endOf('week'), 'day', '[]'));
};
