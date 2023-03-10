import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Ganador } from 'src/app/domain/Ganador';
import { Persona } from 'src/app/domain/Persona';
import { Response } from 'src/app/domain/Response';
import { GanadorService } from 'src/app/servicios/ganador.service';
import { STATUS_SERVICE, TITULOS_MODALES, MESSAGE_SERVICE, TYPE_ICON_SNACKBAR } from '../../../../environments/enviroment.variables';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { VigenciaService } from '../../../servicios/vigencia.service';
import { Utils } from '../../../utils/Utils';
import { MessageUtilsComponent } from '../message-utils/message-utils.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Componente que permite ver los detalles (premios) asociados a un ganador, este se comporta como un dialog.
 */

@Component({
  selector: 'app-dialog-ganador',
  templateUrl: './dialog-ganador.component.html',
  styleUrls: ['./dialog-ganador.component.css']
})
export class DialogGanadorComponent implements AfterViewInit {

  displayedColumns: string[] = ['red', 'premio', 'promocion', 'acciones'];

  ganadores: Array<Ganador>;
  response: Response;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  datas = new MatTableDataSource<Ganador>();

  /**
     * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
     * Usado para inicializar propiedades y dependencias.
     */
  constructor(private message: MessageUtilsComponent, private clipboard: Clipboard, private utils: Utils, public dialog: MatDialog, public dialogRef: MatDialogRef<DialogGanadorComponent>, @Inject(MAT_DIALOG_DATA) public data: Persona, private serviceGanador: GanadorService, private serviceVigencia: VigenciaService) {
    this.ganadores = new Array<Ganador>();
    this.response = new Response();
  }

  /**
   * Método que se ejecuta cuando se hace llamada a la directiva del componente cuando se ha instanciado.
   */
  ngAfterViewInit() {
    this.obtenerGanadores();
  }

  /**
   * Método que permite crear nuevas instancias de los atributos cuando se es necesario dentro del componente.
   */
  inicializarListas() {
    this.datas = new MatTableDataSource<Ganador>();
    this.datas.data = new Array<Ganador>();
    this.datas.paginator = this.paginator;
  }

  /**
   * Método que valida los campos de entrada del formulario, de esta manera no se ejecuta un método
   * innecesariamente, y permite evitar anomalias. 
   */
  valid() {
    if (this.data.nombreCompleto == '') {
      return false;
    }
    if (this.data.cedula == '') {
      return false;
    }
    return true;
  }

  /**
   * Método encargado de obtener los ganadores.
   */
  obtenerGanadores() {
    this.inicializarListas();
    this.serviceGanador.getGanadores(this.data.id).subscribe({
      next: (resp: any) => {
        this.response = resp;
        if (this.response.statusCode == STATUS_SERVICE.EXITOSO) {
          this.ganadores = this.response.objectResponse;
          this.datas.data = this.ganadores
        } else {
          this.openDialogDetalles(this.response.message);
        }
      },
      error: (e) => {
        console.log('error ', e);
        this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
      }
    });
  }

  /**
   * Método que abre un dialog, este muestra posible información sobre el estado de un detalle(premio). 
   */
  openDialogDetalles(mensaje: string) {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      data: { titulo: TITULOS_MODALES.INFORMACION, contenido: mensaje },
    });

    dialogRef.afterClosed().subscribe({
      next: (resp: any) => {
        console.log("modal cerrado");
      },
      error: (e) => {
        this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
      }
    });


  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onCopyLink(sele: Ganador) {
    this.utils.onCopyLink(sele.detallePremio.link, sele.detallePremio.vigencia.id)
  }

}
