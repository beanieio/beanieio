import React from 'react';
import './loading.css';

const Loading = (props) => (
  <div class="loading-container">
    <div class="loading-wrap">
      <div>
        <div class="loading-bounceball"></div>
        <div class="loading-text">Analyzing Image</div>
      </div>
    </div>
  </div>
)

export default Loading;