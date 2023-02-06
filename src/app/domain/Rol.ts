import { Injectable } from "@angular/core";

@Injectable()
export class Rol {
    id=0;
    codigo = '';
    nombre='';
    usuarioCreacion='';
    fechaCreacion='';
    usuarioModifica='';
    fechaModifica='';
    activo=true;
}