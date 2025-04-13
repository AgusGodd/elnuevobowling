import { useState } from "react";

export default function PlayerSetup() {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");

  const addPlayer = () => {
    if (playerName && !players.includes(playerName)) {
      setPlayers([...players, playerName]);
      setPlayerName("");
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl mb-4">Configuración de Jugadores</h1>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Nombre del jugador"
        className="border-2 p-2 mb-4"
      />
      <button
        onClick={addPlayer}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Agregar Jugador
      </button>

      <div className="mt-4">
        {players.map((player, index) => (
          <p key={index}>{player}</p>
        ))}
      </div>
    </div>
  );
}
