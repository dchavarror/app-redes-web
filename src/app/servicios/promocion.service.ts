import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceUtils } from './services.utils';
import { END_POINT_SERVICE } from '../../environments/enviroment.variables';
import { Promocion } from '../domain/Promocion';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {
  constructor(private servicio: ServiceUtils) {
  }

  guardarPromocion(promocion: Promocion) {
    return this.servicio.post(END_POINT_SERVICE.POST_PROMOCION, promocion).pipe(map(data => data));
  }

  getCodigo(codigo: string) {
    let query = codigo;
    return this.servicio.get(END_POINT_SERVICE.GET_CODIGO_PROMOCION, query).pipe(map(data => data));
  }

  getPromocion(codigo: string) {
    let query = codigo;
    return this.servicio.get(END_POINT_SERVICE.GET_PROMOCION, query).pipe(map(data => data));
  }

  setPromocion(codigo: number, promocion: Promocion) {
    return this.servicio.put(`${END_POINT_SERVICE.GET_CODIGO_PROMOCION}/${codigo}`, promocion).pipe(map(data => data));
  }

  getValidarPromocion(codigo: string) {
    let query = codigo;
    return this.servicio.get(END_POINT_SERVICE.GET_VALIDAR_PROMOCION, query).pipe(map(data => data));
  }

  getPromociones(){
    return this.servicio.get(END_POINT_SERVICE.GET_ALL_PROMOCIONES, '').pipe(map(data => data));
  }
}
