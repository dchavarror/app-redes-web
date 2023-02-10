import { Component, AfterViewInit, ViewChild, Inject, Output, EventEmitter } from '@angular/core';
import { TYPE_ICON_SNACKBAR, MESSAGE_SERVICE, TITULOS_MODALES, REDES, STATUS_SERVICE, TABS } from '../../../../environments/enviroment.variables';
import { MessageUtilsComponent } from '../../shared/message-utils/message-utils.component';
import { PersonaService } from '../../../servicios/persona.service';
import { PromocionService } from '../../../servicios/promocion.service';
import { Promocion } from '../../../domain/Promocion';
import { Response } from 'src/app/domain/Response';
import { DetalleService } from '../../../servicios/detalle.service';
import { Detalle } from '../../../domain/Detalle';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { environment } from '../../../../environments/environment.prod';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThisReceiver } from '@angular/compiler';
import { DialogMessageEliminarComponent } from '../../shared/dialog-message-eliminar/dialog-message-eliminar.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Utils } from '../../../utils/Utils';
import { GanadorService } from '../../../servicios/ganador.service';


@Component({
  selector: 'app-dialog-administracion-promociones',
  templateUrl: './dialog-administracion-promociones.component.html',
  styleUrls: ['./dialog-administracion-promociones.component.css']
})
export class DialogAdministracionPromocionesComponent implements AfterViewInit {

  codigo = '';
  promocion: Promocion
  response: Response
  detalles: Array<Detalle>
  displayedColumns: string[] = ['codigo', 'premio', 'eliminar', 'copyLink'];
  displayedColumnsPromociones: string[] = ['nombre', 'codigo', 'link', 'terminos'];
  datas = new MatTableDataSource<Detalle>();

  red: string = '';
  idPremio: string = '';
  name: string = TITULOS_MODALES.TITULO_AGREGAR_RED;
  indVisibilidadGuardar = true;
  detalle: Detalle = new Detalle();
  agregar = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private message: MessageUtilsComponent, private promocionSevice: PromocionService,
    private serviceGanadores: GanadorService, private utils: Utils, public dialog: MatDialog,
    private detalleService: DetalleService, @Inject(MAT_DIALOG_DATA) public data: Promocion,
    public dialogRef: MatDialogRef<DialogAdministracionPromocionesComponent>) {
    this.response = new Response();
    this.detalles = new Array<Detalle>();
  }

  ngAfterViewInit() {
    this.obtenerPromocionPorCodigo();
  }

  inicializarLista() {
    this.datas = new MatTableDataSource<Detalle>();
    this.datas.data = new Array<Detalle>();
    this.datas.paginator = this.paginator;
  }

  //Método encargado de obtener una promocion mediante el codigo y sus respectivos detalles
  obtenerPromocionPorCodigo() {
    this.inicializarLista();
    if (this.validarCampos()) {
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
    } else {
      if (!this.validarCampos()) {
        this.promocionSevice.getCodigo(this.data.codigo)
          .subscribe({
            next: (resp: any) => {
              this.response = resp;
              if (this.response.statusCode == STATUS_SERVICE.EXITOSO) {
                if (this.response.objectResponse != null) {
                  this.detalles = this.response.objectResponse;
                  this.data = this.detalles[0].promocion;
                  this.datas.data = this.detalles;
                } else {
                  this.obtenerPromocion();
                }
              } else {
                this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.WARN);
              }
            },
            error: (e) => {
              console.log('error ', e);
              this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
            }
          });
      }
    }
  }

  //Método que permite obtener una promoción mediante el código
  obtenerPromocion() {
    if (this.validarCampos()) {
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
    } else {
      if (!this.validarCampos()) {
        this.promocionSevice.getPromocion(this.data.codigo)
          .subscribe({
            next: (resp: any) => {
              this.response = resp;
              if (this.response.statusCode === STATUS_SERVICE.EXITOSO && this.response.objectResponse != null) {
                this.data = this.response.objectResponse != null ? this.response.objectResponse : this.data;
              } else {
                this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.WARN);
              }
            },
            error: (e) => {
              console.log('error ', e);
              this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
            }
          });
      }
      this.detalles
    }
  }

  actulizarPromocion() {
    if (this.validarCampos()) {
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
    } else {
      if (!this.validarCampos()) {
        this.promocionSevice.setPromocion(this.data.id, this.data)
          .subscribe({
            next: (resp: any) => {
              this.response = resp;
              this.detalles = this.response.objectResponse;
              this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.SUCCES);
              this.data.codigo = this.data.codigo;
              this.obtenerPromocionPorCodigo();
              if (this.response.statusCode == STATUS_SERVICE.CREACION) {
                this.dialogRef.close();
              }
            },
            error: (e) => {
              console.log('error ', e);
              this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
            }
          });
      }
    }
  }

  //Método que permite agregar un detalle nuevo a una promocion ya existente
  agregarDetallePromocion() {
    if (this.validarCampos()) {
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
    } else {
      if (!this.validarCampos()) {
        this.openDialog();
      }
    }
  }

  modificarDetalle(item: Detalle) {
    this.detalleService.setDetallePremio(item.id).subscribe({
      next: (resp: any) => {
        this.response = resp;
        if (this.response.statusCode == STATUS_SERVICE.CREACION || this.response.statusCode == STATUS_SERVICE.EXITOSO) {
          this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.SUCCES)
          this.obtenerPromocionPorCodigo();
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { name: this.name, red: this.red, premio: this.idPremio, indGuardar: true, idPromocion: this.data.id },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.obtenerPromocionPorCodigo()
    });
  }

  openDialogEliminarDetallePrmocion(item: Detalle): void {
    this.serviceGanadores.getValidarDetalleGanador(item.id).subscribe({
      next: (reps: any) => {
        this.response = reps;
        if (this.response.statusCode == STATUS_SERVICE.ACCEPTED) {
          this.message.mostrarMessage(MESSAGE_SERVICE.GANADOR_ACTIVO_VALIDACION, TYPE_ICON_SNACKBAR.WARN);
        } else {
          const dialogRef = this.dialog.open(DialogMessageEliminarComponent, {
            data: { idDetallePremio: item.id }
          });
          dialogRef.afterClosed().subscribe(result => {
            this.obtenerPromocionPorCodigo();
            console.log('The dialog was closed', result);
          });
        }
      },
      error: (e) => {
        console.log('error ', e);
        this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
      }
    });
  }

  validarCampos() {
    if (this.data.nombre == '' || this.data.codigo == '' || this.data.linkPublicacion == '' || this.data.terminos == '') {
      return true;
    }
    return false;
  }

  onClickCopyLink(item: Detalle) {
    this.utils.onCopyLink(item.link, item.vigencia.id);
  }

}