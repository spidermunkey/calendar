import React from 'react'

const Controller = ({handler}) => {
  return (
    <div className="stopwatch-controls row pt-4 pl-10" onClick={handler}>
      <div className="play"><button className="button mr-4 border rounded-sm cursor-pointer" btn="play">Play</button></div>
      <div className="pause"><button className="button mr-4 border rounded-sm cursor-pointer" btn="pause">Pause</button></div>
      <div className="reset"><button className="button border rounded-sm cursor-pointer" btn="reset">Reset</button></div>
    </div>
  )
}

export default Controller
