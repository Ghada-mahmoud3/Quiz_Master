import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
  if (localStorage.getItem('token')) {
    let role = localStorage.getItem('role');

    if(role === 'teacher'){
      role = 'admin'
    }
    this.router.navigate([`/${role}/dashboard`]);
    return false;
  }
  return true;
}
};
