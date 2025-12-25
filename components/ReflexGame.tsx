
import React, { useState, useEffect, useRef } from 'react';

export const ReflexGame: React.FC = () => {
  const [gameState, setGameState] = useState<'IDLE' | 'WAITING' | 'READY' | 'FINISHED' | 'TOO_EARLY'>('IDLE');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const startGame = () => {
    setGameState('WAITING');
    setReactionTime(null);
    const delay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
    timerRef.current = window.setTimeout(() => {
      setGameState('READY');
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleInteraction = () => {
    if (gameState === 'WAITING') {
      if (timerRef.current) clearTimeout(timerRef.current);
      setGameState('TOO_EARLY');
    } else if (gameState === 'READY') {
      const endTime = Date.now();
      setReactionTime(endTime - startTimeRef.current);
      setGameState('FINISHED');
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-xl border-t-8 border-purple-500 min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">بازی سرعت واکنش عصبی ⚡</h2>
      <p className="text-gray-600 mb-8 text-center">
        وقتی رنگ صفحه سبز شد، سریعاً کلیک کن! این بازی سرعت پردازش نورون‌های حسی و حرکتی تو رو نشون می‌ده.
      </p>

      <div 
        onClick={gameState === 'IDLE' || gameState === 'FINISHED' || gameState === 'TOO_EARLY' ? undefined : handleInteraction}
        className={`w-full max-w-md h-64 rounded-2xl cursor-pointer flex items-center justify-center transition-all duration-300 relative overflow-hidden ${
          gameState === 'IDLE' ? 'bg-gray-100 border-4 border-dashed border-gray-300' :
          gameState === 'WAITING' ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]' :
          gameState === 'READY' ? 'bg-green-500 shadow-[0_0_30px_rgba(34,197,94,0.7)] scale-105' :
          gameState === 'FINISHED' ? 'bg-blue-100' : 'bg-yellow-400'
        }`}
      >
        <div className="text-center p-4">
          {gameState === 'IDLE' && (
            <button 
              onClick={(e) => { e.stopPropagation(); startGame(); }}
              className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-purple-700 transition-colors"
            >
              شروع چالش
            </button>
          )}
          {gameState === 'WAITING' && <p className="text-white text-2xl font-bold animate-pulse">منتظر بمان...</p>}
          {gameState === 'READY' && <p className="text-white text-4xl font-bold animate-bounce">کلیک کن!</p>}
          {gameState === 'TOO_EARLY' && (
            <div className="text-gray-900">
              <p className="text-xl font-bold">خیلی زود بود! 😅</p>
              <button onClick={startGame} className="mt-4 underline">دوباره امتحان کن</button>
            </div>
          )}
          {gameState === 'FINISHED' && (
            <div className="text-gray-900">
              <p className="text-lg">زمان واکنش شما:</p>
              <p className="text-5xl font-black text-blue-600 my-2">{reactionTime} <small className="text-sm">میلی‌ثانیه</small></p>
              <p className="text-sm text-gray-500 mb-4">
                {reactionTime && reactionTime < 250 ? 'فوق‌العاده! نورون‌هایت با سرعت نور کار می‌کنند 🚀' : 
                 reactionTime && reactionTime < 400 ? 'خیلی خوب بود! سیستم عصبی سالمی داری ✅' : 
                 'خوب بود، اما با تمرکز بیشتر می‌توانی سریع‌تر باشی! 🧘'}
              </p>
              <button onClick={startGame} className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold">تلاش دوباره</button>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-purple-50 rounded-xl text-sm text-purple-800 leading-relaxed border-r-4 border-purple-200">
        <strong>نکته علمی:</strong> در این لحظه، نور حسی از چشم به مغز (مخ) رفته، پردازش شده و دستور حرکتی از ساقه مغز و نخاع به ماهیچه‌های دست رسیده است. تمام این‌ها در چند میلی‌ثانیه!
      </div>
    </div>
  );
};
