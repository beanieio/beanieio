import React from 'react';
import moment from 'moment';
import Rating from '../rating.jsx';
const debug = process.env.DEBUG || false;


const SleepEntry = ({entry}) => {
  if (debug) { console.log('sleep entry: ', entry); }
  return (
    <div className="feed-entry-container">
      <i className="feed-entry-icon mdi mdi-24px mdi-hotel"></i>
      <div className="feed-entry-content">
        <div className="feed-entry-detail-group">
          <div className="feed-entry-detail">{entry.sleepDuration} hours</div>
          <div className="feed-entry-detail"><Rating readonly value={entry.sleepQuality}/></div>
        </div>
      </div>
      <div className="feed-entry-time">{moment(entry.dateTime).calendar()}</div>
    </div>
  );

};

export default SleepEntry;
