const _ = require('lodash');
const moment = require('moment');
const { User, Entry } = require('./models/models.js');
const TWO_WEEKS = moment.duration(2, 'weeks');
const ONE_MONTH = moment.duration(1, 'months');
const TWELVE_HOURS = moment.duration(12, 'hours');

const getCorrelationData = function(req, res) {
  const userId = req.user._id;
  let resData = {Meal: [], Water: [], Exercise: [], Sleep: [], Pulse: []};
  getEntriesForFeeling(userId, req.body.query.feeling, req.body.query.type)
    .then(matches => {
      resData.matches = matches;
      subqs = [];
      matches.forEach(entry => subqs.push(getPreceedingEntries(userId, entry, TWELVE_HOURS)));
      return Promise.all(subqs);
    }).then(subqRes => {
      results = _.uniqBy(_.flatten(subqRes), entry => entry._id.toString());
      resData.meals = results.filter(r => r.type === 'Meal');
    }).then(() => getLastEntries(userId, TWO_WEEKS))
    .then(entries => {
      entries.forEach(entry => resData[entry.type] = entry);
      res.status(200).json(resData);
    }).catch(err => console.log(err));
};

const getEntriesForFeeling = function (userId, feeling, feelingType) {
  return Entry.find({userId: userId})
    .where(type).equals('Pulse')
    .where([feelingType]).equals(feeling)
    .where('datetime').gt(moment().subtract(ONE_MONTH));
};

const getLastEntries = function (userId, duration) {
  let startTime = moment().subtract(duration);
  return Entry.find({userId: userId}).where('datetime').gte(startTime);
};

const getPreceedingEntries = function(userId, sourceEntry, duration) {
  let entryTime = moment(entry.datetime);
  let startTime = entryTime.subtract(duration);
  return Entry.find({userId: userId}).where('datetime')
    .gte(startTime).lte(entryTime).exec();
};

module.exports = getCorrelationData;
