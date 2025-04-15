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
  const [inputValue, setInputValue] = useState('');

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

  const calculateRoundScore = (round) => {
    let score = round.turns.reduce((acc, val) => acc + val, 0);
    if (round.turns[0] === 10 && currentRound !== 9) score += 10;
    return score;
  };

  const getTotalScore = (player) => {
    return scores[player].reduce((total, round) => total + calculateRoundScore(round), 0);
  };

  const handleConfirmThrow = () => {
    const score = parseInt(inputValue, 10);
    if (isNaN(score) || score < 0 || score > pinsLeft) return;

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
        setInputValue('');
        return;
      } else if (currentThrow === 1) {
        if (first === 10 || first + score === 10) {
          setPinsLeft(10);
          setCurrentThrow(2);
          setScores(newScores);
          setInputValue('');
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
          setInputValue('');
          return;
        }
      }

      setPinsLeft(10);
      setCurrentThrow(nextThrow);
      setScores(newScores);
      setInputValue('');
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
    setInputValue('');
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 min-h-screen bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500">
      <div className="mb-6 bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-5xl font-bold text-center text-gradient mb-4">Ronda {currentRound + 1}</h1>
        <p className="text-2xl font-semibold text-center mb-1 text-yellow-400">Turno de: <span className="font-bold text-white">{currentPlayer}</span> 🎯</p>
        <p className="text-lg font-medium text-center mb-2">Tiro {currentThrow + 1}</p>
      </div>

      <p className="mb-4 text-white text-xl font-semibold text-center">Pinos disponibles: <span className="text-yellow-300">{pinsLeft}</span> 🎳</p>

      <div className="flex justify-center items-center gap-4 mb-6">
        <input
          type="number"
          min="0"
          max={pinsLeft}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="text-center text-lg border-2 border-yellow-500 p-3 w-24 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-300"
          placeholder={`0-${pinsLeft}`}
        />
        <button
          onClick={handleConfirmThrow}
          className="bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-xl hover:bg-yellow-600 transform transition-all duration-300"
        >
          Confirmar Tiro 🔥
        </button>
      </div>

      <div className="mt-8 w-full max-w-md grid grid-cols-1 gap-4 text-center">
        {playersList.map((player) => (
          <div key={player} className="border border-gray-700 p-6 rounded-xl shadow-md bg-gray-800 hover:scale-105 transition-transform duration-200">
            <p className="font-bold text-xl text-white">{player} 🌟</p>
            <p className="text-gray-300">Puntos actuales: <span className="text-yellow-400">{getTotalScore(player)}</span></p>
            <div className="mt-2 flex justify-center gap-2 text-gray-400">
              {scores[player].map((frame, index) => (
                <div key={index} className="w-8 h-8 bg-gray-600 text-center rounded-full flex justify-center items-center text-white">
                  {frame.turns[0] !== undefined ? frame.turns[0] : '-'}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

