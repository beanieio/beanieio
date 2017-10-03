import React from 'react';
import moment from 'moment';

const MealEntry = ({entry}) => {
  return (
    <div className="feed-entry-container">
      <div className="feed-entry-header">
        <i className="feed-entry-icon mdi mdi-24px mdi-food-variant"></i>
        <div className="feed-entry-time">{moment().calendar()}</div>
      </div>
      <div className="feed-entry-tag-box">
        <div className="feed-entry-tag">wheat</div>
        <div className="feed-entry-tag">dairy</div>
        <div className="feed-entry-tag">tree nuts</div>
        <div className="feed-entry-tag">soy</div>
      </div>
    </div>
  );

};

export default MealEntry;
