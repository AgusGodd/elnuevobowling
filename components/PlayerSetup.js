'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    router.push("/juego");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6 bg-white text-center">
      <h1 className="text-3xl font-bold mb-6">Configuración de Jugadores</h1>

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
import { useState } from "react";
import { useRouter } from "next/router"; // Usar el hook de Next.js para redirigir

export default function PlayerSetup() {
  const [players, setPlayers] = useState([]); // Lista de jugadores
  const [playerName, setPlayerName] = useState(""); // Nombre del jugador
  const router = useRouter(); // Hook para la redirección

  const addPlayer = () => {
    if (playerName && !players.includes(playerName)) {
      setPlayers([...players, playerName]); // Agregar jugador a la lista
      setPlayerName(""); // Limpiar el campo de entrada
    }
  };

  // Función para empezar el juego
  const startGame = () => {
    // Redirigir a la página de juego y pasar los jugadores como parámetro
    router.push({
      pathname: "/gamescreen", // Redirigir a la página de juego
      query: { players: JSON.stringify(players) }, // Pasar la lista de jugadores como parámetro en la URL
    });
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl mb-4">Configuración de Jugadores</h1>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)} // Actualizar el nombre del jugador
        placeholder="Nombre del jugador"
        className="border-2 p-2 mb-4"
      />
      <button
        onClick={addPlayer} // Agregar jugador a la lista
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Agregar Jugador
      </button>

      <div className="mt-4">
        {players.map((player, index) => (
          <p key={index}>{player}</p> // Mostrar jugadores
        ))}
      </div>

      <button
        onClick={startGame} // Empezar el juego
        className="bg-green-500 text-white px-6 py-2 rounded mt-6"
      >
        Empezar Juego
      </button>
    </div>
  );
}

