import { Injectable } from "@angular/core";

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
}