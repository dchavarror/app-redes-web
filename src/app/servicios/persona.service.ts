import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceUtils } from './services.utils';
import { END_POINT_SERVICE } from '../../environments/enviroment.variables';
import { Persona } from '../domain/Persona';

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
export class PersonaService {

  /**
   * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
   * Usado para inicializar propiedades y dependencias.
   */
  constructor(private servicio: ServiceUtils) {
  }

  /**
   * Método que permite actualizar a un objeto de tipo (Persona).
   */
  actualizarPersona(persona: Persona) {
    return this.servicio.put(END_POINT_SERVICE.PERSONA , persona).pipe( map( data => data ));
  }

  /**
   * Método que permite obtener objetos de tipo (Persona(s)) asociadas a un filtro,
   * ya sea por el nombre(atributo) o la cedula(atributo).
   */
  getPersonas(cedula: string , nombres:string) {
    let pCedula = cedula != null ? cedula:"" ;
    let pNombres = nombres != null ? nombres:"" ;
    let query = '?cedula=' +pCedula + '&nombres=' + pNombres;
    return this.servicio.get(END_POINT_SERVICE.PERSONA , query).pipe( map( data => data ));
  }
}
