import { RESET_GAME } from '../constants'

const resetGame = () => {
	return {
		type: RESET_GAME
	}
}

export { resetGame as default }
