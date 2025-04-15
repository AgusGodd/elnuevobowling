'use client';

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function FinalScreen() {
  const router = useRouter();
  const { players, scores } = router.query;

  if (!players || !scores) {
    return <div>Cargando...</div>;
  }

  const playersList = JSON.parse(players);
  const scoresList = JSON.parse(scores);

  const sortedPlayers = playersList.sort((a, b) => {
    const scoreA = scoresList[a].reduce((acc, round) => acc + round.score, 0);
    const scoreB = scoresList[b].reduce((acc, round) => acc + round.score, 0);
    return scoreB - scoreA; 
  });

  const restartGame = () => {
    router.push("/playersetup");
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl mb-4">¡Juego Terminado!</h2>
      
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Podio</h3>
        {sortedPlayers.slice(0, 3).map((player, index) => (
          <div key={index} className="mb-2">
            <p>{index + 1}. {player} - {scoresList[player].reduce((acc, round) => acc + round.score, 0)} puntos</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="
