import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceUtils } from './services.utils';
import { END_POINT_SERVICE } from '../../environments/enviroment.variables';
import { Premio } from '../domain/Premio';

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
export class PremioService {

  /**
   * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
   * Usado para inicializar propiedades y dependencias.
   */
  constructor(private servicio: ServiceUtils) {
  }

  /**
   * Método que permite obtener el listado de objetos de tipo (Premio).
   */
  getPremio() {
    return this.servicio.get(END_POINT_SERVICE.GET_PREMIO, '').pipe(map(data => data));
  }

  /**
   * Método que permite guardar un nuevo objeto de tipo (Premio).
   */
  savePremio(premio: Premio){
    return this.servicio.post(END_POINT_SERVICE.POST_PREMIO_UNITO, premio).pipe(map(data => data));
  }

  /**
   * Método que permite actualizar un objeto de tipo (Premio).
   */
  putPremio(id:number){
    return this.servicio.put(`${END_POINT_SERVICE.PUT_PREMIO_ELIMINAR}${id}`).pipe(map(data => data));
  }
}
