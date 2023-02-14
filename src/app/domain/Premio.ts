import { Injectable } from "@angular/core";

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Clase de modelo que representa un premio.
 */

@Injectable()
export class Premio {
    id=0;
    codigo = '';
    descripcion='';
    usuarioCreacion='';
    fechaCreacion='';
    usuarioModifica='';
    fechaModifica='';
    activo=true;
}