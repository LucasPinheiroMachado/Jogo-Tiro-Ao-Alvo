"use client"

import { useState } from 'react'
import Menu from './components/Menu'
import Game from './components/Game'
import GameOver from './components/GameOver'

export default function Home() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu')
  const [score, setScore] = useState(0)

  const startGame = () => {
    setGameState('playing')
    setScore(0)
  }

  const endGame = (finalScore: number) => {
    setScore(finalScore)
    setGameState('gameOver')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-4">
      {gameState === 'menu' && <Menu onStart={startGame} />}
      {gameState === 'playing' && <Game onGameOver={endGame} />}
      {gameState === 'gameOver' && <GameOver score={score} onRestart={startGame} />}
    </main>
  )
}

