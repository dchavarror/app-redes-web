import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../../../domain/DialogData';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Detalle } from '../../../domain/Detalle';
import { Response } from 'src/app/domain/Response';
import { DetalleService } from '../../../servicios/detalle.service';
import { STATUS_SERVICE, TYPE_ICON_SNACKBAR, MESSAGE_SERVICE } from '../../../../environments/enviroment.variables';
import { MessageUtilsComponent } from '../message-utils/message-utils.component';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Componente que permite eliminar un premio, este se comporta como un dialog.
 */

@Component({
  selector: 'app-dialog-message-eliminar',
  templateUrl: './dialog-message-eliminar.component.html',
  styleUrls: ['./dialog-message-eliminar.component.css']
})
export class DialogMessageEliminarComponent implements OnInit {

  item: Detalle = new Detalle();
  response: Response;
  validar = false;

  /**
     * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
     * Usado para inicializar propiedades y dependencias.
     */
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private detalleService: DetalleService, private message: MessageUtilsComponent, public dialogRef: MatDialogRef<DialogMessageEliminarComponent>) {
    this.response = new Response();
  }

  /**
     * Método que se ejecuta cuando se hace llamada a la directiva del componente cuando se ha instanciado.
     */
  ngOnInit(): void {
  }

  /**
   * Método que permite elimar un premio.
   */
  confirmarEliminar() {
    this.detalleService.setDetallePremio(this.data.idDetallePremio).subscribe({
      next: (resp: any) => {
        this.response = resp;
        if (this.response.statusCode == STATUS_SERVICE.CREACION || this.response.statusCode == STATUS_SERVICE.EXITOSO) {
          this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.SUCCES)
          this.dialogRef.close();
        } else {
          this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.ERROR)
        }
      },
      error: (e) => {
        this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
      }
    });
  }

}
