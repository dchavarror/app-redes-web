import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceUtils } from './services.utils';
import { Usuario } from '../domain/Usuario';
import { END_POINT_SERVICE } from '../../environments/enviroment.variables';

@Injectable({
  providedIn: 'root'
})
export class PremioService {
  constructor(private servicio: ServiceUtils) {
  }

  getPremio() {
    return this.servicio.get(END_POINT_SERVICE.GET_PREMIO , '').pipe( map( data => data ));
  }
}
