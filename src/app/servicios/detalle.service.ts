import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceUtils } from './services.utils';
import { Usuario } from '../domain/Usuario';
import { END_POINT_SERVICE } from '../../environments/enviroment.variables';
import { Detalle } from '../domain/Detalle';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {
  constructor(private servicio: ServiceUtils) {
  }

  getDetallePremio(codigoPromocional: string) {
    return this.servicio.get(END_POINT_SERVICE.DETALLE_PREMIO, codigoPromocional).pipe(map(data => data));
  }

  postDetallePremio(detallePremio: Detalle) {
    return this.servicio.post(END_POINT_SERVICE.DETALLE_PREMIO_GUARDAR, detallePremio).pipe(map(data => data));
  }

  setDetallePremio(id: number) {
    return this.servicio.put(`${END_POINT_SERVICE.DETALLE_PREMIO}${id}`).pipe(map(data => data));
  }

  getPremioActivo(id: number) {
    return this.servicio.get(`${END_POINT_SERVICE.DETALLE_PREMIO_ACTIVO}${id}`, '').pipe(map(data => data));
  }
}
