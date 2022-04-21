import React from 'react'
import Timer from '../Timer'

const TimerPage: React.FC = () => {
  return (
    <div className="timer-page">
      <div className='rounded-background'>
        <Timer />
        {/* TODO: display the active todo here */}
      </div>
    </div>
  )
}

export default TimerPage