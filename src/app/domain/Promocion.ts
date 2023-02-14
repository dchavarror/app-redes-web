import { Injectable } from "@angular/core";
import { Detalle } from './Detalle';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Clase de modelo que representa un promoción.
 */

@Injectable()
export class Promocion {
    id=0;
    codigo='';
    nombre='';
    linkPublicacion='';
    terminos='';
    lstDetalles: Array<Detalle> = new Array<Detalle>();
    usuarioCreacion='';
    activo=true;
}