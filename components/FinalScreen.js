'use client';

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function FinalScreen() {
  const router = useRouter();
  const { players, scores } = router.query;

  // Si no hay jugadores o puntajes, mostrar un mensaje de carga
  if (!players || !scores) {
    return <div>Cargando...</div>;
  }

  // Convertir la lista de jugadores y puntajes desde strings a arrays
  const playersList = JSON.parse(players);
  const scoresList = JSON.parse(scores);

  // Calcular el puntaje total por jugador
  const totalScores = playersList.reduce((acc, player) => {
    const total = scoresList[player].reduce((sum, round) => sum + round.score, 0);
    acc[player] = total; // Aseguramos que el puntaje total se asocie correctamente con el jugador
    return acc;
  }, {});

  // Ordenar jugadores por puntaje total
  const sortedPlayers = playersList.sort((a, b) => totalScores[b] - totalScores[a]);

  const restartGame = () => {
    router.push("/playersetup"); // Redirigir al inicio
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl mb-4">¡Juego Terminado!</h2>
      
      {/* Mostrar Podio */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Podio</h3>
        {sortedPlayers.slice(0, 3).map((player, index) => (
          <div key={index} className="mb-2">
            <p>{index + 1}. {player} - {totalScores[player]} puntos</p>
          </div>
        ))}
      </div>

      {/* Historial de Tiros */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Historial de Tiros</h3>
        {playersList.map((player) => (
          <div key={player} className="mb-4">
            <h4 className="font-bold">{player}</h4>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Ronda</th>
                  <th className="border p-2">Tiro 1</th>
                  <th className="border p-2">Tiro 2</th>
                  <th className="border p-2">Tiro 3 (Ronda 10)</th>
                  <th className="border p-2">Puntaje Ronda</th>
                </tr>
              </thead>
              <tbody>
                {scoresList[player].map((round, index) => (
                  <tr key={index}>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{round.turns[0]}</td>
                    <td className="border p-2">{round.turns[1]}</td>
                    <td className="border p-2">{round.turns[2] !== undefined ? round.turns[2] : '-'}</td>
                    <td className="border p-2">{round.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Botón para reiniciar el juego */}
      <button
        onClick={restartGame}
        className="bg-blue-500 text-white px-6 py-2 rounded"
      >
        Volver a Jugar
      </button>
    </div>
  );
}
