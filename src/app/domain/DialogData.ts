import { Injectable } from '@angular/core';
import { Persona } from './Persona';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Clase que permite trabajar con la data de diferentes componentes.
 * Esta clase permite pasar atributos de otras clases de modelo y asignarlos a esta clase.
 */

@Injectable()
export class DialogData {
    red='';
    premio='';
    link='';
    name='';
    titulo='';
    contenido='';
    codigoInvocacion='';
    indGuardar = false;
    idPromocion = 0;
    idDetallePremio =0;
    id=0;
    foto='';
    usuario='';
    usuarioModifica='';
    nombre:'';
    cedula: '';
    idPremio=0;
    descripcion='';
    codigoPromocional='';

  }