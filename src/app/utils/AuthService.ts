import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router: Router) { }

  logout(): void {
    this.router.navigate(['/login']);
    localStorage.setItem('indLogeado', 'false');
    localStorage.setItem('usuario', '');
  }

}
