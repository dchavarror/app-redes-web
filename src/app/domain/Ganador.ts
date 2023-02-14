import { Injectable } from "@angular/core";
import { Persona } from "./Persona";
import { Detalle } from './Detalle';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Clase de modelo que representa un ganador.
 */


@Injectable()
export class Ganador {
    id = 0;
    persona = new Persona();
    detallePremio = new Detalle();
    aceptoTerminos = false;
    tratamientoDatos = false;
    aceptacionPremio = false;
    usuarioCreacion = '';
    activo = true;
    ganastePremioFisico = false;

}