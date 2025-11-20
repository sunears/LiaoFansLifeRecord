import React from 'react';
import { PlayerStats } from '../types';

interface StatsPanelProps {
  stats: PlayerStats;
}

const StatItem: React.FC<{ label: string; value: number; icon: string; color: string }> = ({ label, value, icon, color }) => (
  <div className="flex flex-col md:flex-row items-center md:space-x-2 bg-white/80 px-2 py-1 md:px-3 md:py-1 rounded-lg md:rounded-full border border-stone-200 shadow-sm min-w-[60px] md:min-w-0 justify-center">
    <span className="text-lg md:text-xl mb-1 md:mb-0">{icon}</span>
    <div className="flex flex-col leading-none items-center md:items-start">
      <span className="text-[8px] md:text-[10px] uppercase text-stone-500 tracking-wider hidden md:block">{label}</span>
      <span className={`font-bold text-sm md:text-lg ${color}`}>{value}</span>
    </div>
  </div>
);

const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-2 md:p-4 w-full max-w-4xl mx-auto">
      <StatItem label="功德 (Merit)" value={stats.merit} icon="🪷" color="text-amber-600" />
      <StatItem label="智慧 (Wisdom)" value={stats.wisdom} icon="📜" color="text-indigo-600" />
      <StatItem label="命运 (Destiny)" value={stats.destiny} icon="☯️" color="text-stone-800" />
      <div className="ml-auto md:ml-auto flex items-center space-x-2 bg-ink-black text-paper-white px-3 py-1 md:px-4 rounded-full">
        <span className="text-[10px] md:text-xs">回合</span>
        <span className="font-bold font-serif text-base md:text-lg">{stats.turn}</span>
      </div>
    </div>
  );
};

export default StatsPanel;