
import React, { useState } from 'react';
import { FlashcardData } from '../types';

interface Props {
  data: FlashcardData;
}

export const Flashcard: React.FC<Props> = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="perspective-1000 w-full h-48 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-white border-b-4 border-blue-500 rounded-2xl shadow-md flex flex-col items-center justify-center p-4 text-center">
          <span className="text-blue-500 font-bold mb-2">سوال</span>
          <p className="text-gray-800 font-medium text-lg">{data.question}</p>
          <p className="text-xs text-gray-400 mt-4 italic">برای مشاهده پاسخ کلیک کنید</p>
        </div>
        {/* Back */}
        <div className="absolute inset-0 backface-hidden bg-blue-600 rounded-2xl shadow-md flex flex-col items-center justify-center p-4 text-center rotate-y-180">
          <span className="text-white opacity-80 mb-2">پاسخ علمی</span>
          <p className="text-white font-medium leading-relaxed">{data.answer}</p>
        </div>
      </div>
    </div>
  );
};
