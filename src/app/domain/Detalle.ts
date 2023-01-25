import { Injectable } from "@angular/core";
import { Premio } from './Premio';
import { Persona } from './Persona';

@Injectable()
export class Detalle {
    id =0;
    red ='';
    premio = new Premio();
    link = '';
    persona = new Persona();
    codigoPromocional = '';
    usuarioCreacion = '';
    activo = false;
}