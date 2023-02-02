import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../../../domain/DialogData';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Detalle } from '../../../domain/Detalle';
import { Response } from 'src/app/domain/Response';
import { DetalleService } from '../../../servicios/detalle.service';
import { STATUS_SERVICE, TYPE_ICON_SNACKBAR } from '../../../../environments/enviroment.variables';
import { MessageUtilsComponent } from '../message-utils/message-utils.component';

@Component({
  selector: 'app-dialog-message-eliminar',
  templateUrl: './dialog-message-eliminar.component.html',
  styleUrls: ['./dialog-message-eliminar.component.css']
})
export class DialogMessageEliminarComponent implements OnInit {

  item: Detalle = new Detalle();
  response: Response;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private detalleService: DetalleService, private message: MessageUtilsComponent) {
    this.response = new Response();
  }


  ngOnInit(): void {
  }

  confirmarEliminar() {
    console.log('data ' ,  this.item);
    this.detalleService.setDetallePremio(this.data.idDetallePremio).subscribe(resp => {
      this.response = resp;
      if (this.response.statusCode == STATUS_SERVICE.CREACION || this.response.statusCode == STATUS_SERVICE.EXITOSO) {
        this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.SUCCES)
      } else {
        this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.ERROR)
      }
    });
  }

}
