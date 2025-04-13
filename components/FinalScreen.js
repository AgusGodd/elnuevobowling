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
import { useRouter } from "next/router"; // Usar el hook de Next.js para redirigir

export default function FinalScreen() {
  const router = useRouter();
  
  const restartGame = () => {
    // Redirigir al inicio para empezar de nuevo
    router.push("/playersetup");
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl mb-4">¡Juego Terminado!</h2>
      <button
        onClick={restartGame}
        className="bg-blue-500 text-white px-6 py-2 rounded"
      >
        Volver a Jugar
      </button>
    </div>
  );
}
