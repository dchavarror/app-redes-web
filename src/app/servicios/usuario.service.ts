import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceUtils } from './services.utils';
import { Usuario } from '../domain/Usuario';
import { END_POINT_SERVICE } from '../../environments/enviroment.variables';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Clase que contiene los métodos que permiten trabajar con los tipos de verbos http,
 * para de esta manera definir la operacion que se esta realizando.
 */

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  /**
   * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
   * Usado para inicializar propiedades y dependencias.
   */
  constructor(private servicio: ServiceUtils) {
  }

  /**
   * Método que permite validar el objeto de tipo (Usuario) que se encuentra activo en la aplicación.
   */
  validarUsuario(usuario: Usuario) {
    return this.servicio.postAutenticacion(END_POINT_SERVICE.USUARIO_VALIDAR, usuario).pipe(map(data => data));
  }
}
