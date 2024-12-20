"use client"

import { useEffect, useRef, useState } from 'react'

interface GameProps {
  onGameOver: (score: number) => void
}

interface Target {
  x: number
  y: number
  speed: number
  angle: number
}

export default function Game({ onGameOver }: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(20)
  const [targets, setTargets] = useState<Target[]>([])

  const canvasWidth = 800
  const canvasHeight = 600
  const playerRadius = 25
  const targetRadius = 15

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const centerX = canvasWidth / 2
    const centerY = canvasHeight / 2

    const gameLoop = setInterval(() => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      // Draw player
      ctx.beginPath()
      ctx.arc(centerX, centerY, playerRadius, 0, Math.PI * 2)
      ctx.fillStyle = 'blue'
      ctx.fill()

      // Update and draw targets
      setTargets(prevTargets => 
        prevTargets.map(target => {
          const dx = centerX - target.x
          const dy = centerY - target.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < playerRadius + targetRadius) {
            setLives(prev => prev - 1)
            return null
          }

          const newX = target.x + Math.cos(target.angle) * target.speed
          const newY = target.y + Math.sin(target.angle) * target.speed

          return {
            ...target,
            x: newX,
            y: newY
          }
        }).filter(Boolean) as Target[]
      )

      targets.forEach(target => {
        ctx.beginPath()
        ctx.arc(target.x, target.y, targetRadius, 0, Math.PI * 2)
        ctx.fillStyle = 'red'
        ctx.fill()
      })

      // Spawn new target
      if (Math.random() < 0.02) {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.max(canvasWidth, canvasHeight)
        const newTarget: Target = {
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          speed: Math.random() * 2 + 1,
          angle: angle + Math.PI
        }
        setTargets(prev => [...prev, newTarget])
      }

      // Check game over
      if (lives <= 0) {
        clearInterval(gameLoop)
        onGameOver(score)
      }
    }, 1000 / 60) // 60 FPS

    return () => clearInterval(gameLoop)
  }, [targets, lives, score, onGameOver])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    setTargets(prevTargets => 
      prevTargets.filter(target => {
        const dx = x - target.x
        const dy = y - target.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance <= targetRadius) {
          setScore(prev => prev + 1)
          return false
        }
        return true
      })
    )
  }

  const handleCanvasTouch = (event: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
  
    const rect = canvas.getBoundingClientRect()
    const touch = event.touches[0]
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
  
    setTargets(prevTargets => 
      prevTargets.filter(target => {
        const dx = x - target.x
        const dy = y - target.y
        const distance = Math.sqrt(dx * dx + dy * dy)
  
        if (distance <= targetRadius) {
          setScore(prev => prev + 1)
          return false
        }
        return true
      })
    )
  }

  const handleBoth = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    // Verificar o tipo do evento para saber qual função chamar
    if (event.type === 'click') {
      handleCanvasClick(event as React.MouseEvent<HTMLCanvasElement>);
    } else if (event.type === 'touchstart') {
      handleCanvasTouch(event as React.TouchEvent<HTMLCanvasElement>);
    }
  }
  

  return (
    <div className="text-center">
      <div className="mb-4">
        <span className="mr-4">Pontuação: {score}</span>
        <span>Vidas: {lives}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onClick={handleBoth}
        onTouchStart={handleBoth}
        className="border border-white cursor-crosshair max-w-full h-auto"
      />
    </div>
  )
}

