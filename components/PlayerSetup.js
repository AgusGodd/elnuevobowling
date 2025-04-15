'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PlayerSetup() {
  const [players, setPlayers] = useState<string[]>([]);
  const [playerName, setPlayerName] = useState('');
  const router = useRouter();

  const addPlayer = () => {
    const trimmed = playerName.trim();
    if (trimmed && !players.includes(trimmed)) {
      setPlayers([...players, trimmed]);
      setPlayerName('');
    }
  };

  const removePlayer = (index: number) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);
  };

  const startGame = () => {
    router.push({
      pathname: '/gamescreen',
      query: { players: JSON.stringify(players) },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 text-center bg-gradient-to-b from-[#1f1c2c] via-[#302b63] to-[#24243e] text-white transition-all duration-500">
      <h1 className="text-3xl font-bold mb-4">🎳 Configuración de Jugadores</h1>

      <p className="text-sm text-gray-300 mb-6 max-w-md">
        Ingresá los nombres de los jugadores. Cuando estén listos, ¡empezá el juego!
      </p>

      <div className="flex flex-col items-center w-full max-w-sm">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Nombre del jugador"
          className="mb-3 px-4 py-2 rounded-lg text-black w-full"
        />
        <button
          onClick={addPlayer}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg w-full transition-all"
        >
          ➕ Agregar Jugador
        </button>
      </div>

      <div className="mt-6 w-full max-w-sm bg-white/10 rounded-xl p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Jugadores añadidos:</h2>
        <ul className="space-y-2">
          {players.map((player, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white/10 px-3 py-2 rounded-lg"
            >
              <span>🎯 {player}</span>
              <button
                onClick={() => removePlayer(index)}
                className="text-red-400 hover:text-red-600 transition"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>

      {players.length > 0 && (
        <button
          onClick={startGame}
          className="mt-8 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl w-full max-w-sm transition-all"
        >
          🚀 Empezar Juego
        </button>
      )}
    </div>
  );
}

