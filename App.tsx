
import React, { useState } from 'react';
import { ProgressBar } from './components/ProgressBar';
import { LESSON_DATA, FLASHCARDS } from './constants';
import { Flashcard } from './components/Flashcard';
import { Quiz } from './components/Quiz';
import { ReflexGame } from './components/ReflexGame';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');

  const renderHome = () => (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">کتابخانه دیجیتال علوم هشتم</h1>
        <p className="text-gray-600">یک فصل را برای شروع یادگیری انتخاب کن</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <button 
          onClick={() => setCurrentView('CHAPTER_MENU')}
          className="bg-white p-8 rounded-[2rem] shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 text-right border-2 border-transparent hover:border-blue-400 group"
        >
          <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🧠</div>
          <div className="text-blue-600 font-bold text-sm mb-2">فصل چهارم</div>
          <h2 className="text-2xl font-bold text-gray-800">تنظیم عصبی</h2>
          <p className="text-gray-500 mt-4 text-sm leading-relaxed">یادگیری درباره مغز، نخاع، نورون‌ها و واکنش‌های انعکاسی بدن.</p>
          <div className="mt-6 flex items-center text-blue-500 font-bold">
            <span>شروع فصل</span>
            <span className="mr-2">←</span>
          </div>
        </button>

        {[5, 6, 7].map(num => (
          <div key={num} className="bg-gray-100 p-8 rounded-[2rem] border-2 border-dashed border-gray-300 opacity-60 grayscale cursor-not-allowed">
            <div className="text-5xl mb-6">🔒</div>
            <div className="text-gray-400 font-bold text-sm mb-2">فصل {num}</div>
            <h2 className="text-2xl font-bold text-gray-400 italic">بزودی...</h2>
          </div>
        ))}
      </div>
    </div>
  );

  const renderChapterMenu = () => (
    <div className="animate-in slide-in-from-bottom-10 duration-500">
      <button 
        onClick={() => setCurrentView('HOME')}
        className="mb-8 flex items-center text-gray-500 hover:text-blue-600 transition-colors font-bold"
      >
        <span className="ml-2">→</span> بازگشت به فهرست فصل‌ها
      </button>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">فصل ۴: تنظیم عصبی</h1>
        <p className="text-gray-600 mt-2">چه بخشی را می‌خواهی تمرین کنی؟</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MenuButton icon="📘" title="درسنامه کامل" desc="آموزش مفصل تمام نکات فصل" color="blue" onClick={() => setCurrentView('LESSON')} />
        <MenuButton icon="🗂️" title="فلش‌کارت‌ها" desc="مرور سریع با ۱۲ کارت تعاملی" color="indigo" onClick={() => setCurrentView('FLASHCARDS')} />
        <MenuButton icon="📝" title="آزمون آنلاین" desc="سنجش یادگیری با ۶ سوال مفهومی" color="green" onClick={() => setCurrentView('QUIZ')} />
        <MenuButton icon="⚡" title="چالش سرعت واکنش" desc="بازی عملی نورون‌های حسی-حرکتی" color="purple" onClick={() => setCurrentView('CHALLENGE')} />
        <MenuButton icon="💡" title="دانستنی‌های جذاب" desc="نکات شگفت‌انگیز علمی" color="orange" onClick={() => setCurrentView('FUN_FACTS')} />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'LESSON':
        return (
          <div className="animate-in fade-in duration-500">
             <BackButton onClick={() => setCurrentView('CHAPTER_MENU')} />
             <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
               <span>📘</span> درسنامه جامع و مفهومی
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LESSON_DATA.map((section, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-4">{section.icon}</div>
                    <h3 className="text-xl font-bold mb-4 text-blue-700 border-b pb-2">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.content.map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed group">
                          <span className="text-blue-400 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
          </div>
        );
      case 'CHALLENGE':
        return (
          <div className="animate-in fade-in duration-500">
            <BackButton onClick={() => setCurrentView('CHAPTER_MENU')} />
            <ReflexGame />
          </div>
        );
      case 'FLASHCARDS':
        return (
          <div className="animate-in fade-in duration-500">
            <BackButton onClick={() => setCurrentView('CHAPTER_MENU')} />
            <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
               <span>🗂️</span> فلش‌کارت‌های مرور
             </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {FLASHCARDS.map(card => (
                <Flashcard key={card.id} data={card} />
              ))}
            </div>
          </div>
        );
      case 'QUIZ':
        return (
          <div className="animate-in fade-in duration-500">
            <BackButton onClick={() => setCurrentView('CHAPTER_MENU')} />
            <Quiz />
          </div>
        );
      case 'FUN_FACTS':
        return (
          <div className="animate-in fade-in duration-500">
            <BackButton onClick={() => setCurrentView('CHAPTER_MENU')} />
            <section className="bg-gradient-to-br from-yellow-100 to-orange-100 p-10 rounded-[2.5rem] border-2 border-dashed border-orange-300">
              <h2 className="text-3xl font-bold text-orange-800 mb-8 flex items-center gap-3">
                <span>💡</span> آیا می‌دانستید؟
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm italic leading-loose text-lg text-gray-700 border-r-4 border-orange-400">
                  "سرعت پیام عصبی در بدن انسان می‌تواند به بیش از <strong>۱۰۰ متر بر ثانیه</strong> برسد! این یعنی سریع‌تر از یک ماشین مسابقه‌ای."
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm italic leading-loose text-lg text-gray-700 border-r-4 border-orange-400">
                  "مغز انسان حدود <strong>۸۶ میلیارد</strong> نورون دارد. اگر بخواهیم آن‌ها را بشماریم، قرن‌ها طول می‌کشد!"
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm italic leading-loose text-lg text-gray-700 border-r-4 border-orange-400">
                   "در هر ثانیه، حدود <strong>۱۰۰ هزار</strong> واکنش شیمیایی در مغز شما رخ می‌دهد!"
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm italic leading-loose text-lg text-gray-700 border-r-4 border-orange-400">
                   "وزن مغز یک انسان بالغ حدود ۱.۵ کیلوگرم است، اما <strong>۲۰ درصد</strong> انرژی کل بدن را مصرف می‌کند."
                </div>
              </div>
            </section>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-[#f8fafc]">
      <ProgressBar />
      <div className="h-20" /> 
      <main className="max-w-6xl mx-auto px-6">
        {currentView === 'HOME' && renderHome()}
        {currentView === 'CHAPTER_MENU' && renderChapterMenu()}
        {currentView !== 'HOME' && currentView !== 'CHAPTER_MENU' && renderContent()}
      </main>
      {currentView === 'HOME' && (
        <footer className="mt-20 text-center text-gray-400 text-sm">
          <p>طراحی شده برای آموزش هوشمند علوم تجربی</p>
        </footer>
      )}
    </div>
  );
};

const MenuButton = ({ icon, title, desc, color, onClick }: any) => {
    const colors: any = {
        blue: "hover:border-blue-500 text-blue-600 bg-blue-50",
        indigo: "hover:border-indigo-500 text-indigo-600 bg-indigo-50",
        green: "hover:border-green-500 text-green-600 bg-green-50",
        orange: "hover:border-orange-500 text-orange-600 bg-orange-50",
        purple: "hover:border-purple-500 text-purple-600 bg-purple-50"
    };
    return (
        <button 
            onClick={onClick}
            className={`p-6 rounded-[2rem] border-2 border-transparent bg-white shadow-md hover:shadow-xl transition-all text-right group ${colors[color]}`}
        >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
            <p className="text-gray-500 text-sm">{desc}</p>
        </button>
    );
};

const BackButton = ({ onClick }: { onClick: () => void }) => (
    <button 
        onClick={onClick}
        className="mb-8 flex items-center text-gray-500 hover:text-blue-600 transition-colors font-bold group"
    >
        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span> بازگشت به منوی فصل
    </button>
);

export default App;
