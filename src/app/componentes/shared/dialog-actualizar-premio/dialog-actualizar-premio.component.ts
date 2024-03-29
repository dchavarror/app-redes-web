import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../../domain/DialogData';
import { MessageUtilsComponent } from '../message-utils/message-utils.component';
import { Premio } from '../../../domain/Premio';
import { PremioService } from '../../../servicios/premio.service';
import { Response } from 'src/app/domain/Response';
import { STATUS_SERVICE, MESSAGE_SERVICE, TYPE_ICON_SNACKBAR, DATOS_TOKEN } from '../../../../environments/enviroment.variables';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Componente que permite actualizar un premio, este se comporta como un dialog.
 */

@Component({
  selector: 'app-dialog-actualizar-premio',
  templateUrl: './dialog-actualizar-premio.component.html',
  styleUrls: ['./dialog-actualizar-premio.component.css']
})
export class DialogActualizarPremioComponent implements OnInit {

  response: Response
  premio: Premio

  /**
   * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
   * Usado para inicializar propiedades y dependencias.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private message: MessageUtilsComponent, private servicePremio: PremioService, public dialogRef: MatDialogRef<DialogActualizarPremioComponent>) {
    this.response = new Response();
    this.premio = new Premio();
  }

  /**
   * Método que permite detectar cambios dentro de las propiedades de entrada del componente.
   */
  ngOnInit(): void {
  }

  /**
   * Método que permite actualizar un premio.
   */
  actualizarPremio() {
    if (this.valid()) {
      this.premio.id = this.data.idPremio;
      this.premio.descripcion = this.data.descripcion;
      let user = sessionStorage.getItem(DATOS_TOKEN.APP_USUARIO) != undefined ? sessionStorage.getItem(DATOS_TOKEN.APP_USUARIO)?.toString() : "";
      this.premio.usuarioCreacion = String(user);
      this.servicePremio.savePremio(this.premio).subscribe({
        next: (resp: any) => {
          this.response = resp;
          if (this.response.statusCode === STATUS_SERVICE.CREACION) {
            console.log("Si se actualizo");
            this.message.mostrarMessage(MESSAGE_SERVICE.ACTULIZADO_EXITO, TYPE_ICON_SNACKBAR.SUCCES);
            this.dialogRef.close();
          } else {
            this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.ERROR);
          }
        },
        error: (e) => {
          console.log('error ', e);
          this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
        }
      });
    } else {
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
    }

  }

  /**
   * Método que valida los campos de entrada del formulario, de esta manera no se ejecuta un método
   * innecesariamente, y permite evitar anomalias. 
   */
  valid() {
    if (this.data.descripcion == '' || this.data.descripcion == undefined) {
      return false;
    }
    return true;
  }

}
