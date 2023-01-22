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
    return this.servicio.post(END_POINT_SERVICE.POST_PROMOCION , promocion).pipe( map( data => data ));
  }
}
