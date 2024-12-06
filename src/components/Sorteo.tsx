import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

interface SorteoProps {
    nombres: string[];
    titulo: string;
    ganadores: number;
    duracion: number;
    onRegresar: () => void; // Nueva prop para manejar el regreso al panel de sorteo
}

const Sorteo: React.FC<SorteoProps> = ({ nombres, titulo, ganadores, duracion, onRegresar }) => {
    const [timeLeft, setTimeLeft] = useState(duracion);
    const [ganadoresSeleccionados, setGanadoresSeleccionados] = useState<string[]>([]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            const shuffled = [...nombres].sort(() => Math.random() - 0.5);
            setGanadoresSeleccionados(shuffled.slice(0, ganadores));
        }
    }, [timeLeft]);

    return (
        <>
            <div className="text-center">
                {timeLeft > 0 ? (
                    <div className="mt-12">
                        <h1 className="text-4xl font-bold mb-4">{titulo}</h1>
                        <p className="text-xl">El sorteo inicia en {timeLeft} segundos</p>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center mt-16">
                        <h1 className="text-5xl font-bold mb-6">{titulo}</h1>
                        <h2 className="text-4xl font-bold mb-4">Ganador:</h2>
                        <ul className="text-3xl mb-6">
                            {ganadoresSeleccionados.map((ganador, index) => (
                                <li key={index}>{ganador}</li>
                            ))}
                        </ul>
                        <Confetti />
                        <button
                            onClick={onRegresar} // Función para regresar al panel de sorteo
                            className="mt-6 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                        >
                            Regresar al Panel de Sorteo
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Sorteo;
