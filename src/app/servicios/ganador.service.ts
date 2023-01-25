import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceUtils } from './services.utils';
import { END_POINT_SERVICE } from '../../environments/enviroment.variables';
import { Persona } from '../domain/Persona';
import { Ganador } from '../domain/Ganador';

@Injectable({
  providedIn: 'root'
})
export class GanadorService {
  constructor(private servicio: ServiceUtils) {
  }

  guardarGanador(ganador: Ganador) {
    return this.servicio.post(END_POINT_SERVICE.GANADOR , ganador).pipe( map( data => data ));
  }

  getGanadores(cedula: string , nombres:string) {
    let query = '?cedula=' + cedula + '&nombres=' + nombres;
    return this.servicio.get(END_POINT_SERVICE.GANADOR , query).pipe( map( data => data ));
  }
}
