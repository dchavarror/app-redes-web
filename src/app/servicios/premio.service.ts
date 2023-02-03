import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceUtils } from './services.utils';
import { Usuario } from '../domain/Usuario';
import { END_POINT_SERVICE } from '../../environments/enviroment.variables';
import { Detalle } from '../domain/Detalle';
import { Premio } from '../domain/Premio';

@Injectable({
  providedIn: 'root'
})
export class PremioService {
  constructor(private servicio: ServiceUtils) {
  }

  getPremio() {
    return this.servicio.get(END_POINT_SERVICE.GET_PREMIO, '').pipe(map(data => data));
  }

  savePremio(premio: Premio){
    return this.servicio.post(END_POINT_SERVICE.POST_PREMIO_UNITO, premio).pipe(map(data => data));
  }

  putPremio(id:number){
    return this.servicio.put(`${END_POINT_SERVICE.PUT_PREMIO_ELIMINAR}${id}`).pipe(map(data => data));
  }
}
