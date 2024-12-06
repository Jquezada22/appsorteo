import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Sorteo from './Sorteo';

const SorteoPage: React.FC = () => {
  const [nombres, setNombres] = useState<string[]>([]);
  const [nombresOriginales, setNombresOriginales] = useState<string[]>([]);
  const [titulo, setTitulo] = useState('');
  const [ganadores, setGanadores] = useState(1);
  const [duracion, setDuracion] = useState(10);
  const [eliminarDuplicados, setEliminarDuplicados] = useState(false);
  const [mostrarSorteo, setMostrarSorteo] = useState(false);
  const [archivoCargado, setArchivoCargado] = useState(false); // Estado para verificar si se cargó un archivo

  // Función para manejar la carga del archivo Excel
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const data = evt.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: 'binary' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

          // Convertir el contenido de la hoja en JSON con una fila de cabecera
          const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 }) as any[][];

          const cabecera = jsonData[0] as string[];
          const nombresColumnaIndex = cabecera.indexOf('NOMBRES');

          if (nombresColumnaIndex !== -1) {
            const nombresColumna = jsonData.slice(1).map((row: any) => row[nombresColumnaIndex]).filter(Boolean);
            setNombres(nombresColumna);
            setNombresOriginales(nombresColumna);
            setArchivoCargado(true); // Indicamos que el archivo se cargó correctamente
          } else {
            alert('No se encontró la columna "NOMBRES" en el archivo.');
            setArchivoCargado(false); // Si no se encontró la columna "NOMBRES"
          }
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  // Filtrar los duplicados dependiendo de la casilla
  useEffect(() => {
    if (eliminarDuplicados) {
      const nombresUnicos = Array.from(new Set(nombresOriginales));
      setNombres(nombresUnicos);
    } else {
      setNombres(nombresOriginales);
    }
  }, [eliminarDuplicados, nombresOriginales]);

  const handleIniciarSorteo = () => {
    if (titulo.trim() === '' || ganadores <= 0 || nombres.length === 0 || !archivoCargado) {
      alert('Por favor, complete todos los campos antes de iniciar el sorteo.');
      return;
    }
    setMostrarSorteo(true);
  };

  const handleRegresar = () => {
    setMostrarSorteo(false);
    setNombres([]);
    setNombresOriginales([]);
    setTitulo('');
    setGanadores(1);
    setDuracion(10);
    setEliminarDuplicados(false);
    setArchivoCargado(false); // Restablecer archivo cargado
  };

  if (mostrarSorteo) {
    return (
      <Sorteo
        nombres={nombres}
        titulo={titulo}
        ganadores={ganadores}
        duracion={duracion}
        onRegresar={handleRegresar}
      />
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Configuración del Sorteo</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Título del Sorteo</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Cantidad de Ganadores</label>
        <input
          type="number"
          className="w-full border rounded px-3 py-2"
          value={ganadores}
          onChange={(e) => setGanadores(Number(e.target.value))}
          min={1}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Duración del Sorteo (segundos)</label>
        <input
          type="number"
          className="w-full border rounded px-3 py-2"
          value={duracion}
          onChange={(e) => setDuracion(Number(e.target.value))}
          min={1}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Subir Archivo Excel</label>
        <input type="file" accept=".xlsx" onChange={handleFileUpload} />
      </div>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={eliminarDuplicados}
            onChange={(e) => setEliminarDuplicados(e.target.checked)}
          />
          Eliminar Duplicados
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Nombres Registrados</label>
        <ul className="list-disc pl-5">
          {nombres.map((nombre, index) => (
            <li key={index}>{nombre}</li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleIniciarSorteo}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Iniciar Sorteo
      </button>
    </div>
  );
};

export default SorteoPage;
