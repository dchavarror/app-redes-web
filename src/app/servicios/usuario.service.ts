import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceUtils } from './services.utils';
import { Usuario } from '../domain/Usuario';
import { END_POINT_SERVICE } from '../../environments/enviroment.variables';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private servicio: ServiceUtils) {
  }

  validarUsuario(usuario: Usuario) {
    return this.servicio.post(END_POINT_SERVICE.USUARIO_VALIDAR , usuario).pipe( map( data => data ));
  }
}
