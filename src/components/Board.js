import React from 'react'
import Square from './Square'

function Board(props) {
  function renderSquare(i, row, col, winPos) {
    return (
      <Square
        key={i}
        winKey={i}
        winPos={winPos}
        value={props.squares[i]}
        onClick={() => props.onClick(i, row, col)}
      />
    )
  }
  let elm = []
  let count = 0
  for (let i = 0; i < 20; i++) {
    let listSquares = []
    listSquares.push(<div key={Math.random()} className='board-row'></div>)
    for (let j = 0; j < 20; j++) {
      listSquares.push(renderSquare(count, i, j, props.winPos))
      count++
    }
    elm.push(listSquares)
  }
  return <div className={props.winner ? 'disable' : null}>{elm}</div>
}

export default Board
