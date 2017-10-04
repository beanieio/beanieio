import React from 'react';
import moment from 'moment';
import Rating from '../rating.jsx';
const debug = process.env.DEBUG || false;

const PulseCheckEntry = ({entry}) => {
  if (debug) { console.log('pulse-check entry:', entry); }
  return (
    <div className="feed-entry-container">
      <i className="feed-entry-icon mdi mdi-24px mdi-heart-pulse"></i>
      <div className="feed-entry-content">
        <div className="feed-entry-detail-group">
          <div className="feed-entry-detail">Physical</div>
          <div className="feed-entry-detail"><Rating value={entry.physicalScore}/></div>
        </div>
        <div className="feed-entry-detail-group">
          <div className="feed-entry-detail">Emotional</div>
          <div className="feed-entry-detail"><Rating value={entry.emotionalScore}/></div>
        </div>
      </div>
      <div className="feed-entry-time">{moment(entry.datetime).calendar()}</div>
    </div>
  );

};

export default PulseCheckEntry;