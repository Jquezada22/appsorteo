import { useState } from 'react';
import useStore from '../store/store';

const RandomDrawPanel = () => {
  const participants = useStore((state) => state.participants);
  const [title, setTitle] = useState('');
  const [numWinners, setNumWinners] = useState(1);
  const [duration, setDuration] = useState(10);

  const handleDraw = () => {
    // Lógica para iniciar el sorteo
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Opciones del Sorteo</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Título del sorteo"
          className="w-full p-2 border rounded"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cantidad de ganadores"
          className="w-full p-2 border rounded"
          onChange={(e) => setNumWinners(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Duración de la animación (s)"
          className="w-full p-2 border rounded"
          onChange={(e) => setDuration(Number(e.target.value))}
        />
        <button
          onClick={handleDraw}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          Iniciar Sorteo
        </button>
      </div>
    </div>
  );
};

export default RandomDrawPanel;
