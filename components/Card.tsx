import React from 'react';
import { CardData } from '../types';

interface CardProps {
  data: CardData;
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
}

const Card: React.FC<CardProps> = ({ data, onClick, disabled, selected }) => {
  const typeColors = {
    'Reform': 'border-red-800 bg-red-50 text-red-900',
    'Accumulate': 'border-amber-700 bg-amber-50 text-amber-900',
    'Humility': 'border-bamboo-green bg-green-50 text-green-900',
    'Wisdom': 'border-indigo-800 bg-indigo-50 text-indigo-900',
  };

  const typeNames = {
    'Reform': '改过之法',
    'Accumulate': '积善之方',
    'Humility': '谦德之效',
    'Wisdom': '立命之学',
  };

  // Responsive sizing: 
  // Mobile: approx 30% width to fit 3 in a row with gaps
  // Desktop: Fixed pixel size
  const baseStyle = "relative w-[28vw] h-[42vw] max-w-[160px] max-h-[240px] md:w-40 md:h-56 rounded-lg border-[1.5px] md:border-2 flex flex-col p-1.5 md:p-2 cursor-pointer transition-all duration-300 shadow-md select-none shrink-0";
  const hoverStyle = !disabled ? "hover:-translate-y-2 hover:shadow-xl active:scale-95" : "opacity-50 cursor-not-allowed";
  const selectedStyle = selected ? "ring-2 md:ring-4 ring-ant-gold -translate-y-2 md:-translate-y-4 shadow-2xl z-10 scale-105" : "";

  return (
    <div 
      className={`${baseStyle} ${typeColors[data.type]} ${hoverStyle} ${selectedStyle}`}
      onClick={!disabled ? onClick : undefined}
    >
      {/* Header */}
      <div className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-center border-b border-current pb-0.5 md:pb-1 mb-0.5 md:mb-1 opacity-70 truncate">
        {typeNames[data.type]}
      </div>

      {/* Title */}
      <div className="flex-grow flex items-center justify-center overflow-hidden py-1">
        <h3 className="font-calligraphy text-lg md:text-3xl text-center leading-tight writing-vertical-rl">
          {data.name}
        </h3>
      </div>

      {/* Quote Snippet - Hide on very small screens if needed, or make very small */}
      <div className="hidden md:block text-[10px] md:text-xs italic text-center mt-1 md:mt-2 leading-snug opacity-80 line-clamp-3">
        {data.description}
      </div>
      <div className="md:hidden text-[8px] text-center mt-1 leading-tight opacity-80 line-clamp-2">
        {data.description}
      </div>
    </div>
  );
};

export default Card;