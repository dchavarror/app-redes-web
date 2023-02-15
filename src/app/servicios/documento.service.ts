import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceUtils } from './services.utils';
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
export class DocumentoService {

  /**
   * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
   * Usado para inicializar propiedades y dependencias.
   */
  constructor(private servicio: ServiceUtils) {
  }

  /**
   * Método que permite consultar el documento (xlsx) de una promoción.
   */
  getDocumento(codigoPromocional: string) {
    let query = codigoPromocional;
    return this.servicio.get(END_POINT_SERVICE.PROMOCION_DOCUMENTO , query).pipe( map( data => data ));
  }
}
