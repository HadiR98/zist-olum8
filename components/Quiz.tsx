
import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';

export const Quiz: React.FC = () => {
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
    QUIZ_QUESTIONS.forEach(q => {
      if (currentAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="space-y-8">
      {QUIZ_QUESTIONS.map((q, idx) => (
        <div key={q.id} className="bg-white p-6 rounded-2xl shadow-sm border-r-4 border-blue-500">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-1 rounded-lg text-sm">{idx + 1}</span>
            {q.text}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {q.type === 'multiple-choice' ? (
              q.options?.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(q.id, opt)}
                  className={`p-3 text-right rounded-xl border-2 transition-all ${
                    submitted[q.id]
                      ? opt === q.correctAnswer
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : currentAnswers[q.id] === opt
                        ? 'bg-red-50 border-red-500 text-red-700'
                        : 'bg-gray-50 border-gray-200'
                      : 'hover:border-blue-400 border-gray-100 bg-gray-50'
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
                  className={`p-3 text-right rounded-xl border-2 transition-all ${
                    submitted[q.id]
                      ? val === q.correctAnswer
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : currentAnswers[q.id] === val
                        ? 'bg-red-50 border-red-500 text-red-700'
                        : 'bg-gray-50 border-gray-200'
                      : 'hover:border-blue-400 border-gray-100 bg-gray-50'
                  }`}
                >
                  {val ? 'درست' : 'نادرست'}
                </button>
              ))
            )}
          </div>

          {submitted[q.id] && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${currentAnswers[q.id] === q.correctAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <strong>توضیح:</strong> {q.explanation}
            </div>
          )}
        </div>
      ))}

      <div className="text-center py-10">
        {!showResult ? (
            <button 
                onClick={() => setShowResult(true)}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-colors"
            >
                مشاهده نمره نهایی
            </button>
        ) : (
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-3xl shadow-xl animate-bounce">
                <h4 className="text-2xl font-bold mb-2">آفرین قهرمان! 🏅</h4>
                <p className="text-xl">نمره شما: {calculateScore()} از {QUIZ_QUESTIONS.length}</p>
                <button onClick={() => window.location.reload()} className="mt-4 underline">تلاش مجدد</button>
            </div>
        )}
      </div>
    </div>
  );
};
