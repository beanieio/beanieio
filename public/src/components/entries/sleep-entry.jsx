import React from 'react';
import moment from 'moment';
import Rating from '../rating.jsx';
const debug = process.env.DEBUG || true;


const SleepEntry = ({entry}) => {
  if (debug) { console.log('sleep entry: ', entry); }
  return (
    <div className="feed-entry-container">
      <div className="feed-entry-header">
        <i className="feed-entry-icon mdi mdi-24px mdi-hotel"></i>
        <div className="feed-entry-time">{moment(entry.dateTime).calendar()}</div>
      </div>
      <div className="feed-entry-content">
        <div className="feed-entry-detail">{entry.sleepDuration} hours</div>
        <div className="feed-entry-detail"><Rating readonly value={entry.sleepQuality}/></div>
      </div>
    </div>
  );

};

export default SleepEntry;
