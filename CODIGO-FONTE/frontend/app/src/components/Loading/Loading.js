import React from 'react'

import './Loading.css';

const Loading = (props) => {
  return (
    <div className="loading-block" hidden={props.hidden}>
      <div className="spinner-border text-default" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default Loading