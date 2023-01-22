import { Injectable } from "@angular/core";

@Injectable()
export class Premio {
    id=0;
    codigo = '';
    descripcion='';
    usuarioCreacion='';
    fechaCreacion='';
    usuarioModifica='';
    fechaModifica='';
    activo=false;
}