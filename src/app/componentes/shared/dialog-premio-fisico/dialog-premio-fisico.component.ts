import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../../../domain/DialogData';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Componente que permite mostrar información de la direccion de envio de un premio si el 
 * ganador así lo desea, este se comporta como un dialog.
 */

@Component({
  selector: 'app-dialog-premio-fisico',
  templateUrl: './dialog-premio-fisico.component.html',
  styleUrls: ['./dialog-premio-fisico.component.css']
})
export class DialogPremioFisicoComponent implements OnInit {

  /**
     * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
     * Usado para inicializar propiedades y dependencias.
     */
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  /**
   * Método que se ejecuta cuando se hace llamada a la directiva del componente cuando se ha instanciado.
   */
  ngOnInit(): void {
  }

}
