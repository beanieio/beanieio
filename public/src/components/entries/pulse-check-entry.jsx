import React from 'react';
import moment from 'moment';
import Rating from '../rating.jsx';
const debug = process.env.DEBUG || true;

const PulseCheckEntry = ({entry}) => {
  if (debug) { console.log('pulse-check entry:', entry); }
  return (
    <div className="feed-entry-container">
      <div className="feed-entry-header">
        <i className="feed-entry-icon mdi mdi-24px mdi-heart-pulse"></i>
        <div className="feed-entry-time">{moment(entry.datetime).calendar()}</div>
      </div>
      <div className="feed-entry-content">
        <div className="feed-entry-detail">Physical</div>
        <div className="feed-entry-detail"><Rating readonly value={entry.physicalScore}/></div>
        <div className="feed-entry-detail">Emotional</div>
        <div className="feed-entry-detail"><Rating readonly value={entry.emotionalScore}/></div>
      </div>
    </div>
  );

};

export default PulseCheckEntry;