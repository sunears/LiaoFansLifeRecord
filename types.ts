export enum GamePhase {
  INIT = 'INIT',
  SCENARIO_LOADING = 'SCENARIO_LOADING',
  PLAYER_TURN = 'PLAYER_TURN',
  RESOLVING = 'RESOLVING',
  RESULT = 'RESULT',
  GAME_OVER = 'GAME_OVER',
}

export interface CardData {
  id: string;
  name: string;
  type: 'Reform' | 'Accumulate' | 'Humility' | 'Wisdom';
  description: string;
  quote: string; // Original text from Liaofan
}

export interface Scenario {
  title: string;
  description: string;
  difficulty: number; // 1-5
  context?: string; // Hidden context for the AI
}

export interface ResolutionResult {
  narrative: string;
  meritChange: number;
  wisdomChange: number;
  destinyChange: number;
  critique: string; // A short lesson from the "Master"
}

export interface PlayerStats {
  merit: number;   // 功德
  wisdom: number;  // 智慧
  destiny: number; // 命运 (Luck/Health)
  turn: number;
}

export interface LogEntry {
  turn: number;
  scenarioTitle: string;
  actionCard: string;
  outcome: string;
  statsDelta: { m: number; w: number; d: number };
}