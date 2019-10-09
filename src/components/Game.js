import React from 'react'
import { v4 } from 'uuid'
import { connect } from 'react-redux'
import Board from './Board'
import { resetGame, jumpTo, toggleOrder, clickPlay } from '../actions'

function Game({
	game: { history, winner, winPos, stepNumber, ascendingOrder, xIsNext },
	resetGameA,
	toggleOrderA,
	jumpToA,
	clickPlayA
}) {
	const handleClick = (i, row, col) => {
		clickPlayA(i, row, col)
	}
	const current = history[stepNumber]
	const moves = history.map((step, move) => {
		let desc = 'Go to game start'

		if (move) {
			const row = step.clicked[0]
			const col = step.clicked[1]
			desc = `Go to move #${move}   ( ${row}, ${col})`
		}

		const bold = move === stepNumber ? 'btn btn-success' : 'btn btn-primary'
		return (
			<li key={v4()}>
				<button type="button" className={bold} onClick={() => jumpToA(move)}>
					{desc}
				</button>
			</li>
		)
	})
	if (!ascendingOrder) {
		moves.reverse()
	}

	let status
	if (winner) {
		status = (
			<>
				<div className="text-title">Winner :</div>
				<div className="winner-text">{winner}</div>
			</>
		)
	} else {
		status = (
			<>
				<div className="text-title">Next Player :</div>
				<div className="nextplayer-text">{xIsNext ? 'X' : 'O'}</div>
			</>
		)
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board
					winPos={winPos}
					winner={winner}
					squares={current.squares}
					onClick={(i, row, col) => handleClick(i, row, col)}
				/>
			</div>
			<div className="game-info">
				<div className="status">
					<div>{status}</div>

					<div className="game-history">
						<ol>{moves}</ol>
					</div>
				</div>

				<div className="list-button">
					<button
						type="button"
						className="btn btn-danger reset-btn"
						onClick={() => resetGameA()}
					>
						<i className="fa fa-history" />
						Reset Game
					</button>
					<button
						type="button"
						className="btn btn-primary order-button"
						onClick={() => toggleOrderA()}
					>
						<i className="fa fa-sort" /> Change order
					</button>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		game: state.gameReducer
	}
}

const mapDispatchToProps = dispatch => {
	return {
		resetGameA: () => dispatch(resetGame()),
		jumpToA: step => dispatch(jumpTo(step)),
		toggleOrderA: () => dispatch(toggleOrder()),
		clickPlayA: (i, row, col) => dispatch(clickPlay(i, row, col))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Game)
