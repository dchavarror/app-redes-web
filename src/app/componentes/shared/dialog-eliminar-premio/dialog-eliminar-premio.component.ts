import { Component, OnInit, Inject } from '@angular/core';
import { PremioService } from '../../../servicios/premio.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../../domain/DialogData';
import { STATUS_SERVICE, TYPE_ICON_SNACKBAR, MESSAGE_SERVICE } from '../../../../environments/enviroment.variables';
import { MessageUtilsComponent } from '../message-utils/message-utils.component';
import { Response } from 'src/app/domain/Response';
import { DetalleService } from '../../../servicios/detalle.service';

@Component({
  selector: 'app-dialog-eliminar-premio',
  templateUrl: './dialog-eliminar-premio.component.html',
  styleUrls: ['./dialog-eliminar-premio.component.css']
})
export class DialogEliminarPremioComponent implements OnInit {
  response: Response;

  constructor(private premioService: PremioService, @Inject(MAT_DIALOG_DATA) public data: DialogData, private message: MessageUtilsComponent) {
    this.response = new Response();
  }

  ngOnInit(): void {
  }

  eliminarPremio() {
    this.premioService.putPremio(this.data.idPremio).subscribe({
      next: (resp: any) => {
        this.response = resp;
        if (this.response.statusCode == STATUS_SERVICE.CREACION || this.response.statusCode == STATUS_SERVICE.EXITOSO) {
          this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.SUCCES)
        } else {
          this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.ERROR)
        }
      },
      error: (e) => {
        console.log('error ', e);
        this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
      }
    });
  }

}
