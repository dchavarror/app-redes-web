import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceUtils } from './services.utils';
import { END_POINT_SERVICE } from '../../environments/enviroment.variables';
import { Promocion } from '../domain/Promocion';

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
export class PromocionService {

  /**
   * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
   * Usado para inicializar propiedades y dependencias.
   */
  constructor(private servicio: ServiceUtils) {
  }

  /**
   * Método que permite guardar un nuevo objeto de tipo (Promoción).
   */
  savePromocion(promocion: Promocion) {
    return this.servicio.post(END_POINT_SERVICE.POST_PROMOCION, promocion).pipe(map(data => data));
  }

  /**
   * Método que permite obtener un objeto de tipo (Promoción) mediante
   * el código de esta, junto con sus detalle(s)(Premio(s)).
   */
  getCodigo(codigo: string) {
    let query = codigo;
    return this.servicio.get(END_POINT_SERVICE.GET_CODIGO_PROMOCION, query).pipe(map(data => data));
  }

  /**
   * Método que permite obtener un objeto de tipo (Promoción) mediante
   * el código(atributo) de esta.
   */
  getPromocion(codigo: string) {
    let query = codigo;
    return this.servicio.get(END_POINT_SERVICE.GET_PROMOCION, query).pipe(map(data => data));
  }

  /**
   * Método que permite actualizar un objeto de tipo (Promoción).
   */
  setPromocion(codigo: number, promocion: Promocion) {
    return this.servicio.put(`${END_POINT_SERVICE.GET_CODIGO_PROMOCION}${codigo}`, promocion).pipe(map(data => data));
  }

  /**
   * Método que permite validar si el codigo(atributo) de un objeto de tipo (Promoción)
   * ya existe.
   */
  getValidarPromocion(codigo: string) {
    let query = codigo;
    return this.servicio.get(END_POINT_SERVICE.GET_VALIDAR_PROMOCION, query).pipe(map(data => data));
  }

  getPromociones(){
    return this.servicio.get(END_POINT_SERVICE.GET_ALL_PROMOCIONES, '').pipe(map(data => data));
  }
}
