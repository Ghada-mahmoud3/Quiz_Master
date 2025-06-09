import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    let role = localStorage.getItem('role');
    const requiredRole = route.data['requiredRole'];

    // If no token, redirect to login
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // If route requires specific role and user doesn't have it
    if (requiredRole && role !== requiredRole) {
      alert('not auth') 
      if (role === 'teacher') {
        role = 'admin'
      }
      this.router.navigate([`/${role}/dashboard`]);
      return false;
    }

    return true;
  }
}
