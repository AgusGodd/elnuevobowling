export default function FinalScreen({ players }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl mb-4">Resultado Final</h2>
      <div>
        {players.map((player, index) => (
          <p key={index}>
            {index + 1}. {player} - 10 puntos
          </p>
        ))}
      </div>
    </div>
  );
}
