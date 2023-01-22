import { Injectable } from "@angular/core";
import { Detalle } from './Detalle';

@Injectable()
export class Promocion {
    codigo='';
    nombre='';
    linkPublicacion='';
    terminos='';
    lstDetalles: Array<Detalle> = new Array<Detalle>();
    usuarioCreacion='';
    activo=false;
}