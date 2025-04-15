'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function GameScreen() {
  const router = useRouter();
  const { players } = router.query;

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentThrow, setCurrentThrow] = useState(0);
  const [scores, setScores] = useState({});
  const [pinsLeft, setPinsLeft] = useState(10);
  const [playersList, setPlayersList] = useState([]);

  useEffect(() => {
    if (players) {
      try {
        const parsedPlayers = JSON.parse(players);
        const initialScores = {};
        parsedPlayers.forEach(player => {
          initialScores[player] = Array.from({ length: 10 }, () => ({ turns: [], score: 0 }));
        });
        setPlayersList(parsedPlayers);
        setScores(initialScores);
      } catch (err) {
        console.error('Error parsing players:', err);
      }
    }
  }, [players]);

  if (!players || playersList.length === 0 || Object.keys(scores).length === 0) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  const currentPlayer = playersList[currentPlayerIndex];
  const currentFrame = scores[currentPlayer][currentRound];

  // Función para calcular el puntaje total de un jugador
  const getTotalScore = (player) => {
    return scores[player].reduce((total, round) => total + round.score, 0);
  };

  const handleThrow = (score) => {
    const newScores = { ...scores };
    const playerFrame = newScores[currentPlayer][currentRound];
    playerFrame.turns[currentThrow] = score;

    let nextThrow = currentThrow + 1;
    let nextPlayerIndex = currentPlayerIndex;
    let nextRound = currentRound;

    if (currentRound === 9) {
      const first = playerFrame.turns[0] || 0;
      const second = playerFrame.turns[1] || 0;

      if (currentThrow === 0 && score === 10) {
        setPinsLeft(10);
        setCurrentThrow(1);
        setScores(newScores);
        return;
      } else if (currentThrow === 1) {
        if (first === 10 || first + score === 10) {
          setPinsLeft(10);
          setCurrentThrow(2);
          setScores(newScores);
          return;
        }
      }

      if (currentThrow === 2 || (currentThrow === 1 && first + second < 10)) {
        nextPlayerIndex++;
        if (nextPlayerIndex >= playersList.length) {
          router.push({
            pathname: '/finalscreen',
            query: { scores: JSON.stringify(newScores), players },
          });
          return;
        } else {
          setCurrentPlayerIndex(nextPlayerIndex);
          setCurrentThrow(0);
          setPinsLeft(10);
          setScores(newScores);
          return;
        }
      }

      setPinsLeft(10);
      setCurrentThrow(nextThrow);
      setScores(newScores);
      return;
    }

    if (currentThrow === 0 && score === 10) {
      nextThrow = 0;
      nextPlayerIndex++;
    } else if (currentThrow === 1) {
      nextThrow = 0;
      nextPlayerIndex++;
    }

    if (nextPlayerIndex >= playersList.length) {
      nextPlayerIndex = 0;
      nextRound++;
    }

    if (nextRound >= 10) {
      router.push({
        pathname: '/finalscreen',
        query: { scores: JSON.stringify(newScores), players },
      });
      return;
    }

    setPinsLeft(nextThrow === 1 ? 10 - (playerFrame.turns[0] || 0) : 10);
    setCurrentThrow(nextThrow);
    setCurrentPlayerIndex(nextPlayerIndex);
    setCurrentRound(nextRound);
    setScores(newScores);
  };

  const handleInput = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 0 && val <= pinsLeft) {
      e.target.value = '';
      handleThrow(val);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 min-h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">
        Ronda {currentRound + 1}, {currentPlayer}, Tiro {currentThrow + 1}
      </h1>
      <p className="mb-2 text-gray-600">Pinos disponibles: {pinsLeft}</p>
      <input
        type="number"
        min="0"
        max={pinsLeft}
        onChange={handleInput}
        className="text-center text-lg border-2 border-gray-400 p-2 w-24 rounded mb-6"
        placeholder={`0-${pinsLeft}`}
      />

      <div className="mt-4">
        {playersList.map((player) => (
          <div key={player} className="mb-2">
            <p className="font-semibold">{player}</p>
            <p>Puntos actuales: {getTotalScore(player)}</p>
            <p>Puntos totales: {getTotalScore(player)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

