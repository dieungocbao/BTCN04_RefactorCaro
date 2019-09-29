import React, { Component } from 'react'
import Board from './Board'
import { calculateWinner } from '../utils/helper'

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
      clicked: null,
      ascendingOrder: true,
      winner: null,
      winPos: []
    }
  }

  handleClick(i, row, col) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (!squares[i]) {
      squares[i] = this.state.xIsNext ? 'X' : 'O'
      this.setState({
        history: history.concat([
          {
            squares: squares,
            clicked: [row, col]
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      })
      let pos = calculateWinner(squares, i)
      if (pos) {
        this.setState({
          winner: squares[i],
          winPos: [...pos]
        })
        return
      }
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
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    })
  }
  toggleOrder() {
    this.setState({
      ascendingOrder: !this.state.ascendingOrder
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const { winner, winPos } = this.state
    const moves = history.map((step, move) => {
      let desc = 'Go to game start'

      if (move) {
        let row = this.state.history[move].clicked[0]
        let col = this.state.history[move].clicked[1]
        desc = 'Go to move #' + move + '   ( ' + row + ', ' + col + ')'
      }

      let bold =
        move === this.state.stepNumber ? 'btn btn-success' : 'btn btn-primary'
      return (
        <li key={move}>
          <button
            type='button'
            className={bold}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      )
    })
    if (!this.state.ascendingOrder) {
      moves.sort(function(a, b) {
        return b.key - a.key
      })
    }
    let status
    if (winner) {
      status = (
        <>
          <div className='text-title'>Winner :</div>
          <div className='winner-text'>{winner}</div>
        </>
      )
    } else {
      status = (
        <>
          <div className='text-title'>Next Player :</div>
          <div className={`nextplayer-text`}>
            {this.state.xIsNext ? 'X' : 'O'}
          </div>
        </>
      )
    }
    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            winPos={winPos}
            winner={winner}
            squares={current.squares}
            onClick={(i, row, col) => this.handleClick(i, row, col)}
          />
        </div>
        <div className='game-info'>
          <div className='status'>
            <div>{status}</div>

            <div className='game-history'>
              <ol>{moves}</ol>
            </div>
          </div>

          <div className='list-button'>
            <button
              className='btn btn-danger reset-btn'
              onClick={this.resetGame}
            >
              <i class='fa fa-history'></i>
              Reset Game
            </button>
            <button
              className='btn btn-primary order-button'
              onClick={() => this.toggleOrder()}
            >
              <i className='fa fa-sort'></i> Change order
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Game
