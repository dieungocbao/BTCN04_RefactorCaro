function checkWinVertical(squares, index) {
	const turn = squares[index]
	const oponent = squares[index] === 'X' ? 'O' : 'X'
	let count = 1
	let head = index
	let tail = index
	while (squares[tail + 20] === turn && tail < 400) {
		count += 1
		tail += 20
	}
	while (squares[head - 20] === turn && head > -1) {
		count += 1
		head -= 20
	}
	if (count >= 5) {
		if (head > 19 && tail < 380) {
			if (squares[head - 20] === oponent && squares[tail + 20] === oponent) {
				return null
			}
		}
		return Array(count)
			.fill(head)
			.map((e, i) => e + 20 * i)
	}
	return null
}

function checkHorizontal(squares, index) {
	const turn = squares[index]
	const oponent = squares[index] === 'X' ? 'O' : 'X'
	let count = 1
	let head = index
	let tail = index
	const limit = Math.floor(index / 20)
	while (squares[head - 1] === turn && head - 1 >= limit * 20) {
		count += 1
		head -= 1
	}
	while (squares[tail + 1] === turn && tail + 1 <= limit * 20 + 19) {
		count += 1
		tail += 1
	}
	if (count >= 5) {
		if (head > limit * 20 && tail < limit * 20 + 19) {
			if (squares[head - 1] === oponent && squares[tail + 1] === oponent) {
				return null
			}
		}
		return Array(count)
			.fill(head)
			.map((e, i) => e + i)
	}
	return null
}

function getPositionLeftDiagonal(pos) {
	let row = Math.floor((pos + 20) / 20) - 1
	let col = (pos % 10) + (Math.floor(pos / 10) % 2 === 0 ? 0 : 10)
	if (row - col >= 0) {
		while (col >= 1) {
			row -= 1
			col -= 1
		}
		return {
			head: 20 * row + col,
			tail: 20 * 20 - (row + 1)
		}
	}
	while (col >= 2 && row >= 1) {
		row -= 1
		col -= 1
	}
	return {
		head: 20 * row + col,
		tail: 20 * 20 - 20 * col - 1
	}
}

function checkDiagonalLeft(squares, index) {
	const turn = squares[index]
	const oponent = squares[index] === 'X' ? 'O' : 'X'
	let count = 1
	let head = index
	let tail = index
	const position = getPositionLeftDiagonal(index)
	while (squares[head - 21] === turn && head - 21 >= position.head) {
		count += 1
		head -= 21
	}
	while (squares[tail + 21] === turn && tail + 21 <= position.tail) {
		count += 1
		tail += 21
	}

	if (count >= 5) {
		if (head > position.head && tail < position.tail) {
			if (squares[head - 21] === oponent && squares[tail + 21] === oponent) {
				return null
			}
		}
		return Array(count)
			.fill(head)
			.map((e, i) => e + 21 * i)
	}
	return null
}

function getPositionRightDiagonal(pos) {
	let row = Math.floor((pos + 20) / 20) - 1
	let col = (pos % 10) + (Math.floor(pos / 10) % 2 === 0 ? 0 : 10)
	const center = { row: 19 - col, col }
	if (row <= center.row) {
		while (row >= 1) {
			row -= 1
			col += 1
		}
		return {
			head: col,
			tail: 20 * col
		}
	}
	while (col > 0 && row < 19) {
		row += 1
		col -= 1
	}
	return {
		head: (col + 1) * 20 - 1,
		tail: 20 * 20 - (20 - col)
	}
}

function checkDiagonalRight(squares, index) {
	const turn = squares[index]
	const oponent = squares[index] === 'X' ? 'O' : 'X'
	let count = 1
	let head = index
	let tail = index
	const position = getPositionRightDiagonal(index)
	while (squares[head - 19] === turn && head - 19 >= position.head) {
		count += 1
		head -= 19
	}
	while (squares[tail + 19] === turn && tail + 19 <= position.tail) {
		count += 1
		tail += 19
	}

	if (count >= 5) {
		if (head > position.head && tail < position.tail) {
			if (squares[head - 19] === oponent && squares[tail + 19] === oponent) {
				return null
			}
		}
		return Array(count)
			.fill(head)
			.map((e, i) => e + 19 * i)
	}
	return null
}

function calculateWinner(squares, index) {
	const vertical = checkWinVertical(squares, index)
	const horizontal = checkHorizontal(squares, index)
	const leftDiagonal = checkDiagonalLeft(squares, index)
	const rightDiagonal = checkDiagonalRight(squares, index)
	if (vertical) {
		return vertical
	}
	if (horizontal) {
		return horizontal
	}
	if (leftDiagonal) {
		return leftDiagonal
	}
	if (rightDiagonal) {
		return rightDiagonal
	}
	return null
}

export default calculateWinner
