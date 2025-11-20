import React from 'react';
import { Scenario } from '../types';

interface ScenarioViewProps {
  scenario: Scenario | null;
  loading: boolean;
}

const ScenarioView: React.FC<ScenarioViewProps> = ({ scenario, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 md:h-64 animate-pulse">
        <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-stone-300 border-t-seal-red rounded-full animate-spin mb-4"></div>
        <p className="text-stone-500 font-serif italic text-sm md:text-base">天道推演中...</p>
      </div>
    );
  }

  if (!scenario) return <div className="h-48 md:h-64 flex items-center justify-center text-stone-400 text-sm md:text-base">等待命运的安排...</div>;

  return (
    <div className="relative bg-white p-5 md:p-8 rounded-lg shadow-lg border-double border-4 border-stone-200 max-w-2xl mx-auto text-center transform transition-all duration-500">
      {/* Decorative Seal */}
      <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-seal-red/10 border border-seal-red/30 flex items-center justify-center rotate-12">
        <span className="text-seal-red font-calligraphy text-lg md:text-xl">命</span>
      </div>

      <h2 className="text-xl md:text-3xl font-serif font-bold text-ink-black mb-3 md:mb-4">{scenario.title}</h2>
      <div className="w-10 md:w-12 h-1 bg-seal-red mx-auto mb-4 md:mb-6"></div>
      <p className="text-base md:text-lg text-stone-700 leading-relaxed font-serif">
        {scenario.description}
      </p>
      
      {/* Difficulty Indicator */}
      <div className="mt-4 md:mt-6 flex justify-center space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i} 
            className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${i < scenario.difficulty ? 'bg-stone-800' : 'bg-stone-200'}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default ScenarioView;