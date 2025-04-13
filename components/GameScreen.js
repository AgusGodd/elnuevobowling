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
      acc[player] = Array(10).fill({ turns: [0, 0], score: 0 }); // 10 rondas, cada una con 2 tiros y un puntaje
      return acc;
    }, {})
  );

  // Actualizar los tiros y puntajes
  const handleScoreChange = (player, round, score, turnIndex) => {
    const updatedScores = { ...scores };
    updatedScores[player][round].turns[turnIndex] = score;

    // Si es la ronda 10, se puede tener un tercer tiro si se hace strike o spare
    if (round === 9) {
      // Si es un strike en el primer tiro (10 pinos), desbloquear el tercer tiro
      if (turnIndex === 0 && score === 10) {
        updatedScores[player][round].turns[1] = 0; // El segundo tiro no se bloquea
        updatedScores[player][round].turns[2] = 0; // El tercer tiro se desbloquea
      }
      // Si se hace un spare (ejemplo: 5 + 5), se desbloquea el tercer tiro
      if (turnIndex === 1 && updatedScores[player][round].turns[0] + score === 10) {
        updatedScores[player][round].turns[2] = 0; // El tercer tiro se desbloquea
      }
    }

    // Recalcular el puntaje de la ronda
    updatedScores[player][round].score = updatedScores[player][round].turns.reduce((acc, cur) => acc + cur, 0);

    setScores(updatedScores);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl mb-4">Juego en Progreso</h2>
      <div>
        {playersList.map((player, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold">{player}</h3>
            {scores[player].map((round, roundIndex) => (
              <div key={roundIndex} className="mb-2">
                <p>Ronda {roundIndex + 1}: </p>
                {round.turns.map((score, turnIndex) => (
                  <div key={turnIndex} className="mb-2">
                    <label>Turno {turnIndex + 1}: </label>
                    <input
                      type="number"
                      value={score}
                      onChange={(e) =>
                        handleScoreChange(player, roundIndex, parseInt(e.target.value, 10), turnIndex)
                      }
                      className="border-2 border-gray-300 p-2 w-20 text-center"
                      min="0"
                      max="10"
                      disabled={roundIndex === 9 && turnIndex > 2} // Solo los primeros 3 tiros en la ronda 10
                    />
                  </div>
                ))}
                <p>Puntaje de la ronda: {round.score}</p>
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
