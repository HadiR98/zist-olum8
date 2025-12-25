
import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface Props {
  questions: QuizQuestion[];
}

export const Quiz: React.FC<Props> = ({ questions }) => {
  const [currentAnswers, setCurrentAnswers] = useState<Record<number, any>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (qId: number, value: any) => {
    if (submitted[qId]) return;
    setCurrentAnswers({ ...currentAnswers, [qId]: value });
    setSubmitted({ ...submitted, [qId]: true });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (currentAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="space-y-8 pb-10">
      {questions.map((q, idx) => (
        <div key={q.id} className="bg-white p-6 rounded-3xl shadow-sm border-r-8 border-blue-500 animate-in" style={{ animationDelay: `${idx * 0.1}s` }}>
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-start">
            <span className="ml-3 bg-blue-100 text-blue-600 w-8 h-8 flex items-center justify-center rounded-full text-sm shrink-0">{idx + 1}</span>
            {q.text}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {q.type === 'multiple-choice' ? (
              q.options?.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(q.id, opt)}
                  className={`p-4 text-right rounded-2xl border-2 transition-all font-medium ${
                    submitted[q.id]
                      ? opt === q.correctAnswer
                        ? 'bg-green-50 border-green-500 text-green-700 ring-2 ring-green-200'
                        : currentAnswers[q.id] === opt
                        ? 'bg-red-50 border-red-500 text-red-700'
                        : 'bg-gray-50 border-gray-100 text-gray-400'
                      : 'hover:border-blue-400 border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md'
                  }`}
                >
                  {opt}
                </button>
              ))
            ) : (
              [true, false].map(val => (
                <button
                  key={val.toString()}
                  onClick={() => handleAnswer(q.id, val)}
                  className={`p-4 text-right rounded-2xl border-2 transition-all font-bold ${
                    submitted[q.id]
                      ? val === q.correctAnswer
                        ? 'bg-green-50 border-green-500 text-green-700 ring-2 ring-green-200'
                        : currentAnswers[q.id] === val
                        ? 'bg-red-50 border-red-500 text-red-700'
                        : 'bg-gray-50 border-gray-100 text-gray-400'
                      : 'hover:border-blue-400 border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md'
                  }`}
                >
                  {val ? 'درست' : 'نادرست'}
                </button>
              ))
            )}
          </div>

          {submitted[q.id] && (
            <div className={`mt-6 p-4 rounded-2xl text-sm leading-relaxed ${currentAnswers[q.id] === q.correctAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{currentAnswers[q.id] === q.correctAnswer ? '✅' : '❌'}</span>
                <strong>{currentAnswers[q.id] === q.correctAnswer ? 'آفرین! درست بود.' : 'دقت کن!'}</strong>
              </div>
              <p>{q.explanation}</p>
            </div>
          )}
        </div>
      ))}

      <div className="text-center py-10">
        {!showResult ? (
            <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setShowResult(true);
                }}
                className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black shadow-xl hover:bg-blue-700 hover:scale-105 transition-all"
            >
                پایان آزمون و مشاهده نتیجه
            </button>
        ) : (
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-10 rounded-[3rem] shadow-2xl animate-in fade-in zoom-in">
                <div className="text-6xl mb-4">🏆</div>
                <h4 className="text-3xl font-black mb-2">خسته نباشی قهرمان!</h4>
                <p className="text-xl opacity-90 mb-6">شما به {calculateScore()} سوال از {questions.length} سوال پاسخ درست دادید.</p>
                <div className="w-full bg-white/20 h-4 rounded-full overflow-hidden mb-8">
                  <div className="bg-yellow-400 h-full transition-all duration-1000" style={{ width: `${(calculateScore() / questions.length) * 100}%` }}></div>
                </div>
                <button onClick={() => window.location.reload()} className="bg-white text-blue-700 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">تلاش مجدد در فصل‌ها</button>
            </div>
        )}
      </div>
    </div>
  );
};
