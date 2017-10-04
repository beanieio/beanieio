import React from 'react';
import moment from 'moment';
const debug = process.env.DEBUG || false;

const MealEntry = ({entry}) => {
  if (debug) { console.log('meal entry: ', entry); }
  return (
    <div className="feed-entry-container">
      <i className="feed-entry-icon mdi mdi-24px mdi-food-variant"></i>
      <div className="feed-entry-content">
        <div className="feed-entry-detail-group">
          {entry.ingredients.map((ingredient, i) => <div className="feed-entry-tag" key={`ing${i}`}>{ingredient}</div>)}
        </div>
      </div>
      <div className="feed-entry-time">{moment(entry.datetime).calendar()}</div>
    </div>
  );

};

export default MealEntry;
