import React from 'react';
import moment from 'moment';
import Rating from '../rating.jsx';
const debug = process.env.DEBUG || false;

const ExerciseEntry = ({entry}) => {
  if (debug) { console.log('exercise entry: ', entry); }
  return (
    <div className="feed-entry-container">
      <i className="feed-entry-icon mdi mdi-24px mdi-bike"></i>
      <div className="feed-entry-content">
        <div className="feed-entry-detail-group">
          <div className="feed-entry-detail">2{entry.exerciseDuration} minutes</div>
          <div className="feed-entry-detail"><Rating readonly value={entry.exerciseIntensity} /></div>
        </div>
      </div>
      <div className="feed-entry-time">{moment(entry.datetime).calendar()}</div>
    </div>
  );

};

export default ExerciseEntry;
