import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className='loading-text'>
      Loading
      </div>
    </div>
  );
};

export default Loading;