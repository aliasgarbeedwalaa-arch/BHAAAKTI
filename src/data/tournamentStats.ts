import { TrophyWinner } from '../types';

export const WORLD_CUP_CHAMPIONS: TrophyWinner[] = [
  { year: 2022, host: 'Qatar', champion: 'Argentina', runnerUp: 'France', score: '3-3 (4-2 p)', topScorer: 'Kylian Mbappé', topScorerGoals: 8, flag: '🇦🇷' },
  { year: 2018, host: 'Russia', champion: 'France', runnerUp: 'Croatia', score: '4-2', topScorer: 'Harry Kane', topScorerGoals: 6, flag: '🇫🇷' },
  { year: 2014, host: 'Brazil', champion: 'Germany', runnerUp: 'Argentina', score: '1-0 (aet)', topScorer: 'James Rodríguez', topScorerGoals: 6, flag: '🇩🇪' },
  { year: 2010, host: 'South Africa', champion: 'Spain', runnerUp: 'Netherlands', score: '1-0 (aet)', topScorer: 'Thomas Müller', topScorerGoals: 5, flag: '🇪🇸' },
  { year: 2006, host: 'Germany', champion: 'Italy', runnerUp: 'France', score: '1-1 (5-3 p)', topScorer: 'Miroslav Klose', topScorerGoals: 5, flag: '🇮🇹' },
  { year: 2002, host: 'Korea / Japan', champion: 'Brazil', runnerUp: 'Germany', score: '2-0', topScorer: 'Ronaldo Nazário', topScorerGoals: 8, flag: '🇧🇷' },
  { year: 1998, host: 'France', champion: 'France', runnerUp: 'Brazil', score: '3-0', topScorer: 'Davor Šuker', topScorerGoals: 6, flag: '🇫🇷' },
  { year: 1994, host: 'United States', champion: 'Brazil', runnerUp: 'Italy', score: '0-0 (3-2 p)', topScorer: 'Hristo Stoichkov & Oleg Salenko', topScorerGoals: 6, flag: '🇧🇷' },
  { year: 1990, host: 'Italy', champion: 'West Germany', runnerUp: 'Argentina', score: '1-0', topScorer: 'Salvatore Schillaci', topScorerGoals: 6, flag: '🇩🇪' },
  { year: 1986, host: 'Mexico', champion: 'Argentina', runnerUp: 'West Germany', score: '3-2', topScorer: 'Gary Lineker', topScorerGoals: 6, flag: '🇦🇷' },
  { year: 1982, host: 'Spain', champion: 'Italy', runnerUp: 'West Germany', score: '3-1', topScorer: 'Paolo Rossi', topScorerGoals: 6, flag: '🇮🇹' },
  { year: 1978, host: 'Argentina', champion: 'Argentina', runnerUp: 'Netherlands', score: '3-1 (aet)', topScorer: 'Mario Kempes', topScorerGoals: 6, flag: '🇦🇷' },
  { year: 1974, host: 'West Germany', champion: 'West Germany', runnerUp: 'Netherlands', score: '2-1', topScorer: 'Grzegorz Lato', topScorerGoals: 7, flag: '🇩🇪' },
  { year: 1970, host: 'Mexico', champion: 'Brazil', runnerUp: 'Italy', score: '4-1', topScorer: 'Gerd Müller', topScorerGoals: 10, flag: '🇧🇷' },
  { year: 1966, host: 'England', champion: 'England', runnerUp: 'West Germany', score: '4-2 (aet)', topScorer: 'Eusébio', topScorerGoals: 9, flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { year: 1962, host: 'Chile', champion: 'Brazil', runnerUp: 'Czechoslovakia', score: '3-1', topScorer: 'Garrincha & Vavá', topScorerGoals: 4, flag: '🇧🇷' },
  { year: 1958, host: 'Sweden', champion: 'Brazil', runnerUp: 'Sweden', score: '5-2', topScorer: 'Just Fontaine', topScorerGoals: 13, flag: '🇧🇷' },
  { year: 1954, host: 'Switzerland', champion: 'West Germany', runnerUp: 'Hungary', score: '3-2', topScorer: 'Sándor Kocsis', topScorerGoals: 11, flag: '🇩🇪' },
  { year: 1950, host: 'Brazil', champion: 'Uruguay', runnerUp: 'Brazil', score: '2-1', topScorer: 'Ademir', topScorerGoals: 8, flag: '🇺🇾' },
  { year: 1930, host: 'Uruguay', champion: 'Uruguay', runnerUp: 'Argentina', score: '4-2', topScorer: 'Guillermo Stábile', topScorerGoals: 8, flag: '🇺🇾' }
];

export const ALL_TIME_TITLES = [
  { country: 'Brazil', titles: 5, years: '1958, 1962, 1970, 1994, 2002', flag: '🇧🇷', color: 'bg-emerald-500' },
  { country: 'Germany', titles: 4, years: '1954, 1974, 1990, 2014', flag: '🇩🇪', color: 'bg-amber-500' },
  { country: 'Italy', titles: 4, years: '1934, 1938, 1982, 2006', flag: '🇮🇹', color: 'bg-blue-600' },
  { country: 'Argentina', titles: 3, years: '1978, 1986, 2022', flag: '🇦🇷', color: 'bg-cyan-500' },
  { country: 'France', titles: 2, years: '1998, 2018', flag: '🇫🇷', color: 'bg-indigo-600' },
  { country: 'Uruguay', titles: 2, years: '1930, 1950', flag: '🇺🇾', color: 'bg-sky-500' },
  { country: 'England', titles: 1, years: '1966', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: 'bg-rose-500' },
  { country: 'Spain', titles: 1, years: '2010', flag: '🇪🇸', color: 'bg-red-500' }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export const WORLD_CUP_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Who is the all-time top goalscorer in FIFA World Cup history?',
    options: ['Pelé', 'Ronaldo Nazário', 'Miroslav Klose', 'Lionel Messi'],
    correctAnswerIndex: 2,
    explanation: 'Germany’s Miroslav Klose scored 16 goals across four tournaments (2002, 2006, 2010, 2014), surpassing Brazil’s Ronaldo (15 goals) during the 7-1 win in 2014.'
  },
  {
    id: 2,
    question: 'Which nation became the first African team to reach a World Cup semifinal?',
    options: ['Cameroon (1990)', 'Senegal (2002)', 'Ghana (2010)', 'Morocco (2022)'],
    correctAnswerIndex: 3,
    explanation: 'Morocco made history in Qatar 2022 by defeating Belgium, Spain, and Portugal to become the first African and Arab nation in the semifinals.'
  },
  {
    id: 3,
    question: 'Which stadium will host the 2026 FIFA World Cup Final?',
    options: ['Estadio Azteca (Mexico City)', 'MetLife Stadium (New Jersey)', 'SoFi Stadium (Los Angeles)', 'Hard Rock Stadium (Miami)'],
    correctAnswerIndex: 1,
    explanation: 'FIFA announced MetLife Stadium in East Rutherford, New Jersey as the official venue for the 2026 Final on July 19, 2026.'
  },
  {
    id: 4,
    question: 'What record does Just Fontaine hold in World Cup history from 1958?',
    options: ['Fastest hat-trick in a final', 'Most goals in a single tournament (13 goals)', 'Youngest player to score', 'Most penalties saved'],
    correctAnswerIndex: 1,
    explanation: 'France’s Just Fontaine scored 13 goals in just six matches in Sweden 1958, an all-time record that has never been equaled.'
  },
  {
    id: 5,
    question: 'Who scored both the "Hand of God" and the "Goal of the Century" in the same 1986 match?',
    options: ['Diego Maradona', 'Jorge Valdano', 'Michel Platini', 'Gary Lineker'],
    correctAnswerIndex: 0,
    explanation: 'Diego Armando Maradona produced both unforgettable moments against England in the quarterfinals at Estadio Azteca within 4 minutes.'
  }
];
