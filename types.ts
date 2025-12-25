
export interface FlashcardData {
  id: number;
  question: string;
  answer: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  type: 'multiple-choice' | 'true-false';
  options?: string[];
  correctAnswer: string | boolean;
  explanation: string;
}

export interface LessonSectionData {
  title: string;
  icon: string;
  content: string[];
}

export type ViewState = 'HOME' | 'CHAPTER_MENU' | 'LESSON' | 'FLASHCARDS' | 'QUIZ' | 'FUN_FACTS' | 'CHALLENGE';
