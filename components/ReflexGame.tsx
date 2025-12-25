
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
    <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center p-4 md:p-8 bg-white rounded-[2.5rem] shadow-2xl border border-purple-100 overflow-hidden relative">
      
      {/* بخش گرافیکی - نمایش تصویر به صورت کامل */}
      <div className="flex-1 relative group overflow-hidden rounded-[2rem] shadow-inner bg-gradient-to-br from-gray-50 to-purple-50 min-h-[350px] border border-gray-100">
        {/* تصویر ارسالی کاربر با تنظیم object-contain برای نمایش تمام جزئیات */}
        <img 
          src="https://raw.githubusercontent.com/Anu-S/image-assets/main/nerve_reflex_soccer.png" 
          alt="فرآیند عصبی واکنش به توپ" 
          className="absolute inset-0 w-full h-full object-contain p-6 mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.02]"
          onError={(e) => {
            // Fallback در صورتی که لینک مستقیم کار نکند (برای اطمینان از تجربه کاربری)
            e.currentTarget.src = "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=1000";
          }}
        />
        
        {/* افکت‌های بصری تزئینی */}
        <div className="absolute top-4 right-4 bg-purple-600/10 text-purple-700 text-[10px] font-bold px-3 py-1 rounded-full border border-purple-200 backdrop-blur-sm">
          نمودار جریان عصبی
        </div>

        {/* توضیحات علمی روی تصویر */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/80 to-transparent">
          <div className="bg-purple-100/50 backdrop-blur-md p-4 rounded-2xl border border-purple-200">
            <h3 className="text-lg font-bold mb-1 text-purple-900 flex items-center gap-2">
              <span className="text-xl">🛤️</span>
              مسیر پیام عصبی
            </h3>
            <p className="text-xs text-purple-800 leading-relaxed font-medium">
              ۱. نورون حسی (چشم) پیام را می‌گیرد. ۲. پیام به مرکز عصبی (مغز) می‌رود. ۳. دستور حرکتی توسط اعصاب محیطی به ماهیچه دست می‌رسد.
            </p>
          </div>
        </div>
      </div>

      {/* بخش بازی و تعامل */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50 rounded-[2rem] border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-gray-800">تست سرعت واکنش ⚡</h2>
          <p className="text-gray-500 text-sm mt-1">تمرکز کن و در سریع‌ترین زمان ممکن کلیک کن!</p>
        </div>

        <div 
          onClick={gameState === 'IDLE' || gameState === 'FINISHED' || gameState === 'TOO_EARLY' ? undefined : handleInteraction}
          className={`w-full max-w-sm h-64 rounded-[2.5rem] cursor-pointer flex items-center justify-center transition-all duration-300 relative overflow-hidden group shadow-lg ${
            gameState === 'IDLE' ? 'bg-white hover:border-purple-300 border-2 border-gray-200' :
            gameState === 'WAITING' ? 'bg-rose-500 scale-[0.98]' :
            gameState === 'READY' ? 'bg-emerald-500 scale-105 shadow-emerald-200 shadow-2xl' :
            gameState === 'FINISHED' ? 'bg-white border-2 border-blue-100' : 'bg-amber-400'
          }`}
        >
          <div className="text-center">
            {gameState === 'IDLE' && (
              <div className="space-y-4">
                <div className="text-5xl opacity-80 group-hover:scale-110 transition-transform">🖱️</div>
                <button 
                  onClick={(e) => { e.stopPropagation(); startGame(); }}
                  className="bg-purple-600 text-white px-10 py-3 rounded-2xl font-black shadow-lg hover:bg-purple-700 transition-all active:scale-95"
                >
                  شروع چالش
                </button>
              </div>
            )}
            
            {gameState === 'WAITING' && (
              <div className="text-white space-y-2">
                <p className="text-2xl font-black animate-pulse uppercase">صبر کن...</p>
                <p className="text-xs opacity-80">وقتی سبز شد کلیک کن</p>
              </div>
            )}
            
            {gameState === 'READY' && (
              <p className="text-white text-4xl font-black">بزن روی صفحه!</p>
            )}
            
            {gameState === 'TOO_EARLY' && (
              <div className="text-gray-900 space-y-3">
                <p className="text-3xl">⚠️</p>
                <p className="text-lg font-bold">خیلی زود بود!</p>
                <button onClick={startGame} className="bg-gray-800 text-white px-6 py-2 rounded-xl text-sm">تلاش دوباره</button>
              </div>
            )}
            
            {gameState === 'FINISHED' && (
              <div className="animate-in fade-in zoom-in duration-300">
                <p className="text-gray-400 font-bold text-sm">زمان پاسخ‌دهی:</p>
                <div className="text-5xl font-black text-purple-600 my-2">
                    {reactionTime} <span className="text-lg text-gray-400">ms</span>
                </div>
                <button 
                  onClick={startGame} 
                  className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-purple-700"
                >
                  رکورد جدید؟
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* راهنمای کوچک */}
        <div className="mt-8 flex gap-2 items-center text-[10px] text-gray-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-rose-500"></span> منتظر بمان
          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span> کلیک کن
        </div>
      </div>
    </div>
  );
};
