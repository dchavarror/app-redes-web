import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../servicios/documento.service';
import { DOCUMENTO, TITULOS_MODALES, MENSAJE_MODALES, MESSAGE_SERVICE, TYPE_ICON_SNACKBAR } from '../../../environments/enviroment.variables';
import { Response } from 'src/app/domain/Response';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../shared/dialog-message/dialog-message.component';
import { MessageUtilsComponent } from '../shared/message-utils/message-utils.component';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {

  codigoPromocional = ''
  response: Response;

  constructor(private serviceDocumento: DocumentoService, private dialog: MatDialog, private message: MessageUtilsComponent) {
    this.response = new Response();
  }

  ngOnInit(): void {
  }

  getDocumento() {
    if (!this.validar()) {
      this.serviceDocumento.getDocumento(this.codigoPromocional).subscribe(resp => {
        console.log('resp ', resp)
        this.response = resp;
        this.downloadPdf(this.response.objectResponse)
      })
    } else {
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
    }

  }

  downloadPdf(base64String: any) {
    const source = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64String}`;
    const link = document.createElement("a");

    link.href = source;
    link.download = DOCUMENTO.NOMBRE;
    link.click();
  }

  validar() {
    if (this.codigoPromocional == '') {
      return true;
    }
    return false;
  }

  openDialog(mensaje: string) {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      data: { titulo: TITULOS_MODALES.INFORMACION, contenido: mensaje },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

}
