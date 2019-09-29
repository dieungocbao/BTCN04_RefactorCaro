import React, { Component } from 'react'
import { v4 } from 'uuid'
import Board from './Board'
import calculateWinner from '../utils/helper'

class Game extends Component {
	constructor(props) {
		super(props)
		this.state = {
			history: [
				{
					squares: Array(400).fill(null)
				}
			],
			stepNumber: 0,
			xIsNext: true,
			ascendingOrder: true,
			winner: null,
			winPos: []
		}
	}

	resetGame = () => {
		this.setState({
			history: [
				{
					squares: Array(400).fill(null)
				}
			],
			stepNumber: 0,
			xIsNext: true,
			winner: null,
			winPos: []
		})
	}

	handleClick(i, row, col) {
		const { xIsNext, history, stepNumber } = this.state
		const gameHistory = history.slice(0, stepNumber + 1)
		const current = gameHistory[gameHistory.length - 1]
		const squares = current.squares.slice()
		if (!squares[i]) {
			squares[i] = xIsNext ? 'X' : 'O'
			this.setState({
				history: gameHistory.concat([
					{
						squares,
						clicked: [row, col]
					}
				]),
				stepNumber: gameHistory.length,
				xIsNext: !xIsNext
			})
			const pos = calculateWinner(squares, i)
			if (pos) {
				this.setState({
					winner: squares[i],
					winPos: [...pos]
				})
			}
		}
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: step % 2 === 0
		})
	}

	toggleOrder() {
		this.setState(prevState => ({
			ascendingOrder: !prevState.ascendingOrder
		}))
	}

	render() {
		const {
			history,
			winner,
			winPos,
			stepNumber,
			ascendingOrder,
			xIsNext
		} = this.state
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
					<button
						type="button"
						className={bold}
						onClick={() => this.jumpTo(move)}
					>
						{desc}
					</button>
				</li>
			)
		})
		if (!ascendingOrder) {
			moves.sort((a, b) => {
				return b.key - a.key
			})
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
						onClick={(i, row, col) => this.handleClick(i, row, col)}
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
							onClick={this.resetGame}
						>
							<i className="fa fa-history" />
							Reset Game
						</button>
						<button
							type="button"
							className="btn btn-primary order-button"
							onClick={() => this.toggleOrder()}
						>
							<i className="fa fa-sort" /> Change order
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Game
