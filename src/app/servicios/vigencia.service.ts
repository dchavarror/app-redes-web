import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceUtils } from './services.utils';
import { END_POINT_SERVICE } from '../../environments/enviroment.variables';

@Injectable({
  providedIn: 'root'
})
export class VigenciaService {
  constructor(private servicio: ServiceUtils) {
  }

  actualizarVigencia(id: number) {
    return this.servicio.put(END_POINT_SERVICE.VIGENCIA + id, '').pipe( map( data => data ));
  }
}
