import { Injectable } from "@angular/core";
import { Persona } from "./Persona";
import { Detalle } from './Detalle';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Clase de modelo que representa una Direccion.
 */


@Injectable()
export class Direccion {
    id = 0;
    persona = new Persona();
    descripcion = '';
	ciudad = '';
	adicionales = '';
    usuarioCreacion = '';
    usuarioModifica = '';
    activo = true;

}