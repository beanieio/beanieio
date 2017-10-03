import React from 'react';
import moment from 'moment';
import Rating from '../rating.jsx';

const ExerciseEntry = ({entry}) => {
  console.log(entry);
  return (
    <div className="feed-entry-container">
      <div className="feed-entry-header">
        <i className="feed-entry-icon mdi mdi-24px mdi-bike"></i>
        <div className="feed-entry-time">{moment(entry.datetime).calendar()}</div>
      </div>
      <div className="feed-entry-content">
        <div className="feed-entry-detail">2{entry.exerciseDuration} minutes</div>
        <div className="feed-entry-detail"><Rating readonly value={entry.exerciseIntensity} /></div>
      </div>
    </div>
  );

};

export default ExerciseEntry;
