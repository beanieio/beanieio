import React, { Component } from 'react';
import ExerciseEntry from './exercise-entry.jsx';
import MealEntry from './meal-entry.jsx';
import WaterEntry from './water-entry.jsx';
import SleepEntry from './sleep-entry.jsx';
import PulseCheckEntry from './pulse-check-entry.jsx';
const debug = process.env.DEBUG || false;

const EntryItem = ({entry}) => {
  let entryItem = null;
  if (debug) { console.log(entry); }
  if (entry.type === 'Pulse') {
    return <PulseCheckEntry entry={entry}/>;
  } else if (entry.type === 'Sleep') {
    return <SleepEntry entry={entry}/>;
  } else if (entry.type === 'Exercise') {
    return <ExerciseEntry entry={entry}/>;
  } else if (entry.type === 'Water') {
    return <WaterEntry entry={entry}/>;
  } else if (entry.type === 'Meal') {
    return <MealEntry entry={entry}/>;
  }

  return (
    <div>{entryItem}</div>
  );

};

export default EntryItem;