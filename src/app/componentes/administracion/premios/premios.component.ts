import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { Premio } from '../../../domain/Premio';
import { PremioService } from '../../../servicios/premio.service';
import { Response } from 'src/app/domain/Response';
import { MessageUtilsComponent } from '../../shared/message-utils/message-utils.component';
import { MESSAGE_SERVICE, MENSAJE_MODALES, TYPE_ICON_SNACKBAR, STATUS_SERVICE } from '../../../../environments/enviroment.variables';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogEliminarPremioComponent } from '../../shared/dialog-eliminar-premio/dialog-eliminar-premio.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogActualizarPremioComponent } from '../../shared/dialog-actualizar-premio/dialog-actualizar-premio.component';
import { DetalleService } from '../../../servicios/detalle.service';

@Component({
  selector: 'app-premios',
  templateUrl: './premios.component.html',
  styleUrls: ['./premios.component.css']
})
export class PremiosComponent implements AfterViewInit {

  premio: Premio;
  response: Response;
  descripcion: string;

  displayedColumns: string[] = ['descripcion', 'editar', 'eliminar'];
  premios: Array<Premio>;
  data = new MatTableDataSource<Premio>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private servicePremio: PremioService, private message: MessageUtilsComponent, private dialog: MatDialog, private detalleService: DetalleService) {
  }

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
    this.crearNuevasInstancias();
  }

  crearNuevasInstancias() {
    this.premio = new Premio();
    this.response = new Response();
    this.premios = new Array<Premio>();
    this.data = new MatTableDataSource<Premio>();
    this.allPremios();
  }

  //Método que permite guardar un nuevo premio
  guardarNuevoPremio() {
    if (this.valid()) {
      this.premio.descripcion = this.descripcion;
      let user = localStorage.getItem("usuario") != undefined ? localStorage.getItem("usuario")?.toString() : "";
      this.premio.usuarioCreacion = String(user);
      this.servicePremio.savePremio(this.premio).subscribe({
        next: (resp: any) => {
          this.response = resp;
          this.premio = this.response.objectResponse;
          if (this.response.statusCode == STATUS_SERVICE.CREACION) {
            this.message.mostrarMessage(MESSAGE_SERVICE.CREADO_PREMIO_EXITO, TYPE_ICON_SNACKBAR.SUCCES);
            this.allPremios();
          }

          this.descripcion = '';
        },
        error: (e) => {
          console.log('error ', e);
          this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
        }
      });
    } else {
      this.message.mostrarMessage(MENSAJE_MODALES.POR_FAVOR_VALIDAR_DATOS_INCOMPLETOS, TYPE_ICON_SNACKBAR.WARN);
    }
  }

  valid() {
    if (this.descripcion == undefined || this.descripcion == null || this.descripcion == '') {
      return false;
    }
    return true;
  }

  //Método que permite obtener el listado de premios existentes (activos)
  allPremios() {
    this.servicePremio.getPremio().subscribe({
      next: (resp: any) => {
        this.response = resp;
        this.premios = this.response.objectResponse;
        this.data.data = this.premios;
      },
      error: (e) => {
        this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
      }
    });
  }

  //Método que abre un dialog, este permite eliminar un premio
  eliminar(item: Premio) {
    this.detalleService.getPremioActivo(item.id).subscribe({
      next: (resp: any) => {
        this.response = resp;
        if (this.response.statusCode == STATUS_SERVICE.ACCEPTED) {
          this.message.mostrarMessage(MESSAGE_SERVICE.PREMIO_ACTIVO_VALIDACION, TYPE_ICON_SNACKBAR.WARN);
        } else {
          const dialogRef = this.dialog.open(DialogEliminarPremioComponent, {
            data: { idPremio: item.id },
          });
          dialogRef.afterClosed().subscribe({
            next: (result: any) => {
              this.crearNuevasInstancias();
            },
            error: (e) => {
              console.log('error ', e);
              this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
            }
          });
        }
      },
      error: (e) => {
        console.log('error ', e);
        this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
      }
    });
  }

  //Método que abre un dialog, este permite editar un premio
  editarPremio(item: Premio) {
    const dialogRef = this.dialog.open(DialogActualizarPremioComponent, {
      data: { descripcion: item.descripcion, idPremio: item.id },
    });
    dialogRef.afterClosed().subscribe({
      next: (result: any) => {
        this.crearNuevasInstancias();
      },
      error: (e) => {
        this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
      }
    });
  }

}
