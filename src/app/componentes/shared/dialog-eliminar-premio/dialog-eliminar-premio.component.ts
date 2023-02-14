import { Component, OnInit, Inject } from '@angular/core';
import { PremioService } from '../../../servicios/premio.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../../domain/DialogData';
import { STATUS_SERVICE, TYPE_ICON_SNACKBAR, MESSAGE_SERVICE } from '../../../../environments/enviroment.variables';
import { MessageUtilsComponent } from '../message-utils/message-utils.component';
import { Response } from 'src/app/domain/Response';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Componente que permite eliminar un premio, este se comporta como un dialog.
 */

@Component({
  selector: 'app-dialog-eliminar-premio',
  templateUrl: './dialog-eliminar-premio.component.html',
  styleUrls: ['./dialog-eliminar-premio.component.css']
})
export class DialogEliminarPremioComponent implements OnInit {

  response: Response;

  /**
     * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
     * Usado para inicializar propiedades y dependencias.
     */
  constructor(private premioService: PremioService, @Inject(MAT_DIALOG_DATA) public data: DialogData, private message: MessageUtilsComponent, public dialogRef: MatDialogRef<DialogEliminarPremioComponent>) {

    this.response = new Response();
  }

  /**
   * Método que se ejecuta cuando se hace llamada a la directiva del componente cuando se ha instanciado.
   */
  ngOnInit(): void {
  }

  /**
   * Método que permite eliminar un premio.
   */
  eliminarPremio() {
    this.premioService.putPremio(this.data.idPremio).subscribe({
      next: (resp: any) => {
        this.response = resp;
        if (this.response.statusCode == STATUS_SERVICE.EXITOSO) {
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
