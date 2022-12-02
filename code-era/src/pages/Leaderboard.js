import React from 'react'
import "../styles/Leaderboard.css"
const Leaderboard = () => {
  
  return (
    <div className="board">
        <h1 className='leaderboard'>Leaderboard</h1>

        <div className="duration">
            <button  data-id='7'>7 Days</button>
            <button  data-id='30'>30 Days</button>
            <button  data-id='0'>All-Time</button>
        </div>
    </div>
  )
}

export default Leaderboard