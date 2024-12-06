import React, { useState } from 'react';
import * as XLSX from 'xlsx';

interface FileUploaderProps {
  onAddParticipants: (participants: string[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onAddParticipants }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);

      // Filtrar la columna que contiene "NOMBRES"
      const names = jsonData.map((row) =>
        Object.values(row).find((val) =>
          typeof val === 'string' && val.toLowerCase().includes('nombre')
        )
      );

      onAddParticipants(names.filter(Boolean) as string[]);
      setFileName(file.name);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="file-uploader">
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
      {fileName && <p>Archivo cargado: {fileName}</p>}
    </div>
  );
};

export default FileUploader;
