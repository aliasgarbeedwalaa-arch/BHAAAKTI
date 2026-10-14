import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { WORLD_CUP_QUIZ } from '../data/tournamentStats';

export const WorldCupQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentQ = WORLD_CUP_QUIZ[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < WORLD_CUP_QUIZ.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
  };

  return (
    <div className="my-16 bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/20 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>Interactive Football IQ Challenge</span>
        </div>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
          Chapter 4: The Mastermind Quiz — How High Is Your World Cup IQ?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 mb-8">
          Test your knowledge of legendary World Cup records, iconic goals, and tournament lore.
        </p>

        {!isQuizCompleted ? (
          <div>
            {/* Progress Header */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
              <span>Question {currentIdx + 1} of {WORLD_CUP_QUIZ.length}</span>
              <span className="font-bold text-amber-400">Score: {score} pts</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / WORLD_CUP_QUIZ.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 className="font-heading font-bold text-lg sm:text-xl text-white mb-6">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-200';

                if (isAnswerSubmitted) {
                  if (idx === currentQ.correctAnswerIndex) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                  } else {
                    btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-amber-500/20 border-amber-400 text-amber-300';
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium flex items-center justify-between transition-all ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswerSubmitted && idx === currentQ.correctAnswerIndex && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && idx !== currentQ.correctAnswerIndex && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation card after submit */}
            {isAnswerSubmitted && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6 animate-fadeIn">
                <p className="text-xs text-amber-400 font-bold mb-1">Historic Context:</p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Action button */}
            <div className="flex justify-end">
              {!isAnswerSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleSubmitAnswer}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all"
                >
                  Confirm Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all"
                >
                  {currentIdx < WORLD_CUP_QUIZ.length - 1 ? 'Next Question →' : 'View Final Score Certificate →'}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Quiz Results Certificate */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-2">
              World Cup IQ Result: {score} / {WORLD_CUP_QUIZ.length}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6">
              {score === 5
                ? '🏆 Flawless World Cup Scholar! You belong in the FIFA technical study committee!'
                : score >= 3
                ? '⭐ Impressive Football Connoisseur! You know your tournament folklore.'
                : '⚽ A solid effort! Dive deeper into the 10 chronicles above to sharpen your World Cup lore.'}
            </p>
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Challenge</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
