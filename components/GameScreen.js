import { useRouter } from "next/router"; // Usar el hook de Next.js para acceder a la URL

export default function GameScreen() {
  const router = useRouter(); // Obtener la lista de jugadores desde la query
  const { players } = router.query; // Recibir la lista de jugadores que viene de la URL

  // Si no se cargan los jugadores, mostrar un mensaje de carga
  if (!players) {
    return <div>Cargando...</div>;
  }

  // Convertir la lista de jugadores desde un string a un array
  const playersList = JSON.parse(players);

  return (
    <div className="text-center">
      <h2 className="text-2xl mb-4">Juego en Progreso</h2>
      <div>
        {playersList.map((player, index) => (
          <div key={index} className="mb-2">
            <h3 className="font-bold">{player}</h3>
            <p>Puntaje: 0</p>
            <p>Turno 1: 0 pinos</p>
            <p>Turno 2: 0 pinos</p>
          </div>
        ))}
      </div>
    </div>
  );
}
