import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../../domain/DialogData';
import { MessageUtilsComponent } from '../message-utils/message-utils.component';
import { Premio } from '../../../domain/Premio';
import { PremioService } from '../../../servicios/premio.service';
import { Response } from 'src/app/domain/Response';
import { STATUS_SERVICE, MESSAGE_SERVICE, TYPE_ICON_SNACKBAR } from '../../../../environments/enviroment.variables';

@Component({
  selector: 'app-dialog-actualizar-premio',
  templateUrl: './dialog-actualizar-premio.component.html',
  styleUrls: ['./dialog-actualizar-premio.component.css']
})
export class DialogActualizarPremioComponent implements OnInit {

  response: Response
  premio: Premio

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private message: MessageUtilsComponent, private servicePremio: PremioService,  public dialogRef: MatDialogRef<DialogActualizarPremioComponent>) {
    this.response = new Response();
    this.premio = new Premio();
  }

  ngOnInit(): void {
  }

  actualizarPremio() {
    if (this.valid()) {
      this.premio.id = this.data.idPremio;
      this.premio.descripcion = this.data.descripcion;
      let user = localStorage.getItem("usuario") != undefined ? localStorage.getItem("usuario")?.toString() : "";
      this.premio.usuarioCreacion = String(user);
      this.servicePremio.savePremio(this.premio).subscribe(resp => {
        this.response = resp;
        if (this.response.statusCode === STATUS_SERVICE.CREACION) {
          console.log("Si se actualizo");
          this.message.mostrarMessage(MESSAGE_SERVICE.ACTULIZADO_EXITO, TYPE_ICON_SNACKBAR.SUCCES);
          this.dialogRef.close();
        }else{
          this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.ERROR);
        }
      });
    }else{
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
    }

  }

  valid() {
    if (this.data.descripcion == '' || this.data.descripcion == undefined ) {
      return false;
    }
    return true;
  }

}
