import { Routes } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
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

export const routes: Routes = [
    {
        path: 'log-in',
        component: LogInComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'student',
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: StudentDashboardComponent },
            { path: 'exams', component: StudentExamListComponent }, // exam list
            { path: 'exam/:id', component: ExamAttemptComponent },
            { path: 'results', component: ResultListComponent },
            { path: 'result/:id', component: ShowResultComponent }, // exam result
        ]
    },
    {
        path: 'admin',
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: AdminDashboardComponent },
            { path: 'exams', component: AdminExamListComponent },
            { path: 'exams/new', component: CreateExamComponent }, // new exam
            { path: 'exams/:id/edit', component: ManageQuestionsComponent }, // edit questions
            { path: 'student-results', component: StudentResultsComponent }
        ]
    },
    { path: '**', component:  NotFoundComponent}
];
