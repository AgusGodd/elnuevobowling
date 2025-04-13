import { useRouter } from "next/router"; // Usar el hook de Next.js para redirigir

export default function FinalScreen() {
  const router = useRouter(); // Hook para la redirección

  const restartGame = () => {
    // Redirigir al inicio para empezar de nuevo
    router.push("/playersetup");
  };

  // Obtener los jugadores desde la query
  const { players } = router.query;

  // Si no se cargan los jugadores, mostrar un mensaje de carga
  if (!players) {
    return <div>Cargando...</div>;
  }

  // Convertir la lista de jugadores desde un string a un array
  const playersList = JSON.parse(players);

  return (
    <div className="text-center">
      <h2 className="text-3xl mb-4">¡Juego Terminado!</h2>
      <div>
        {playersList.map((player, index) => (
          <p key={index}>
            {index + 1}. {player} - 10 puntos
          </p>
        ))}
      </div>
      <button
        onClick={restartGame}
        className="bg-blue-500 text-white px-6 py-2 rounded"
      >
        Volver a Jugar
      </button>
    </div>
  );
}
