import React, { useState, useMemo, useCallback } from 'react';
import ResultsPanel from './components/ResultsPanel';
import ScoreCategory from './components/ScoreCategory';
import Tooltip from './components/Tooltip';
// Fix: Added missing import for ScoreCard component.
import ScoreCard from './components/ScoreCard';
import {
  NEUROMUSCULAR_CRITERIA,
  PHYSICAL_CRITERIA_BASE,
  GENITALS_MALE_CRITERION,
  GENITALS_FEMALE_CRITERION,
  GESTATIONAL_AGE_MAP,
} from './constants';
import type { BallardCriterion, Scores } from './types';

type Gender = 'male' | 'female';

const App: React.FC = () => {
  const [scores, setScores] = useState<Scores>({});
  const [gender, setGender] = useState<Gender>('male');

  const handleSelectScore = useCallback((id: string, score: number) => {
    setScores((prevScores) => ({ ...prevScores, [id]: score }));
  }, []);

  const handleReset = () => {
    setScores({});
  };
  
  const physicalCriteria = useMemo<BallardCriterion[]>(() => {
    const genderCriterion = gender === 'male' ? GENITALS_MALE_CRITERION : GENITALS_FEMALE_CRITERION;
    return [...PHYSICAL_CRITERIA_BASE, genderCriterion];
  }, [gender]);

  const allCriteriaIds = useMemo(() => {
      const neuroIds = NEUROMUSCULAR_CRITERIA.map(c => c.id);
      const physicalIds = physicalCriteria.map(c => c.id);
      return [...neuroIds, ...physicalIds];
  }, [physicalCriteria]);


  const { neuromuscularScore, physicalScore, totalScore, isComplete } = useMemo(() => {
    const neuroScore = NEUROMUSCULAR_CRITERIA.reduce((acc, criterion) => {
      const score = scores[criterion.id];
      return typeof score === 'number' ? acc + score : acc;
    }, 0);

    const physScore = physicalCriteria.reduce((acc, criterion) => {
      const score = scores[criterion.id];
      return typeof score === 'number' ? acc + score : acc;
    }, 0);
    
    const completedCount = allCriteriaIds.filter(id => scores[id] !== null && scores[id] !== undefined).length;
    const complete = completedCount === allCriteriaIds.length;

    return {
      neuromuscularScore: complete ? neuroScore : null,
      physicalScore: complete ? physScore : null,
      totalScore: complete ? neuroScore + physScore : null,
      isComplete: complete
    };
  }, [scores, physicalCriteria, allCriteriaIds]);

  const gestationalAge = useMemo<number | null>(() => {
    if (!isComplete || typeof totalScore !== 'number') {
      return null;
    }

    const ageMapScores = Object.keys(GESTATIONAL_AGE_MAP).map(Number).sort((a, b) => a - b);

    // Handle scores outside the map's range by clamping to the boundaries.
    if (totalScore <= ageMapScores[0]) {
      return GESTATIONAL_AGE_MAP[ageMapScores[0]];
    }
    if (totalScore >= ageMapScores[ageMapScores.length - 1]) {
      return GESTATIONAL_AGE_MAP[ageMapScores[ageMapScores.length - 1]];
    }

    // Find the lower bound score, which is the largest score in the map less than or equal to the total score.
    let lowerBoundScore = ageMapScores[0];
    for (const score of ageMapScores) {
      if (score <= totalScore) {
        lowerBoundScore = score;
      } else {
        break;
      }
    }

    // If the total score is an exact match in the map, return its corresponding weeks.
    if (lowerBoundScore === totalScore) {
      return GESTATIONAL_AGE_MAP[totalScore];
    }

    // Get the upper bound score and the weeks for both bounds.
    const lowerBoundIndex = ageMapScores.indexOf(lowerBoundScore);
    const upperBoundScore = ageMapScores[lowerBoundIndex + 1];
    const lowerBoundWeeks = GESTATIONAL_AGE_MAP[lowerBoundScore];
    const upperBoundWeeks = GESTATIONAL_AGE_MAP[upperBoundScore];

    // Perform linear interpolation to calculate the gestational age.
    const scoreRange = upperBoundScore - lowerBoundScore;
    const weekRange = upperBoundWeeks - lowerBoundWeeks;
    const scoreDiff = totalScore - lowerBoundScore;

    const interpolatedWeeks = lowerBoundWeeks + (scoreDiff * weekRange) / scoreRange;
    
    // Floor the result to get the final week, as per the user's examples.
    return Math.floor(interpolatedWeeks);
  }, [totalScore, isComplete]);


  const handleGenderChange = (newGender: Gender) => {
    setGender(newGender);
    // Remove score for the old gender criterion if it exists
    const oldCriterionId = newGender === 'male' ? 'genitals_female' : 'genitals_male';
    if (scores[oldCriterionId] !== null) {
      const newScores = { ...scores };
      delete newScores[oldCriterionId];
      setScores(newScores);
    }
  };
  
    const neuroSubtotal = useMemo(() => {
        return NEUROMUSCULAR_CRITERIA.reduce((acc, criterion) => {
            const score = scores[criterion.id];
            return typeof score === 'number' ? acc + score : acc;
        }, 0);
    }, [scores]);

    const physicalSubtotal = useMemo(() => {
        return physicalCriteria.reduce((acc, criterion) => {
            const score = scores[criterion.id];
            return typeof score === 'number' ? acc + score : acc;
        }, 0);
    }, [scores, physicalCriteria]);


  return (
    <div className="min-h-screen text-slate-800">
      <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Ballard Score Calculator</h1>
            <p className="text-sm text-slate-500 mt-1">For Pediatric Aging</p>
          </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 items-start">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
             <ScoreCategory
                title="Neuromuscular Maturity"
                criteria={NEUROMUSCULAR_CRITERIA}
                scores={scores}
                subtotal={neuroSubtotal}
                onSelect={handleSelectScore}
                tooltip="Assesses muscle tone and neurological reflexes."
              />
              <div>
                  <div className="flex justify-between items-baseline px-2">
                    <Tooltip content="Assesses physical signs of maturity like skin texture, lanugo, and more.">
                      <h2 className="text-xl font-bold text-slate-800">Physical Maturity</h2>
                    </Tooltip>
                     <div className="text-right">
                        <span className="text-sm text-slate-500 mr-2">Subtotal</span>
                        <span className="font-bold text-xl text-indigo-600">{physicalSubtotal}</span>
                    </div>
                  </div>
                   <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mt-6 mb-4">
                      <Tooltip content="Determines which 'Genitals' scoring criteria to use.">
                        <label className="text-sm font-medium text-slate-700">Patient Sex</label>
                      </Tooltip>
                       <div className="mt-2 grid grid-cols-2 gap-3">
                         <button onClick={() => handleGenderChange('male')} className={`py-2 px-3 rounded-md text-sm font-semibold transition-colors ${gender === 'male' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                           Male
                         </button>
                         <button onClick={() => handleGenderChange('female')} className={`py-2 px-3 rounded-md text-sm font-semibold transition-colors ${gender === 'female' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                           Female
                         </button>
                       </div>
                   </div>
                <div className="space-y-4">
                  {physicalCriteria.map((criterion) => (
                    <ScoreCard
                      key={criterion.id}
                      criterion={criterion}
                      selectedValue={scores[criterion.id] ?? null}
                      onSelect={handleSelectScore}
                    />
                  ))}
                </div>
              </div>
          </div>
          <div className="lg:col-span-1 mt-8 lg:mt-0">
             <ResultsPanel
                neuromuscularScore={neuromuscularScore}
                physicalScore={physicalScore}
                totalScore={totalScore}
                gestationalAge={gestationalAge}
                isComplete={isComplete}
                onReset={handleReset}
                scores={scores}
                physicalCriteria={physicalCriteria}
              />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;