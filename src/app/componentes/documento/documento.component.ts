import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../servicios/documento.service';
import { DOCUMENTO, MESSAGE_SERVICE, TYPE_ICON_SNACKBAR, STATUS_SERVICE } from '../../../environments/enviroment.variables';
import { Response } from 'src/app/domain/Response';
import { MatDialog } from '@angular/material/dialog';
import { MessageUtilsComponent } from '../shared/message-utils/message-utils.component';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Componente que permite generar el reporte una promoción.
 * Este contiene tola información de una promocion. 
 * (numero de identificacion de los ganadores, nombre de la promoción, 
 * red social de donde se gano esta promoción, premio ganado,
 * el link de la publicación que contiene la promoción, el link que se
 * le entraga al ganador y finalmente el usuario que reclamo el premio)
 */

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {

  codigoPromocional = ''
  response: Response;

  /**
   * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
   * Usado para inicializar propiedades y dependencias.
   */
  constructor(private serviceDocumento: DocumentoService, private dialog: MatDialog, private message: MessageUtilsComponent) {
    this.response = new Response();
  }

  /**
   * Método que se ejecuta cuando se hace llamada a la directiva del componente cuando se ha instanciado.
   */
  ngOnInit(): void {
  }

  /**
   * Método que permite generar el reporte (.xlsx)de un promoción.
   */
  generarReporte() {
    if (!this.validar()) {
      this.serviceDocumento.getDocumento(this.codigoPromocional).subscribe({
        next: (resp: any) => {
          console.log('resp ', resp)
          this.response = resp;
          if (this.response.statusCode == STATUS_SERVICE.EXITOSO) {
            this.downloadPdf(this.response.objectResponse)
          } else {
            this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.WARN);
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
   * Método que ejecuta la descarga del reporte de una promoción.
   */
  downloadPdf(base64String: any) {
    const source = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64String}`;
    const link = document.createElement("a");

    link.href = source;
    link.download = DOCUMENTO.NOMBRE;
    link.click();
  }

  /**
   * Método que valida los campos de entrada del formulario, de esta manera no se ejecuta un método
   * innecesariamente, y permite evitar anomalias. 
   */
  validar() {
    if (this.codigoPromocional == '') {
      return true;
    }
    return false;
  }

}
