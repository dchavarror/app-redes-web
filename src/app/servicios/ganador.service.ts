import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceUtils } from './services.utils';
import { END_POINT_SERVICE } from '../../environments/enviroment.variables';
import { Ganador } from '../domain/Ganador';

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
export class GanadorService {

  /**
   * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
   * Usado para inicializar propiedades y dependencias.
   */
  constructor(private servicio: ServiceUtils) {
  }

  /**
   * Método que permite guardar un nuevo objeto de tipo (Ganador).
   */
  guardarGanador(ganador: Ganador) {
    return this.servicio.post(END_POINT_SERVICE.GANADOR, ganador).pipe(map(data => data));
  }

  /**
   * Método que permite obtener los objetos de tipo (Ganador).
   */
  getGanadores(idPersona: number) {
    let query = '?idPersona=' + idPersona;
    return this.servicio.get(END_POINT_SERVICE.GANADOR, query).pipe(map(data => data));
  }

  /**
   * Método permite validar si el detalle(objeto) esta activo y asociado a un(a) ganador(promoción).
   */
  getValidarDetalleGanador(id: number) {
    return this.servicio.get(`${END_POINT_SERVICE.GANADOR_DETALLE}${id}`, '').pipe(map(data => data));
  }
}
