import React from 'react';
import moment from 'moment';
import Rating from '../rating.jsx';

const SleepEntry = ({entry}) => {
  return (
    <div className="feed-entry-container">
      <div className="feed-entry-header">
        <i className="feed-entry-icon mdi mdi-24px mdi-hotel"></i>
        <div className="feed-entry-time">{moment().calendar()}</div>
      </div>
      <div className="feed-entry-content">
        <div className="feed-entry-detail">8 hours</div>
        <div className="feed-entry-detail"><Rating readonly value={4}/></div>
      </div>
    </div>
  );

};

export default SleepEntry;
