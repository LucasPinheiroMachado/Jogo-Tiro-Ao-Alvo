import { Button } from "./ui/button"

interface GameOverProps {
  score: number
  onRestart: () => void
}

export default function GameOver({ score, onRestart }: GameOverProps) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Fim de jogo</h2>
      <p className="text-xl mb-4">Sua pontuação: {score}</p>
      <Button onClick={onRestart}>Jogar Novamente</Button>
    </div>
  )
}

