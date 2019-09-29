import React from 'react'
import Square from './Square'

function Board({ squares, onClick, winPos, winner }) {
	function renderSquare(i, row, col, winP) {
		return (
			<Square
				key={i}
				winKey={i}
				winPos={winP}
				value={squares[i]}
				onClick={() => onClick(i, row, col)}
			/>
		)
	}
	const elm = []
	let count = 0
	for (let i = 0; i < 20; i += 1) {
		const listSquares = []
		listSquares.push(<div key={Math.random()} className="board-row" />)
		for (let j = 0; j < 20; j += 1) {
			listSquares.push(renderSquare(count, i, j, winPos))
			count += 1
		}
		elm.push(listSquares)
	}
	return <div className={winner ? 'disable' : null}>{elm}</div>
}

export default Board
