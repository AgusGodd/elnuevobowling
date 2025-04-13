// components/FinalScreen.js
import { useRouter } from "next/router";

export default function FinalScreen() {
  const router = useRouter();
  
  const restartGame = () => {
    router.push("/playersetup"); // Redirigir al inicio
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
