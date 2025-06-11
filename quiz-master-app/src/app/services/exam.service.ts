// exam.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private exams = [
    {
      id: '1',
      title: 'Mathematics Final Exam',
      subject: 'Mathematics',
      duration: 60,
      dueDate: '2023-12-15',
      questions: [
        {
          text: 'What is the value of π (pi) to two decimal places?',
          options: ['3.14', '3.16', '3.12', '3.18'],
          correctAnswer: '3.14'
        },
        {
          text: 'Solve for x: 2x + 5 = 15',
          options: ['5', '10', '7.5', '20'],
          correctAnswer: '5'
        },
        {
          text: 'What is the area of a circle with radius 5?',
          options: ['25π', '10π', '50π', '5π'],
          correctAnswer: '25π'
        },
        {
          text: 'What is the derivative of x²?',
          options: ['2x', 'x', '2', 'x³/3'],
          correctAnswer: '2x'
        },
        {
          text: 'What is the square root of 144?',
          options: ['12', '14', '16', '18'],
          correctAnswer: '12'
        }
      ]
    },
    {
      id: '2',
      title: 'Physics Midterm Exam',
      subject: 'Physics',
      duration: 45,
      dueDate: '2023-11-20',
      questions: [
        {
          text: 'What is the unit of force in the International System of Units?',
          options: ['Newton', 'Joule', 'Watt', 'Pascal'],
          correctAnswer: 'Newton'
        },
        {
          text: 'Which law states that every action has an equal and opposite reaction?',
          options: [
            "Newton's First Law",
            "Newton's Second Law",
            "Newton's Third Law",
            "Ohm's Law"
          ],
          correctAnswer: "Newton's Third Law"
        },
        {
          text: 'What is the acceleration due to gravity on Earth?',
          options: ['9.8 m/s²', '6.7 m/s²', '10 m/s²', '8.9 m/s²'],
          correctAnswer: '9.8 m/s²'
        }
      ]
    },
    {
      id: '3',
      title: 'Chemistry Quiz',
      subject: 'Chemistry',
      duration: 30,
      dueDate: '2023-11-10',
      questions: [
        {
          text: 'What is the chemical symbol for gold?',
          options: ['Au', 'Ag', 'Pb', 'Fe'],
          correctAnswer: 'Au'
        },
        {
          text: 'What is the pH value of pure water?',
          options: ['7', '1', '14', '0'],
          correctAnswer: '7'
        },
        {
          text: 'Which gas is most abundant in Earth\'s atmosphere?',
          options: ['Nitrogen', 'Oxygen', 'Carbon Dioxide', 'Argon'],
          correctAnswer: 'Nitrogen'
        }
      ]
    }
  ];

  getExamById(id: string) {
    return this.exams.find(exam => exam.id === id);
  }

  getAllExams() {
    return this.exams;
  }
}