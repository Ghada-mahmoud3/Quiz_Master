import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Get all exams
  getExams(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/exams`);
  }

  // Get exam by ID
  getExam(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/exams/${id}`);
  }

  // Create a new exam
  createExam(exam: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/exams`, exam);
  }

  // Update an exam
  updateExam(id: string, exam: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/exams/${id}`, exam);
  }

  // Delete an exam
  deleteExam(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/exams}/${id}`);
  }

  // Get student data by email
  getStudent(email: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/students?email=${email}`);
  }

  // Update student exam results
  updateStudentResults(studentId: string, results: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/students/${studentId}`, results);
  }
}