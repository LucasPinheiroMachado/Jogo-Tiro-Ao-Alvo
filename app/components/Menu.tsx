import { Button } from "./ui/button"

interface MenuProps {
  onStart: () => void
}

export default function Menu({ onStart }: MenuProps) {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Tiro ao alvo</h1>
      <p className="mb-4">Defenda sua posição, não deixe os alvos chegarem até você!</p>
      <p className="obs">(obs: para jogar você precisa de um mouse conectado e o navegador deve estar no modo ´´para computador``)</p>
      <Button onClick={onStart}>Iniciar Jogo</Button>
    </div>
  )
}

