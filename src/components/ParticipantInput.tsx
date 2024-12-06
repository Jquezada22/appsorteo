import React, { useState } from 'react';

interface ParticipantsInputProps {
  setParticipants: (participants: string[]) => void;
}

const ParticipantsInput: React.FC<ParticipantsInputProps> = ({ setParticipants }) => {
  const [input, setInput] = useState('');

  const handleAddParticipants = () => {
    const newParticipants = input.split('\n').filter((name) => name.trim() !== '');
    setParticipants(newParticipants);
  };

  return (
    <div>
      <label className="block text-gray-700 font-bold">Participantes</label>
      <textarea
        className="w-full h-40 border rounded p-2 mt-2"
        placeholder="Introduce los nombres, separados por líneas"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleAddParticipants}
        className="mt-2 bg-pink-500 text-white px-4 py-2 rounded"
      >
        Añadir Participantes
      </button>
    </div>
  );
};

export default ParticipantsInput;
