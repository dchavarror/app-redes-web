import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './AuthService';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Clase que contiene los métodos que validan a que vistas (componentes) tiene
 * acceso un usuario.
 */

@Injectable()
export class AutenticacionSave implements CanActivate {

    /**
   * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
   * Usado para inicializar propiedades y dependencias.
   */
    constructor(private router: Router, private autenticacionService: AuthService) { }

    /**
     * Método que verifica que rutas (vistas) estaran activas para el usuario logueado.
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.verifyLogin(url);
    }

    /**
     * Método que verifica si el usuario se logueo correctamente.
     */
    verifyLogin(url: string): boolean {
        if (!this.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        } else if (this.isLoggedIn()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Método que verifica si un usuario inicio sesion en la app.
     */
    public isLoggedIn(): boolean {
        let status = false;
        if (this.autenticacionService.isAutenticado()) {
            status = true;
        } else {
            status = false;
        }
        return status;
    }
}