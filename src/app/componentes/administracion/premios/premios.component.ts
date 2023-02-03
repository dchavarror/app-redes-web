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

  constructor(private servicePremio: PremioService, private message: MessageUtilsComponent, private dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
    this.crearNuevasInstancias();
  }

  crearNuevasInstancias() {
    this.premio = new Premio();
    this.response = new Response();
    this.premios = new Array<Premio>();
    this.allPremios();
  }

  guardarPremio() {
    if (this.valid()) {
      this.premio.descripcion = this.descripcion;
      let user = localStorage.getItem("usuario") != undefined ? localStorage.getItem("usuario")?.toString() : "";
      this.premio.usuarioCreacion = String(user);
      this.servicePremio.savePremio(this.premio).subscribe((resp) => {
        this.response = resp;
        this.premio = this.response.objectResponse;
        if (this.response.statusCode == STATUS_SERVICE.CREACION) {
          this.message.mostrarMessage(MESSAGE_SERVICE.CREADO_PREMIO_EXITO, TYPE_ICON_SNACKBAR.SUCCES);
          this.crearNuevasInstancias();
        }

        this.descripcion = '';
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

  allPremios() {
    this.servicePremio.getPremio().subscribe(resp => {
      this.response = resp;
      this.premios = this.response.objectResponse;
      this.data.data = this.premios;
    });
  }

  eliminar(item: Premio) {
    const dialogRef = this.dialog.open(DialogEliminarPremioComponent, {
      data: { idPremio: item.id },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.allPremios();
      console.log('The dialog was closed', result);
    });
  }

  editar(item: Premio) {
    const dialogRef = this.dialog.open(DialogActualizarPremioComponent, {
      data: { descripcion: item.descripcion, idPremio: item.id },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.allPremios();
      console.log('The dialog was closed', result);
    });
  }

}
