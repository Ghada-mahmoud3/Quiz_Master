export interface Exam {
  id: string;
  'exam-name': string;
  category: string;
  time: number;
  dueDate: string;
  'questions-number': number;
  'attempt-number': number;
  'pass-mark': number;
  description: string;
  teacherId: string;
  questions: Question[];
}

export interface Question {
  'q-name': string;
  'q-number': number;
  points: number;
  options: string[];
  'correct-answer': string;
}

export interface MappedExam {
  id: string;
  title: string;
  subject: string;
  duration: number;
  dueDate: string;
  questionsNumber: number;
  attemptNumber: number;
  passMark: number;
  description: string;
  teacherId: string;
  questions: MappedQuestion[];
}

export interface MappedQuestion {
  text: string;
  number: number;
  points: number;
  options: string[];
  correctAnswer: string;
}