import { RESET_GAME, JUMPTO, TOGGLE_ORDER, CLICK_PLAY } from '../constants'

export const resetGame = () => {
	return {
		type: RESET_GAME
	}
}

export const jumpTo = step => {
	return {
		type: JUMPTO,
		payload: step
	}
}

export const toggleOrder = () => {
	return {
		type: TOGGLE_ORDER
	}
}

export const clickPlay = (i, row, col) => {
	return {
		type: CLICK_PLAY,
		payload: {
			i,
			row,
			col
		}
	}
}
