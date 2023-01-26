import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceUtils } from './services.utils';
import { END_POINT_SERVICE } from '../../environments/enviroment.variables';
import { Persona } from '../domain/Persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  constructor(private servicio: ServiceUtils) {
  }

  actualizarPersona(persona: Persona) {
    return this.servicio.put(END_POINT_SERVICE.PERSONA , persona).pipe( map( data => data ));
  }

  getPersonas(cedula: string , nombres:string) {
    let query = '?cedula=' + cedula + '&nombres=' + nombres;
    return this.servicio.get(END_POINT_SERVICE.PERSONA , query).pipe( map( data => data ));
  }
}
