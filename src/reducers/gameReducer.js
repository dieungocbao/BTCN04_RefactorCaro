import { RESET_GAME } from '../constants'

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
		default:
			return state
	}
}

export default gameReducer
