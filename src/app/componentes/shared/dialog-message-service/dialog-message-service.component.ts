import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../../../domain/DialogData';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Componente que permite mostrar información de errores que no se pueden controlar, este se comporta como un dialog.
 * Informacion como fallo de servicios.
 */

@Component({
  selector: 'app-dialog-message-service',
  templateUrl: './dialog-message-service.component.html',
  styleUrls: ['./dialog-message-service.component.css']
})
export class DialogMessageServiceComponent implements OnInit {

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
   * Método que se ejecuta cuando se cierra este componente (dialog).
   * Este recarga la pagina, evitando que el usuario pueda ingresar datos corruptos, ya que no se validan de ninguna manera y 
   * al momento de ejecutar alguna accion de pueden pasar de manera incorrecta.
   */
  cerrar() {
    location.reload();
  }

}
