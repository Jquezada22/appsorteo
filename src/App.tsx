import React, { useState } from 'react';
import SorteoPage from './components/SorteoPage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <SorteoPage />
    </div>
  );
};

export default App;
