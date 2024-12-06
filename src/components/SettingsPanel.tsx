import React from 'react';

interface Settings {
  title: string;
  numWinners: number;
  filterDuplicates: boolean;
  animationDuration: number;
}

interface SettingsPanelProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, setSettings }) => {
  return (
    <div className="bg-pink-100 p-4 rounded-lg shadow-md">
      <h2 className="font-bold text-lg mb-4">Configuración</h2>
      <div className="mb-2">
        <label className="block font-bold">Título</label>
        <input
          type="text"
          value={settings.title}
          onChange={(e) => setSettings({ ...settings, title: e.target.value })}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-2">
        <label className="block font-bold">Número de Ganadores</label>
        <input
          type="number"
          value={settings.numWinners}
          onChange={(e) => setSettings({ ...settings, numWinners: +e.target.value })}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-2">
        <label className="block font-bold">Filtrar Duplicados</label>
        <input
          type="checkbox"
          checked={settings.filterDuplicates}
          onChange={(e) => setSettings({ ...settings, filterDuplicates: e.target.checked })}
          className="ml-2"
        />
      </div>
      <div className="mb-2">
        <label className="block font-bold">Duración de la Animación (segundos)</label>
        <input
          type="number"
          value={settings.animationDuration}
          onChange={(e) => setSettings({ ...settings, animationDuration: +e.target.value })}
          className="w-full border rounded p-2"
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
