import moment from 'moment';
import _ from 'lodash';

const aggregateCurrentWeek = (entries, field) => {
  entries = filterToCurrentWeek(entries);
  let week = [0, 1, 2, 3, 4, 5, 6].map(n => moment().startOf('week').add(n, 'days'));
  let totals = [0, 0, 0, 0, 0, 0, 0];
  entries.forEach(entry => totals[moment(entry.datetime).weekday()] += entry[field]);
  return {week, totals};
};

const filterToCurrentWeek = (entries) => {
  return _.filter(entries, entry => moment(entry.datetime).isSameOrAfter(moment.startOf('week')));
};

module.exports = filterToCurrentWeek;
module.exports = aggregateCurrentWeek;
