import React from 'react';
import moment from 'moment';
const debug = process.env.DEBUG || false;

const WaterEntry = ({entry}) => {
  if (debug) { console.log('water entry: ', entry); }
  return (
    <div className="feed-entry-container">
      <i className="feed-entry-icon mdi mdi-24px mdi-cup-water"></i>
      <div className="feed-entry-content">
        <div className="feed-entry-detail-group">
          <div className="feed-entry-detail">{entry.waterAmount} fl oz</div>
        </div>
      </div>
      <div className="feed-entry-time">{moment(entry.datetime).calendar()}</div>
    </div>
  );

};

export default WaterEntry;