export default function GameScreen({ players }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl mb-4">Juego en Progreso</h2>
      <div>
        {players.map((player, index) => (
          <div key={index} className="mb-2">
            <h3 className="font-bold">{player}</h3>
            <p>Puntaje: 0</p>
            <p>Turno 1: 0 pinos</p>
            <p>Turno 2: 0 pinos</p>
          </div>
        ))}
      </div>
    </div>
  );
}
