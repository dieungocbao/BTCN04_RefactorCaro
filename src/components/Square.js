import React from 'react'

function Square(props) {
  const isWin = props.winPos.includes(props.winKey)
  return (
    <button
      className='square'
      onClick={props.onClick}
      style={{ color: isWin ? 'red' : '#000' }}
    >
      {props.value}
      {/* {props.winKey} */}
    </button>
  )
}

export default Square
