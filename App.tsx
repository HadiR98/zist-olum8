
import React, { useState } from 'react';
import { ProgressBar } from './components/ProgressBar';
import { CHAPTERS } from './constants';
import { Flashcard } from './components/Flashcard';
import { Quiz } from './components/Quiz';
import { ReflexGame } from './components/ReflexGame';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);

  const selectedChapter = selectedChapterId ? CHAPTERS[selectedChapterId] : null;

  const handleChapterSelect = (id: number) => {
    setSelectedChapterId(id);
    setCurrentView('CHAPTER_MENU');
    window.scrollTo(0, 0);
  };

  const renderHome = () => (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">کتابخانه هوشمند علوم تجربی</h1>
        <p className="text-gray-500 text-lg">آموزش تعاملی و جذاب برای دانش‌آموزان پایه هشتم</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.values(CHAPTERS).map((ch) => (
          <button 
            key={ch.id}
            onClick={() => handleChapterSelect(ch.id)}
            className="bg-white p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 text-right border-2 border-transparent group relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-3 h-full ${ch.id === 4 ? 'bg-blue-500' : 'bg-teal-500'}`}></div>
            <div className="flex justify-between items-start mb-6">
               <div className="text-7xl group-hover:scale-110 transition-transform duration-500">{ch.icon}</div>
               <div className={`px-4 py-1 rounded-full text-xs font-black ${ch.id === 4 ? 'bg-blue-100 text-blue-600' : 'bg-teal-100 text-teal-600'}`}>فصل {ch.id}</div>
            </div>
            <h2 className="text-3xl font-black text-gray-800 mb-4">{ch.title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">{ch.description}</p>
            <div className={`flex items-center ${ch.id === 4 ? 'text-blue-600' : 'text-teal-600'} font-black text-lg`}>
              <span>بزن بریم یاد بگیریم!</span>
              <span className="mr-3 transition-transform group-hover:translate-x-[-8px]">←</span>
            </div>
          </button>
        ))}

        {[6, 7].map(num => (
          <div key={num} className="bg-gray-100/50 p-10 rounded-[3rem] border-4 border-dashed border-gray-200 opacity-60 flex flex-col items-center justify-center text-center">
            <div className="text-5xl mb-4 grayscale">🔒</div>
            <h2 className="text-xl font-bold text-gray-400">فصل {num}: بزودی...</h2>
          </div>
        ))}
      </div>
    </div>
  );

  const renderChapterMenu = () => {
    if (!selectedChapter) return null;
    return (
      <div className="animate-in slide-in-from-bottom-10 duration-500">
        <button 
          onClick={() => setCurrentView('HOME')}
          className="mb-10 flex items-center text-gray-500 hover:text-blue-600 transition-colors font-bold group"
        >
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span> بازگشت به فهرست اصلی
        </button>
        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-xl border border-gray-100 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12 text-center md:text-right">
            <div className="text-8xl bg-gray-50 p-8 rounded-[2.5rem] shadow-inner">{selectedChapter.icon}</div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-3">فصل {selectedChapter.id}: {selectedChapter.title}</h1>
              <p className="text-gray-500 text-lg max-w-xl">{selectedChapter.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <MenuButton icon="📘" title="درسنامه کامل" desc="آموزش عمیق و مفهومی فصل" color="blue" onClick={() => setCurrentView('LESSON')} />
            <MenuButton icon="🗂️" title="فلش‌کارت‌ها" desc={`${selectedChapter.flashcards.length} کارت مرور سریع`} color="indigo" onClick={() => setCurrentView('FLASHCARDS')} />
            <MenuButton icon="📝" title="آزمون آنلاین" desc={`${selectedChapter.quiz.length} سوال تستی و مفهومی`} color="green" onClick={() => setCurrentView('QUIZ')} />
            <MenuButton icon="⚡" title="چالش عملی" desc={selectedChapter.id === 4 ? "تست واکنش عصبی" : "هماهنگی عصب و عضله"} color="purple" onClick={() => setCurrentView('CHALLENGE')} />
            <MenuButton icon="💡" title="دانستنی‌ها" desc="شگفتی‌های علمی این فصل" color="orange" onClick={() => setCurrentView('FUN_FACTS')} />
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (!selectedChapter) return null;
    
    switch (currentView) {
      case 'LESSON':
        return (
          <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
             <BackButton onClick={() => setCurrentView('CHAPTER_MENU')} />
             <div className="flex items-center gap-4 mb-10">
               <div className="text-5xl">📘</div>
               <h2 className="text-4xl font-black text-gray-900">درسنامه جامع {selectedChapter.title}</h2>
             </div>
             <div className="grid grid-cols-1 gap-12">
                {selectedChapter.lessons.map((section, idx) => (
                  <div key={idx} className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-lg border border-gray-100 relative group overflow-hidden">
                    <div className={`absolute top-0 right-0 w-2 h-full ${selectedChapterId === 4 ? 'bg-blue-500' : 'bg-teal-500'} group-hover:w-3 transition-all`}></div>
                    <div className="flex items-center gap-6 mb-10 pb-6 border-b border-gray-100">
                      <div className="text-6xl bg-gray-50 p-4 rounded-3xl shadow-inner">{section.icon}</div>
                      <h3 className={`text-2xl md:text-3xl font-black ${selectedChapterId === 4 ? 'text-blue-900' : 'text-teal-900'}`}>{section.title}</h3>
                    </div>
                    <div className="space-y-8">
                      {section.content.map((item, i) => (
                        <div key={i} className="flex gap-6 items-start text-gray-700 leading-loose text-xl">
                          <span className={`w-3 h-3 rounded-full mt-4 shrink-0 ${selectedChapterId === 4 ? 'bg-blue-400' : 'bg-teal-400'}`}></span>
                          <p className="font-medium text-justify">{item}</p>
                        </div>
                      ))}
                    </div>
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
            <h2 className="text-4xl font-black mb-10 text-gray-900 flex items-center gap-4">
               <span>🗂️</span> فلش‌کارت‌های طلایی مرور
             </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedChapter.flashcards.map(card => (
                <Flashcard key={card.id} data={card} />
              ))}
            </div>
          </div>
        );
      case 'QUIZ':
        return (
          <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
            <BackButton onClick={() => setCurrentView('CHAPTER_MENU')} />
            <div className="text-center mb-10">
                <h2 className="text-4xl font-black text-gray-900 flex items-center justify-center gap-4">
                   <span>📝</span> آزمون سنجش یادگیری
                 </h2>
                 <p className="text-gray-500 mt-2 italic">خودتو با ۱۰ سوال مفهومی به چالش بکش!</p>
            </div>
            <Quiz questions={selectedChapter.quiz} />
          </div>
        );
      case 'FUN_FACTS':
        return (
          <div className="animate-in fade-in duration-500">
            <BackButton onClick={() => setCurrentView('CHAPTER_MENU')} />
            <section className="bg-gradient-to-br from-amber-50 to-orange-100 p-12 rounded-[4rem] border-2 border-dashed border-orange-200 shadow-inner">
              <h2 className="text-4xl font-black text-orange-900 mb-10 flex items-center gap-4">
                <span>💡</span> آیا می‌دانستید؟
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {selectedChapter.funFacts.map((fact, idx) => (
                  <div key={idx} className="bg-white/90 backdrop-blur-sm p-10 rounded-[3rem] shadow-sm italic leading-relaxed text-xl text-gray-800 border-r-8 border-orange-500 transform hover:scale-[1.02] transition-transform">
                    "{fact}"
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen pb-32 bg-[#f8fafc] selection:bg-blue-100 selection:text-blue-900">
      <ProgressBar />
      <div className="h-20" /> 
      <main className="max-w-6xl mx-auto px-6">
        {currentView === 'HOME' && renderHome()}
        {currentView === 'CHAPTER_MENU' && renderChapterMenu()}
        {currentView !== 'HOME' && currentView !== 'CHAPTER_MENU' && renderContent()}
      </main>
      
      {currentView === 'HOME' && (
        <footer className="mt-32 text-center">
           <div className="inline-block p-1 bg-white rounded-full shadow-sm mb-4">
              <div className="px-6 py-2 bg-gray-50 rounded-full text-gray-400 text-xs font-bold uppercase tracking-widest">Digital Science Library v3.0</div>
           </div>
           <p className="text-gray-400 text-sm font-medium">پلتفرم آموزش تعاملی علوم هشتم - محتوای جامع و هوشمند</p>
        </footer>
      )}
    </div>
  );
};

const MenuButton = ({ icon, title, desc, color, onClick }: any) => {
    const colors: any = {
        blue: "hover:border-blue-500 text-blue-700 bg-blue-50/30",
        indigo: "hover:border-indigo-500 text-indigo-700 bg-indigo-50/30",
        green: "hover:border-green-500 text-green-700 bg-green-50/30",
        orange: "hover:border-orange-500 text-orange-700 bg-orange-50/30",
        purple: "hover:border-purple-500 text-purple-700 bg-purple-50/30"
    };
    return (
        <button 
            onClick={onClick}
            className={`p-10 rounded-[3rem] border-2 border-transparent bg-white shadow-md hover:shadow-2xl transition-all text-right group ${colors[color]}`}
        >
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">{desc}</p>
        </button>
    );
};

const BackButton = ({ onClick }: { onClick: () => void }) => (
    <button 
        onClick={onClick}
        className="mb-10 flex items-center text-gray-500 hover:text-blue-600 transition-all font-bold group bg-white px-8 py-3 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md"
    >
        <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span> بازگشت به منوی اصلی فصل
    </button>
);

export default App;
