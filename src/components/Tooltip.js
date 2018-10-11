import React from 'react'

const Tooltip = (props) => {
    const current_date = props.current;
    const selected_date = props.date;
    const diff =  Math.floor(( Date.parse(selected_date) - Date.parse(current_date) ) / 86400000);
    const verbage = diff > 0 ? "until" : "since"
    const days_verbage = Math.abs(diff) === 1 ? "day" : "days"
  return (
    <div className="tooltip">
     {Math.abs(diff)} {days_verbage} {verbage} {selected_date} 
    </div>
  )
}

export default Tooltip;