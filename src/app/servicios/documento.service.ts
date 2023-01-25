import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceUtils } from './services.utils';
import { END_POINT_SERVICE } from '../../environments/enviroment.variables';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  constructor(private servicio: ServiceUtils) {
  }

  getDocumento(codigoPromocional: string) {
    let query = codigoPromocional;
    return this.servicio.get(END_POINT_SERVICE.PROMOCION_DOCUMENTO , query).pipe( map( data => data ));
  }
}
