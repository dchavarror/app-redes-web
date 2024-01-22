import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../../domain/DialogData';
import { TERMINOS } from '../../../../environments/enviroment.variables';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Componente que permite mostrar informacion de los terminos, condiciones y tratamientos, este se comporta como un dialog.
 * Dependiendo la entrada de la informacion de la data, sera la información que se muestre.
 */

@Component({
  selector: 'app-dialog-condiciones',
  templateUrl: './dialog-condiciones.component.html',
  styleUrls: ['./dialog-condiciones.component.css']
})
export class DialogCondicionesComponent implements OnInit {

  tratamiento = false;
  terminos = false;
  condiciones = false;
  felicidadesNuestroGana = false;

  /**
     * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
     * Usado para inicializar propiedades y dependencias.
     */
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  /**
   * Método que se ejecuta cuando se hace llamada a la directiva del componente cuando se ha instanciado.
   */
  ngOnInit(): void {
    if (this.data.codigoInvocacion == TERMINOS.CODIGO_TERMINOS) {
      this.terminos = true;
    }
    if (this.data.codigoInvocacion == TERMINOS.CODIGO_CONDICIONES) {
      this.condiciones = true;
    }
    if (this.data.codigoInvocacion == TERMINOS.CODIGO_TRATAMIENTOS) {
      this.tratamiento = true;
    }
    if (this.data.codigoInvocacion == TERMINOS.CODIGO_GANADORES) {
      this.felicidadesNuestroGana = true;
    }
  }

}
