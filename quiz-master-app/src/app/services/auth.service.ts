import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.http.get<any[]>(`${this.apiUrl}/users?email=${email}&password=${password}`)
  }

  signup(email: string, password: string, name: string, role: string): Observable<{ token: string, role: string, email: string }> {
    return this.http.get<any[]>(`${this.apiUrl}/users?email=${email}`).pipe(
      mergeMap(existingUsers => {
        if (existingUsers.length > 0) {
          throw new Error('Email already exists');
        }

        const token = `${role}-token-${Math.random().toString(36).substr(2, 9)}`;
        const newUser = { name, email, password, role, token };

        return this.http.post<any>(`${this.apiUrl}/users`, newUser).pipe(
          map(createdUser => ({
            token: createdUser.token,
            role: createdUser.role,
            email: createdUser.email
          }))
        );
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }
}
