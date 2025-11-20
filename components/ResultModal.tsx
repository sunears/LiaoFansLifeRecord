import React from 'react';
import { ResolutionResult } from '../types';

interface ResultModalProps {
  result: ResolutionResult;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ result, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-paper-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-stone-300 animate-[fadeIn_0.3s_ease-out]">
        <div className="bg-ink-black text-paper-white p-4 text-center">
          <h3 className="font-serif text-xl tracking-widest">因果判定</h3>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-lg leading-relaxed">{result.narrative}</p>
            <p className="text-sm font-serif italic text-stone-500 border-t border-stone-200 pt-2 mt-4">
              "{result.critique}"
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center bg-stone-100 p-4 rounded-lg">
            <div>
              <div className="text-xs uppercase text-stone-500">功德 (Merit)</div>
              <div className={`text-xl font-bold ${result.meritChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {result.meritChange > 0 ? '+' : ''}{result.meritChange}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase text-stone-500">智慧 (Wisdom)</div>
              <div className={`text-xl font-bold ${result.wisdomChange >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {result.wisdomChange > 0 ? '+' : ''}{result.wisdomChange}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase text-stone-500">命运 (Destiny)</div>
              <div className={`text-xl font-bold ${result.destinyChange >= 0 ? 'text-amber-600' : 'text-red-600'}`}>
                {result.destinyChange > 0 ? '+' : ''}{result.destinyChange}
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-3 bg-seal-red text-white font-bold rounded hover:bg-red-700 transition-colors font-serif tracking-wider"
          >
            继续修行
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;