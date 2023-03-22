import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { DATOS_TOKEN } from '../../environments/enviroment.variables';

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


  getDataToken(token: string): any {
    if (token != null) {
      return jwt_decode(token);
    }
    return null;
  }

  asignarDatosStorage(token: string, usuario: string){
    sessionStorage.setItem(DATOS_TOKEN.APP_TOKEN  ,token);
    sessionStorage.setItem(DATOS_TOKEN.APP_USUARIO, usuario);
  }

  isAutenticado():boolean{
    if(this.validateDataToken()){
      return true;
    }else{
      this.logout();
      return false;
    }
    
  }

  validateDataToken():boolean{
    let token = sessionStorage.getItem(DATOS_TOKEN.APP_TOKEN);
    if(token != undefined && token !=''){
      const tokenInfo = this.getDataToken(String(token));
      const fechaAuth = tokenInfo.exp;
      const datePru = new Date(0);
      let dateExpToken = datePru.setUTCSeconds(fechaAuth);
      if(new Date().valueOf() > dateExpToken.valueOf()){
        return false;
      }
      return true;
    }else{
      return false;
    }
    
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
