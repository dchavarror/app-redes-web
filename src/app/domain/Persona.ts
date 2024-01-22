import { Injectable } from "@angular/core";

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Clase de modelo que representa un persona.
 */

@Injectable()
export class Persona {
    id=0;
    cedula ='';
    nombreCompleto ='';
    foto ='';
    usuario ='';
    usuarioModifica ='';
    usuarioCreacion ='';
    activo = true;
    correo ='';
    dominio='gmail.com';
    telefono='';
}