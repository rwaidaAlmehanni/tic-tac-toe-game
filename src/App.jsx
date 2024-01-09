import { useState } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './winning-compinations'
import GameOver from './components/GameOver'

const PLAYERS = {
    'X': 'Player 1',
    'O': 'Player 2'
  }

const INIT_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function deriveActivePlayer(turnsList) { 
 let currentPlayer = 'X'
      if (turnsList.length > 0 && turnsList[0].player === 'X') { 
        currentPlayer = 'O'
      }
  return currentPlayer
}

function generateGameBoard(playersTurnes) { 

  let gameBoard = [...INIT_BOARD.map((row)=>[...row])]

    for (const trun of playersTurnes) { 
        const { squar, player } = trun
        const { row, col } = squar
        gameBoard[row][col] = player
    }
  return gameBoard
}

function generateWinner(gameBoard, players) { 
  let winner = null
  for (const compination of WINNING_COMBINATIONS) { 
    const firstSquar = gameBoard[compination[0].row][compination[0].column]
    const secondSquar = gameBoard[compination[1].row][compination[1].column]
    const thiredSquar = gameBoard[compination[2].row][compination[2].column]
    if (firstSquar && firstSquar === secondSquar && firstSquar === thiredSquar) { 
      winner = players[firstSquar]
    }
  }
  return winner
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [playersTurnes, setPlayerTruns] = useState([])  
  const activePlayer = deriveActivePlayer(playersTurnes)
  const gameBoard = generateGameBoard(playersTurnes)
  const winner = generateWinner(gameBoard, players)
  const hasDraw = playersTurnes.length === 9 && !winner

  function handleChangeActivePlayer (row, col) { 
    setPlayerTruns((prevTruns) => { 
      const currentPlayer = deriveActivePlayer(prevTruns)
      let turnsList = [{ squar: { row, col }, player: currentPlayer }, ...prevTruns]
      return turnsList
    })
  }

  function handleRestart() { 
    setPlayerTruns([])
  }

  function handleChangePlayerName(symbol, name) { 
    setPlayers((prevPlayers) => ({ ...prevPlayers, [symbol]: name }))
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initName={players.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={ handleChangePlayerName } />
          <Player initName={players.O} symbol="O" isActive={ activePlayer === 'O' } onChangeName={ handleChangePlayerName } />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={ handleRestart } />}
        <GameBoard board={gameBoard} onClickSquare={ handleChangeActivePlayer } />
      </div>
      <Log turns={playersTurnes} />
    </main>
  )
}

export default App
