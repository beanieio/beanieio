import React from 'react';
import moment from 'moment';
import Rating from '../rating.jsx';

const ExerciseEntry = ({entry}) => {
  return (
    <div className="feed-entry-container">
      <div className="feed-entry-header">
        <i className="feed-entry-icon mdi mdi-24px mdi-run-fast"></i>
        <div className="feed-entry-time">{moment().calendar()}</div>
      </div>
      <div className="feed-entry-content">
        <div className="feed-entry-detail">45 minutes</div>
        <div className="feed-entry-detail"><Rating readonly value={3}/></div>
      </div>
    </div>
  );

};

export default ExerciseEntry;
