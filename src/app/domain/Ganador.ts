import { Injectable } from "@angular/core";
import { Persona } from "./Persona";
import { Detalle } from './Detalle';

@Injectable()
export class Ganador {
    id=0;
    persona = new Persona();
    detallePremio = new Detalle();
    aceptoTerminos = null;
    tratamientoDatos = null;
    aceptacionPremio = null;
    usuarioCreacion = '';
    activo = false;

}