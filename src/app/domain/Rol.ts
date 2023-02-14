import { Injectable } from "@angular/core";

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Clase de modelo que representa un rol.
 */

@Injectable()
export class Rol {
    id=0;
    codigo = '';
    nombre='';
    usuarioCreacion='';
    fechaCreacion='';
    usuarioModifica='';
    fechaModifica='';
    activo=true;
}