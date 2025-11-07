
import React from 'react';
import type { BallardCriterion } from '../types';

interface ScoreCardProps {
  criterion: BallardCriterion;
  selectedValue: number | null;
  onSelect: (id: string, score: number) => void;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ criterion, selectedValue, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-200">
      <h3 className="font-semibold text-slate-700 mb-3">{criterion.name}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {criterion.options.map((option) => {
          const isSelected = selectedValue === option.score;
          return (
            <button
              key={option.score}
              onClick={() => onSelect(criterion.id, option.score)}
              className={`text-xs p-2 rounded-md text-center transition-all duration-200 border ${
                isSelected
                  ? 'bg-indigo-600 text-white font-bold border-indigo-600 shadow-md transform -translate-y-0.5'
                  : 'bg-slate-50 text-slate-600 hover:bg-indigo-100 hover:border-indigo-300 border-slate-200'
              }`}
            >
              <span className="font-bold text-sm block">{option.score}</span>
              <span className="mt-1 block leading-tight">{option.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreCard;
