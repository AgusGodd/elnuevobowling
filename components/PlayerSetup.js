'use client';

import { useState } from "react";
import { useRouter } from "next/router";

export default function PlayerSetup() {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const router = useRouter();

  const emojis = ["🎳", "🧠", "🔥", "💥", "🏆"];

  const addPlayer = () => {
    if (playerName.trim() && !players.some(p => p.name === playerName.trim())) {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      setPlayers([...players, { name: playerName.trim(), emoji: randomEmoji }]);
      setPlayerName("");
    }
  };

  const startGame = () => {
    document.body.classList.add("fade-out");
    setTimeout(() => {
      router.push({
        pathname: "/gamescreen",
        query: { players: JSON.stringify(players.map(p => p.name)) },
      });
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#2b2b36] to-[#1f1f2e] px-4 py-10 text-center text-white font-mono">
      <h1 className="text-4xl font-bold mb-6 tracking-tight">👥 Configuración de Jugadores</h1>

      <div className="text-left mb-6 w-full max-w-md bg-[#3c3c4d] rounded-xl p-4 shadow-md">
        <p className="text-md leading-relaxed">
          Ingresá los nombres de los jugadores para comenzar. Cada uno tendrá 10 rondas 🎳. 
          En cada ronda podés anotar hasta 10 pinos. ¡Listos para jugar! 🕹️
        </p>
      </div>

      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Nombre del jugador"
        className="bg-[#48485c] border border-[#6c6c8a] text-white placeholder-gray-400 rounded-lg px-4 py-3 w-full max-w-xs mb-3 outline-none focus:ring-2 focus:ring-pink-400 transition-all text-base"
      />

      <button
        onClick={addPlayer}
        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-xl mb-6 w-full max-w-xs transition-all duration-150 active:scale-95 text-base"
      >
        ➕ Agregar Jugador
      </button>

      <div className="w-full max-w-xs text-left bg-[#3c3c4d] p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Jugadores:</h2>
        <ul className="space-y-1">
          {players.map((player, index) => (
            <li
              key={index}
              className="text-md opacity-0 animate-fadeInLeft"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
            >
              {player.emoji} {player.name}
            </li>
          ))}
        </ul>
      </div>

      {players.length > 0 && (
        <button
          onClick={startGame}
          className="mt-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl w-full max-w-xs transition-all duration-200 hover:shadow-lg active:scale-95 animate-bounce-short text-base"
        >
          🚀 Empezar Juego
        </button>
      )}

      <style jsx>{`
        @keyframes fadeInLeft {
          0% {
            opacity: 0;
            transform: translateX(-10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.4s ease-out forwards;
        }

        @keyframes bounce-short {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .animate-bounce-short {
          animation: bounce-short 1.5s infinite;
        }

        .fade-out {
          animation: fadeOut 0.3s ease-out forwards;
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

