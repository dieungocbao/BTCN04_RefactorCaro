import React from 'react'

function Square({ winKey, winPos, onClick, value }) {
	const isWin = winPos.includes(winKey)
	return (
		<button
			type="button"
			className="square"
			onClick={onClick}
			style={{ color: isWin ? 'red' : '#000' }}
		>
			{value}
		</button>
	)
}

export default Square
