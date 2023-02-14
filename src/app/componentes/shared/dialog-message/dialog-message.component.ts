import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../../../domain/DialogData';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PAGINAS } from '../../../../environments/enviroment.variables';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Componente que permite mostrar informacion en el componente donde un ganador registra sus datos, este se comporta como un dialog.
 */

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css']
})
export class DialogMessageComponent implements OnInit {

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

  /**
   * Método que se ejecuta cuando este componente (dialog) se cierra.
   * Ejecuta una funcion la cual remplaza la pestaña con la app web de betplay.
   */
  cerrarDialog() {
    setTimeout(() => {
      window.location.replace(PAGINAS.URL_BETPLAY);
    }, 1000);
  }

}
