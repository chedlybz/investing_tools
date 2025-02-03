import React from 'react';
import type { CalculMode } from '../types';

interface ModeSelectorProps {
  mode: CalculMode;
  onChange: (mode: CalculMode) => void;
  className?: string;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onChange, className = '' }) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
            mode === 'brut'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => onChange('brut')}
        >
          Calcul Brut
        </button>
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium border-t border-b ${
            mode === 'net'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => onChange('net')}
        >
          Calcul Net
        </button>
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
            mode === 'netImpots'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => onChange('netImpots')}
        >
          Calcul Net d'Impôts
        </button>
      </div>
    </div>
  );
};