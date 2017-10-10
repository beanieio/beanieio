const _ = require('lodash');
const moment = require('moment');
const { User, Entry } = require('../models/models.js');
const TWO_WEEKS = moment.duration(2, 'weeks');
const ONE_MONTH = moment.duration(1, 'months');
const TWELVE_HOURS = moment.duration(12, 'hours');

/*
Given a feeling (and a feeling type: emotionalTags or physicalTags)
this gets the data needed to generate a correlation-ish report
Including:
  - matches: pulsecheck entries with that feeling
  - mealMatches: meals within 12 hours of a matched pulsecheck entry
  - raw: all raw entries in the past 2 weeks, separated by type
*/
const getCorrelationData = function(req, res) {
  const userId = req.user._id;
  let resData = {
    raw: {Meal: [], Water: [], Exercise: [], Sleep: [], Pulse: []},
    pulseMatches: [],
    mealMatches: [],
  };
  getEntriesForFeeling(userId, req.query.feeling, req.query.type)
    .then(matches => {
      resData.pulseMatches = matches;
      subqs = [];
      matches.forEach(entry => subqs.push(getPreceedingEntries(userId, entry, TWELVE_HOURS)));
      return Promise.all(subqs);
    }).then(subqRes => {
      results = _.uniqBy(_.flatten(subqRes), entry => entry._id.toString());
      resData.mealMatches = results.filter(r => r.type === 'Meal');
    }).then(() => getLastEntries(userId, TWO_WEEKS))
    .then(entries => {
      entries.forEach(entry => resData.raw[entry.type].push(entry));
      res.status(200).json(resData);
    }).catch(err => console.log(err));
};

// get all pulse entries for a specific feeling in the past month
const getEntriesForFeeling = function (userId, feeling, feelingType) {
  return Entry.find({userId: userId})
    .where('type').equals('Pulse')
    .where(feelingType).equals(feeling)
    .where('datetime').gt(moment().subtract(ONE_MONTH))
    .sort({datetime: 1}).exec();
};

// get the last X entries where X is a duration
const getLastEntries = function (userId, duration) {
  let startTime = moment().subtract(duration);
  return Entry.find({userId: userId})
    .where('datetime').gte(startTime).sort({datetime: 1}).exec();
};

// get all entries within a specified duration before a source entries
const getPreceedingEntries = function(userId, sourceEntry, duration) {
  let entryTime = moment(sourceEntry.datetime);
  let startTime = moment(entryTime).subtract(duration);
  return Entry.find({userId: userId}).where('datetime')
    .gte(startTime).lte(entryTime).sort({datetime: 1}).exec();
};

module.exports = getCorrelationData;
