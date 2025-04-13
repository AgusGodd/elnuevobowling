'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function GameScreen() {
  const router = useRouter();
  const { players } = router.query; // Recibir la lista de jugadores desde la query

  // Si no hay jugadores, mostrar un mensaje de carga
  if (!players) {
    return <div>Cargando...</div>;
  }

  // Convertir la lista de jugadores desde un string a un array
  const playersList = JSON.parse(players);

  // Estado para los puntajes
  const [scores, setScores] = useState(
    playersList.reduce((acc, player) => {
      acc[player] = Array(10).fill(0); // 10 turnos para cada jugador
      return acc;
    }, {})
  );

  const handleScoreChange = (player, round, score) => {
    const updatedScores = { ...scores };
    updatedScores[player][round] = score;
    setScores(updatedScores);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl mb-4">Juego en Progreso</h2>
      <div>
        {playersList.map((player, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold">{player}</h3>
            {scores[player].map((score, round) => (
              <div key={round} className="mb-2">
                <label>Turno {round + 1}: </label>
                <input
                  type="number"
                  value={score}
                  onChange={(e) => handleScoreChange(player, round, parseInt(e.target.value, 10))}
                  className="border-2 border-gray-300 p-2 w-20 text-center"
                  min="0"
                  max="10"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={() => alert('Juego finalizado!')}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl"
      >
        Finalizar Juego
      </button>
    </div>
  );
}
