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
    return this.servicio.post(END_POINT_SERVICE.GANADOR, ganador).pipe(map(data => data));
  }

  getGanadores(idPersona: number) {
    let query = '?idPersona=' + idPersona;
    return this.servicio.get(END_POINT_SERVICE.GANADOR, query).pipe(map(data => data));
  }

  getValidarDetalleGanador(id: number) {
    return this.servicio.get(`${END_POINT_SERVICE.GANADOR_DETALLE}${id}`, '').pipe(map(data => data));
  }
}
