import React from 'react'

import './Loading.css';

const Loading = (props) => {
  return (
    <div class="loading-block" hidden={props.hidden}>
      <div class="spinner-border text-secondary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default Loading