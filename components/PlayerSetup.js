'use client'; 

import { useState } from "react";
import { useRouter } from "next/router";

export default function PlayerSetup() {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const router = useRouter();

  const addPlayer = () => {
    if (playerName.trim() && !players.includes(playerName.trim())) {
      setPlayers([...players, playerName.trim()]);
      setPlayerName("");
    }
  };

  const startGame = () => {
    router.push({
      pathname: "/gamescreen", // Redirigir a la página de juego
      query: { players: JSON.stringify(players) }, // Pasar los jugadores como parámetro
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Configuración de Jugadores</h1>

      {/* Instrucciones para el usuario */}
      <div className="text-left mb-6 w-full max-w-lg">
        <p className="text-lg">
          Para empezar, ingresa los nombres de los jugadores. Luego, cuando tengas todos los jugadores agregados, podrás comenzar el juego. En el juego, cada jugador tiene 10 rondas, y puedes anotar hasta 10 pinos por turno. ¡Buena suerte!
        </p>
      </div>

      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Nombre del jugador"
        className="border-2 border-gray-300 rounded px-4 py-2 w-full max-w-xs mb-4"
      />

      <button
        onClick={addPlayer}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl mb-6 w-full max-w-xs"
      >
        Agregar Jugador
      </button>

      <div className="w-full max-w-xs text-left">
        {players.map((player, index) => (
          <p key={index} className="text-lg mb-1">🎳 {player}</p>
        ))}
      </div>

      {players.length > 0 && (
        <button
          onClick={startGame}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl w-full max-w-xs"
        >
          Empezar Juego
        </button>
      )}
    </div>
  );
}

