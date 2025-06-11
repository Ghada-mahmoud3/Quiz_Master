import { Routes } from '@angular/router';
import { LogInComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { StudentDashboardComponent } from './pages/student/student-dashboard/student-dashboard.component';
import { ShowResultComponent } from './pages/student/show-result/show-result.component';
import { ExamAttemptComponent } from './pages/student/exam-attempt/exam-attempt.component';
import { ResultListComponent } from './pages/student/result-list/result-list.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminExamListComponent } from './pages/admin/admin-exam-list/admin-exam-list.component';
import { StudentExamListComponent } from './pages/student/student-exam-list/student-exam-list.component';
import { CreateExamComponent } from './pages/admin/create-exam/create-exam.component';
import { StudentResultsComponent } from './pages/admin/student-results/student-results.component';
import { ManageQuestionsComponent } from './pages/admin/manage-questions/manage-questions.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LogInComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  // Student routes
  {
    path: 'student',
    canActivate: [AuthGuard],
    data: { requiredRole: 'student' }, // role requirement
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: StudentDashboardComponent },
      { path: 'exams', component: StudentExamListComponent },
      { path: 'exam/:id', component: ExamAttemptComponent },
      { path: 'results', component: ResultListComponent },
      { path: 'result/:id', component: ShowResultComponent },
    ]
  },
  // Admin routes
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { requiredRole: 'teacher' }, // role requirement
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'exams', component: AdminExamListComponent },
      { path: 'exams/new', component: CreateExamComponent },
      { path: 'exams/:id/edit', component: ManageQuestionsComponent },
      { path: 'student-results', component: StudentResultsComponent }
    ]
  },
  // Public error pages
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];