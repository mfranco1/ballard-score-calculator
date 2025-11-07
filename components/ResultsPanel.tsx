import React, { useState, useCallback } from 'react';
import { NEUROMUSCULAR_CRITERIA } from '../constants';
import Tooltip from './Tooltip';
import type { BallardCriterion, Scores } from '../types';
import { analytics } from '../utils/analytics';

interface ResultsPanelProps {
  neuromuscularScore: number | null;
  physicalScore: number | null;
  totalScore: number | null;
  gestationalAge: number | null;
  isComplete: boolean;
  onReset: () => void;
  scores: Scores;
  physicalCriteria: BallardCriterion[];
}

const ResultRow: React.FC<{ label: string; value: string | number | null; unit?: string }> = ({ label, value, unit }) => (
  <div className="flex justify-between items-baseline py-3 border-b border-slate-200">
    <span className="text-sm text-slate-600">{label}</span>
    <span className="text-lg font-semibold text-slate-800">
      {value ?? '-'}
      {value !== null && unit && <span className="text-sm font-normal text-slate-500 ml-1">{unit}</span>}
    </span>
  </div>
);

const ResultsPanel: React.FC<ResultsPanelProps> = ({ 
  neuromuscularScore, 
  physicalScore, 
  totalScore, 
  gestationalAge,
  isComplete,
  onReset,
  scores,
  physicalCriteria
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (!isComplete || totalScore === null || gestationalAge === null || neuromuscularScore === null || physicalScore === null) return;

    const neuroScoresText = NEUROMUSCULAR_CRITERIA.map(c => scores[c.id] ?? '?').join(' ');
    const physicalScoresText = physicalCriteria.map(c => scores[c.id] ?? '?').join(' ');

    const textToCopy = `PEDIATRIC AGING (Ballard score)
NM = ${neuroScoresText} = ${neuromuscularScore} total
PM = ${physicalScoresText} = ${physicalScore} total
Total = ${totalScore} = ${gestationalAge} weeks by pediatric aging`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
      analytics.trackCopyResults();
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });

  }, [scores, neuromuscularScore, physicalScore, totalScore, gestationalAge, isComplete, physicalCriteria]);


  return (
    <div className="sticky top-8 bg-white rounded-xl shadow-md p-6 lg:p-8">
      <Tooltip content="Summarizes the calculated scores and the estimated gestational age.">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Results</h2>
      </Tooltip>
      
      {!isComplete && (
        <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-lg">
          <p className="text-slate-500">Awaiting all selections...</p>
        </div>
      )}

      {isComplete && (
        <div className="animate-fade-in">
          <Tooltip content={`Total score of ${totalScore} corresponds to an estimated gestational age of ${gestationalAge} weeks.`}>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6 text-center">
              <p className="text-sm text-indigo-700">Maturity Rating</p>
              <p className="text-4xl font-extrabold text-indigo-600 my-1">{totalScore}</p>
              <p className="text-xl font-semibold text-indigo-800">{gestationalAge} weeks</p>
            </div>
          </Tooltip>
          
          <div className="space-y-2">
            <ResultRow label="Neuromuscular Score" value={neuromuscularScore} />
            <ResultRow label="Physical Score" value={physicalScore} />
          </div>
        </div>
      )}

      <div className="mt-8 space-y-3">
        {isComplete && (
          <Tooltip content="Copies a formatted summary of the scores to your clipboard.">
            <button
            onClick={handleCopy}
            disabled={isCopied}
            className="w-full text-center py-3 px-4 rounded-lg font-semibold text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
            {isCopied ? 'Copied to Clipboard!' : 'Copy Summary'}
            </button>
          </Tooltip>
        )}
        <Tooltip content="Clears all selections and resets the calculator.">
          <button
            onClick={onReset}
            className="w-full text-center py-3 px-4 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default ResultsPanel;