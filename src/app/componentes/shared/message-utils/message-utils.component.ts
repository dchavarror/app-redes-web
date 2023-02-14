import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Componente que se integra con SnackbarComponent para de esta manera mostrar los mensajes 
 * de validación o de para mostrar información (en este caso).
 */

@Component({
  selector: 'app-message-utils',
  templateUrl: './message-utils.component.html',
  styleUrls: ['./message-utils.component.css']
})
export class MessageUtilsComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  /**
     * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
     * Usado para inicializar propiedades y dependencias.
     */
  constructor(private snackBar: MatSnackBar) {
  }

  /**
   * Método que se ejecuta cuando se hace llamada a la directiva del componente cuando se ha instanciado.
   */
  ngOnInit(): void {
  }

  /**
   * Método que se encarga de mostrar los mensajes.
   */
  mostrarMessage(message: string, type: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: { message: message, snackType: type },
      panelClass: 'snackBar'
    });
  }

}
