import { Injectable } from "@angular/core";
import { Premio } from './Premio';
import { Persona } from './Persona';
import { Promocion } from "./Promocion";
import { Vigencia } from './Vigencia';

@Injectable()
export class Detalle {
    id =0;
    red ='';
    premio = new Premio();
    link = '';
    promocion = new Promocion();
    persona = new Persona();
    vigencia =new Vigencia();
    codigoPromocional = '';
    usuarioCreacion = '';
    activo = true;
}