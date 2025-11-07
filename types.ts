
export interface BallardOption {
  score: number;
  description: string;
}

export interface BallardCriterion {
  id: string;
  name: string;
  options: BallardOption[];
}

export interface Scores {
  [key: string]: number | null;
}
