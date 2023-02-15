import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceUtils } from './services.utils';
import { END_POINT_SERVICE } from '../../environments/enviroment.variables';
import { Detalle } from '../domain/Detalle';

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
export class DetalleService {

  /**
   * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
   * Usado para inicializar propiedades y dependencias.
   */
  constructor(private servicio: ServiceUtils) {
  }

  /**
   * Método que permite que permite consultar el(los) detalles(premios) mediante el codigo
   * promocional asociado.
   */
  getDetallePremio(codigoPromocional: string) {
    return this.servicio.get(END_POINT_SERVICE.DETALLE_PREMIO, codigoPromocional).pipe(map(data => data));
  }

  /**
   * Método que permite agregar un nuevo detalle (premio).
   */
  postDetallePremio(detallePremio: Detalle) {
    return this.servicio.post(END_POINT_SERVICE.DETALLE_PREMIO_GUARDAR, detallePremio).pipe(map(data => data));
  }

  /**
   * Método que permite modificar un detalle (premio).
   */
  setDetallePremio(id: number) {
    return this.servicio.put(`${END_POINT_SERVICE.DETALLE_PREMIO}${id}`).pipe(map(data => data));
  }

  /**
   * Método que permite obtener un nuevo detalle (premio) mediante el id(atributo), este obtiene aquellos premios que estan
   * asociados a algun registro (promocion).
   */
  getPremioActivo(id: number) {
    return this.servicio.get(`${END_POINT_SERVICE.DETALLE_PREMIO_ACTIVO}${id}`, '').pipe(map(data => data));
  }
}
