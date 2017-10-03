import React, { Component } from 'react';
import ExerciseEntry from './exercise-entry';
import MealEntry from './meal-entry';
import WaterEntry from './water-entry';
import SleepEntry from './sleep-entry';
import PulseCheckEntry from './pulse-check-entry';

const EntryItem = ({entry}) => {
  let entryItem = null;
  console.log(entry);
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