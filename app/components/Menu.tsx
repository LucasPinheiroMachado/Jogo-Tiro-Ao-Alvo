import { Button } from "./ui/button"

interface MenuProps {
  onStart: () => void
}

export default function Menu({ onStart }: MenuProps) {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Tiro ao alvo</h1>
      <p className="mb-4">Defenda sua posição, não deixe os alvos chegarem até você!</p>
      <Button onClick={onStart}>Iniciar Jogo</Button>
    </div>
  )
}

