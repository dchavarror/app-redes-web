import { Component, AfterViewInit, ViewChild, EventEmitter, Output } from '@angular/core';
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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ThisReceiver } from '@angular/compiler';
import { DialogMessageEliminarComponent } from '../../shared/dialog-message-eliminar/dialog-message-eliminar.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Utils } from '../../../utils/Utils';
import { GanadorService } from '../../../servicios/ganador.service';
import { DialogAdministracionPromocionesComponent } from '../../shared/dialog-administracion-promociones/dialog-administracion-promociones.component';

@Component({
  selector: 'app-administradcion',
  templateUrl: './administracion-promociones.component.html',
  styleUrls: ['./administracion-promociones.component.css']
})
export class AdministradcionComponent implements AfterViewInit {
  @Output() eventoEmit = new EventEmitter<any>();

  codigo = '';
  promocion: Promocion
  response: Response
  detalles: Array<Detalle>
  promociones: Array<Promocion>
  displayedColumns: string[] = ['codigo', 'premio', 'eliminar', 'copyLink'];
  displayedColumnsPromociones: string[] = ['nombre', 'codigo', 'link', 'terminos', 'administrar'];
  data = new MatTableDataSource<Detalle>();
  dataPromociones = new MatTableDataSource<Promocion>();

  red: string = '';
  idPremio: string = '';
  name: string = TITULOS_MODALES.TITULO_AGREGAR_RED;
  indVisibilidadGuardar = true;
  detalle: Detalle = new Detalle();
  agregar = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private message: MessageUtilsComponent, private promocionSevice: PromocionService, private serviceGanadores: GanadorService, private utils: Utils, public dialog: MatDialog, private detalleService: DetalleService) {
    this.promocion = new Promocion();
    this.response = new Response();
    this.detalles = new Array<Detalle>();
    this.promociones = new Array<Promocion>();
  }

  crearPromocion() {
    this.eventoEmit.emit(TABS.PROMOCION);
  }


  ngAfterViewInit() {
    this.data.paginator = this.paginator;
    this.dataPromociones.paginator = this.paginator;

    this.obtenerPromociones();
  }

  getCodigo() {
    if (this.validarCampos()) {
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
    } else {
      console.log('getPersonas');
      if (!this.validarCampos()) {
        this.promocionSevice.getCodigo(this.codigo)
          .subscribe({
            next: (resp: any) => {
              this.data = new MatTableDataSource<Detalle>();
              this.response = resp;
              if (this.response.statusCode == STATUS_SERVICE.EXITOSO) {
                if (this.response.objectResponse != null) {
                  this.detalles = this.response.objectResponse;
                  this.promocion = this.detalles[0].promocion;
                  this.data.data = this.detalles;
                } else {
                  this.getPromocion();
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
      this.detalles
    }
  }

  getPromocion() {
    if (this.validarCampos()) {
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
    } else {
      console.log('getPersonas');
      if (!this.validarCampos()) {
        this.promocionSevice.getPromocion(this.codigo)
          .subscribe({
            next: (resp: any) => {
              this.response = resp;
              if (this.response.statusCode === STATUS_SERVICE.EXITOSO && this.response.objectResponse != null) {
                this.promocion = this.response.objectResponse != null ? this.response.objectResponse : this.promocion;
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

  setPromocion() {
    if (this.validarCampos()) {
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
    } else {
      console.log('setPersonas');
      if (!this.validarCampos()) {
        this.promocionSevice.setPromocion(this.promocion.id, this.promocion)
          .subscribe({
            next: (resp: any) => {
              this.response = resp;
              this.detalles = this.response.objectResponse;
              this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.SUCCES);
              this.codigo = this.promocion.codigo;
              this.getCodigo();
            },
            error: (e) => {
              console.log('error ', e);
              this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
            }
          });
      }
    }
  }

  agregarDetallePromocion() {
    if (this.validarCampos()) {
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
    } else {
      console.log('promocion ', this.promocion);
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
          this.getCodigo();
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
      data: { name: this.name, red: this.red, premio: this.idPremio, indGuardar: true, idPromocion: this.promocion.id },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.getCodigo()
    });
  }

  openDialogEliminar(item: Detalle): void {
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
            this.data = new MatTableDataSource<Detalle>();
            this.getCodigo();
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

  obtenerPromociones() {
    this.promocionSevice.getPromociones().subscribe({
      next: (resp: any) => {
        this.response = resp;
        this.promociones = this.response.objectResponse;
        this.dataPromociones.data = this.promociones;
      },
      error: (e) => {
        console.log('error ', e);
        this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
      }
    });
  }

  validarCampos() {
    if (this.codigo == undefined || this.codigo == '') {
      return true;
    }
    return false;
  }

  onClickCopyLink() {
    this.utils.onCopyLink(this.detalles[0].link, this.detalles[0].vigencia.id);
    console.log("Si copio el link");
  }

  openDialogAdministrarPromocion(item: Promocion): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.height = '80%';

    dialogConfig.data = item;

    const dialogRef = this.dialog.open(DialogAdministracionPromocionesComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.obtenerPromociones();
    });
  }

}