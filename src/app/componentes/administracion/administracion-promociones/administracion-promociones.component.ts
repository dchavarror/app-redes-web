import { Component, AfterViewInit, ViewChild, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TYPE_ICON_SNACKBAR, MESSAGE_SERVICE, TITULOS_MODALES, REDES, STATUS_SERVICE, TABS } from '../../../../environments/enviroment.variables';
import { MessageUtilsComponent } from '../../shared/message-utils/message-utils.component';
import { PromocionService } from '../../../servicios/promocion.service';
import { Promocion } from '../../../domain/Promocion';
import { Response } from 'src/app/domain/Response';
import { Detalle } from '../../../domain/Detalle';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAdministracionPromocionesComponent } from '../../shared/dialog-administracion-promociones/dialog-administracion-promociones.component';
import { PromocionesComponent } from '../../promociones/promociones.component';

@Component({
  selector: 'app-administradcion',
  templateUrl: './administracion-promociones.component.html',
  styleUrls: ['./administracion-promociones.component.css']
})
export class AdministradcionComponent implements AfterViewInit, OnChanges {

  @Input('detectoCambio') detectoCambio: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  codigo = '';
  promocion: Promocion
  response: Response
  detalles: Array<Detalle>
  promociones: Array<Promocion>
  displayedColumns: string[] = ['codigo', 'premio', 'eliminar', 'copyLink'];
  displayedColumnsPromociones: string[] = ['nombre', 'codigo', 'terminos', 'administrar'];
  data = new MatTableDataSource<Detalle>();
  dataPromociones = new MatTableDataSource<Promocion>();
  red: string = '';
  detalle: Detalle = new Detalle();
  clasesDialogEditar: string;



  constructor(private message: MessageUtilsComponent, private promocionSevice: PromocionService,
    public dialog: MatDialog) {
    this.promocion = new Promocion();
    this.response = new Response();
    this.detalles = new Array<Detalle>();
    this.promociones = new Array<Promocion>();
    this.clasesDialogEditar = 'dialog-editar';
    console.log('constructor');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.data.paginator = this.paginator;
    this.dataPromociones.paginator = this.paginator;
    this.obtenerPromociones();
  }

  //Método encargado de redirir la vista al componente donde se crean las promociones
  crearPromocion() {
    this.obtenerPromociones();
    const dialogRef = this.dialog.open(PromocionesComponent, {
      panelClass: 'custom-dialog-container',
      width: '600px',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerPromociones();
    });
  }


  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.data.paginator = this.paginator;
    this.dataPromociones.paginator = this.paginator;
    this.obtenerPromociones();
  }

  inicializarAndAsignar() {
    this.data = new MatTableDataSource<Detalle>();
    this.data.data = new Array<Detalle>();
    this.dataPromociones = new MatTableDataSource<Promocion>();
    this.dataPromociones.data = new Array<Promocion>();
    this.data.paginator = this.paginator;
    this.dataPromociones.paginator = this.paginator;
  }

  //Método encargado de obtener una promocion mediante el codigo y sus respectivos detalles
  obtenerPromocionPorCodigo() {
    if (this.validarCampos()) {
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
    } else {
      if (!this.validarCampos()) {
        this.promocionSevice.getCodigo(this.codigo)
          .subscribe({
            next: (resp: any) => {
              this.inicializarAndAsignar();
              this.response = resp;
              if (this.response.statusCode == STATUS_SERVICE.EXITOSO) {
                if (this.response.objectResponse != null) {
                  this.detalles = this.response.objectResponse;
                  this.promocion = this.detalles[0].promocion;
                  this.data.data = this.detalles;
                  this.promociones = new Array<Promocion>();
                  this.promociones.push(this.promocion);
                  this.dataPromociones.data = this.promociones;
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
      this.detalles
    }
  }

  //Método que permite obtener una promoción mediante el código
  obtenerPromocion() {
    if (this.validarCampos()) {
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
    } else {
      if (!this.validarCampos()) {
        this.promocionSevice.getPromocion(this.codigo)
          .subscribe({
            next: (resp: any) => {
              this.response = resp;
              if (this.response.statusCode === STATUS_SERVICE.EXITOSO && this.response.objectResponse != null) {
                this.promocion = this.response.objectResponse != null ? this.response.objectResponse : this.promocion;
                this.promociones = new Array<Promocion>();
                this.promociones.push(this.promocion);
                this.dataPromociones.data = this.promociones;
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

  //Metodo encargado de obtener el listado de promociones
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

  //Metodo que abre un dialogo el cual permite administrar una promocion
  openDialogAdministrarPromocion(item: Promocion): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.height = '90%';

    dialogConfig.data = item;

    const dialogRef = this.dialog.open(DialogAdministracionPromocionesComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.obtenerPromociones();
    });
  }

}
