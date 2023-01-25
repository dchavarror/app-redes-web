import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceUtils } from './services.utils';
import { Usuario } from '../domain/Usuario';
import { END_POINT_SERVICE } from '../../environments/enviroment.variables';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {
  constructor(private servicio: ServiceUtils) {
  }

  getDetallePremio(codigoPromocional: string) {
    return this.servicio.get(END_POINT_SERVICE.DETALLE_PREMIO , codigoPromocional).pipe( map( data => data ));
  }
}
