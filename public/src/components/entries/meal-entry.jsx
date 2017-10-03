import React from 'react';
import moment from 'moment';

const MealEntry = ({entry}) => {
  return (
    <div className="feed-entry-container">
      <div className="feed-entry-header">
        <i className="feed-entry-icon mdi mdi-24px mdi-food-variant"></i>
        <div className="feed-entry-time">{moment(entry.datetime).calendar()}</div>
      </div>
      <div className="feed-entry-tag-box">
        {entry.ingredients.map((ingredient, i) => <div className="feed-entry-tag">{ingredient}</div>)}
      </div>
    </div>
  );

};

export default MealEntry;
