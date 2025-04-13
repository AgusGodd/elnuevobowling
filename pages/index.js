import PlayerSetup from '../components/PlayerSetup';  // Correcta ruta a PlayerSetup
import GameScreen from '../components/GameScreen';    // Correcta ruta a GameScreen
import FinalScreen from '../components/FinalScreen';  // Correcta ruta a FinalScreen

export default function Home() {
  return (
    <div>
      <PlayerSetup />  {/* Usando PlayerSetup */}
      <GameScreen />   {/* Usando GameScreen */}
      <FinalScreen />  {/* Usando FinalScreen */}
    </div>
  );
}
