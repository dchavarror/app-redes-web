import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceUtils } from './services.utils';
import { END_POINT_SERVICE } from '../../environments/enviroment.variables';
import { Ganador } from '../domain/Ganador';
import { Direccion } from '../domain/Direccion';

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
export class DireccionService {

  /**
   * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
   * Usado para inicializar propiedades y dependencias.
   */
  constructor(private servicio: ServiceUtils) {
  }

  /**
   * Método que permite guardar un nuevo objeto de tipo (Direccion).
   */
  guardarDireccion(direccion: Direccion) {
    return this.servicio.post(END_POINT_SERVICE.DIRECCION, direccion).pipe(map(data => data));
  }
}
