import React from 'react';
import ScoreCard from './ScoreCard';
import Tooltip from './Tooltip';
import type { BallardCriterion, Scores } from '../types';

interface ScoreCategoryProps {
  title: string;
  criteria: BallardCriterion[];
  scores: Scores;
  subtotal: number | null;
  onSelect: (id: string, score: number) => void;
  tooltip?: string;
}

const ScoreCategory: React.FC<ScoreCategoryProps> = ({ title, criteria, scores, subtotal, onSelect, tooltip }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-baseline px-2">
        {tooltip ? (
          <Tooltip content={tooltip}>
            <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          </Tooltip>
        ) : (
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        )}
        <div className="text-right">
          <span className="text-sm text-slate-500 mr-2">Subtotal</span>
          <span className="font-bold text-xl text-indigo-600">{subtotal ?? '-'}</span>
        </div>
      </div>
      <div className="space-y-4">
        {criteria.map((criterion) => (
          <ScoreCard
            key={criterion.id}
            criterion={criterion}
            selectedValue={scores[criterion.id] ?? null}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ScoreCategory;
