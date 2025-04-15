'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PlayerSetup() {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const router = useRouter();

  const addPlayer = () => {
    const trimmed = playerName.trim();
    if (trimmed && !players.includes(trimmed)) {
      setPlayers([...players, trimmed]);
      setPlayerName('');
    }
  };

  const removePlayer = (index) => {
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-[#1f1c2c] via-[#302b63] to-[#24243e] text-white transition-all duration-500">
      <div className="text-center animate-fade-in">
        <h1 className="text-4xl font-extrabold mb-4 text-amber-400 drop-shadow-md">🎳 ¡Prepará a los jugadores!</h1>
        <p className="text-md text-gray-300 mb-6 max-w-md mx-auto">
          Ingresá los nombres de tus amigos para arrancar a jugar 🌀
        </p>
      </div>

      <div className="flex flex-col items-center w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 animate-slide-up">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Nombre del jugador 🎮"
          className="mb-4 px-4 py-3 rounded-xl text-black w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          onClick={addPlayer}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-xl w-full transition-all shadow-md"
        >
          ➕ Agregar Jugador
        </button>
      </div>

      <div className="mt-8 w-full max-w-sm bg-white/10 rounded-2xl p-5 shadow-md backdrop-blur-md border border-white/20 animate-fade-in">
        <h2 className="text-xl font-semibold mb-3 text-cyan-300">👥 Jugadores añadidos</h2>
        <ul className="space-y-3">
          {players.map((player, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white/10 px-4 py-2 rounded-xl text-white border border-white/20"
            >
              <span className="font-medium">🎯 {player}</span>
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
          className="mt-10 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-2xl shadow-xl animate-bounce w-full max-w-sm"
        >
          🚀 ¡Empezar Juego!
        </button>
      )}
    </div>
  );
}


