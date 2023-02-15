import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Clase que contiene el método que cierra la sesion de un usuario.
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
   * Usado para inicializar propiedades y dependencias.
   */
  constructor(private router: Router) { }

  /**
   * Método que cierra la sesion de un usuario.
   */
  logout(): void {
    this.router.navigate(['/login']);
    localStorage.setItem('indLogeado', 'false');
    localStorage.setItem('usuario', '');
    localStorage.setItem('roles', '');
  }

}
