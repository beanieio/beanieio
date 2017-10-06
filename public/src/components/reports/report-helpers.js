import moment from 'moment';
import _ from 'lodash';

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

export const filterToCurrentWeek = (entries) => {
  return _.filter(entries, entry => moment(entry.datetime).isBetween(moment().startOf('week'), moment().endOf('week'), 'day', '[]'));
};
