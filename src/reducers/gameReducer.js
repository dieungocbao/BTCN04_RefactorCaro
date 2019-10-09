import { RESET_GAME, JUMPTO, TOGGLE_ORDER, CLICK_PLAY } from '../constants'
import calculateWinner from '../utils/helper'

const initialState = {
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

const gameReducer = (state = initialState, action) => {
	switch (action.type) {
		case RESET_GAME: {
			return {
				...state,
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
		case JUMPTO: {
			return {
				...state,
				stepNumber: action.payload,
				xIsNext: action.payload % 2 === 0
			}
		}
		case TOGGLE_ORDER: {
			const { ascendingOrder } = state
			return {
				...state,
				ascendingOrder: !ascendingOrder
			}
		}
		case CLICK_PLAY: {
			const { xIsNext, history, stepNumber } = state
			let newState = { ...state }
			const gameHistory = history.slice(0, stepNumber + 1)
			const current = gameHistory[gameHistory.length - 1]
			const squares = current.squares.slice()
			const { i, row, col } = action.payload
			if (!squares[i]) {
				squares[i] = xIsNext ? 'X' : 'O'
				newState = {
					...newState,
					history: gameHistory.concat([
						{
							squares,
							clicked: [row, col]
						}
					]),
					stepNumber: gameHistory.length,
					xIsNext: !xIsNext
				}
				const pos = calculateWinner(squares, i)
				if (pos) {
					newState = {
						...newState,
						winner: squares[i],
						winPos: [...pos]
					}
				}
			}
			return { ...newState }
		}
		default:
			return state
	}
}

export default gameReducer
