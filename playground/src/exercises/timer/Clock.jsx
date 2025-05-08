import React from 'react'

const Clock = ({hours,minutes,seconds}) => {
  return (
    <div className="current-time row p-6 border rounded-md">
      <div className="hours mr-4">hours: {hours}</div>
      <div className="minutes mr-4">minutes: {minutes}</div>
      <div className="seconds">seconds: {seconds}</div>
    </div>
  )
}

export default Clock
