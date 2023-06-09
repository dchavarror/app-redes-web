import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Response } from 'src/app/domain/Response';
import { DialogGanadorComponent } from '../shared/dialog-ganador/dialog-ganador.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PersonaService } from '../../servicios/persona.service';
import { Persona } from 'src/app/domain/Persona';
import { MessageUtilsComponent } from '../shared/message-utils/message-utils.component';
import { MESSAGE_SERVICE, TYPE_ICON_SNACKBAR } from '../../../environments/enviroment.variables';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Componente que permite buscar ganadores y ver los detalles (premios) asociados a un ganador.
 */

@Component({
  selector: 'app-buscar-ganadores',
  templateUrl: './buscar-ganadores.component.html',
  styleUrls: ['./buscar-ganadores.component.css'],
})
export class BuscarGanadoresComponent implements AfterViewInit {

  displayedColumns: string[] = ['cedula', 'nombre', 'acciones'];
  personas: Array<Persona>;

  nombre: string;
  cedula: string;
  response: Response;
  clases: string = '';
  tablaMostrar: boolean;

  datas = new MatTableDataSource<Persona>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    if (mp) {
      this.paginator = mp;
      this.datas = new MatTableDataSource<Persona>(this.personas);
      this.datas.paginator = this.paginator;
      this.cdRef.detectChanges();
    }
  }

  /**
   * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
   * Usado para inicializar propiedades y dependencias.
   */
  constructor(
    private servicePersona: PersonaService,
    public dialog: MatDialog,
    private personaService: PersonaService,
    private message: MessageUtilsComponent,
    private cdRef: ChangeDetectorRef
  ) {
    this.response = new Response();
    this.personas = new Array<Persona>();

    this.clases = 'content-one';
    this.tablaMostrar = false;
    this.cedula = '';
    this.nombre = '';
  }

  /**
   * Método que se ejecuta cuando se hace llamada a la directiva del componente cuando se ha instanciado.
   */
  ngAfterViewInit() {
    this.inicilizarListas();
  }

  /**
   * Método que permite crear nuevas instancias de los atributos cuando se es necesario dentro del componente.
   */
  inicilizarListas() {
    this.datas = new MatTableDataSource<Persona>();
    this.datas.data = new Array<Persona>();
    this.datas.paginator = this.paginator;
  }

  /**
   * Método que permite obtener una(s) persona(s) mediante el nombre o la cedula.
   */
  obtenerPersonas() {
    if (this.validarCampos()) {
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
    } else {
      console.log('getPersonas');
      if (!this.validarCampos()) {
        this.servicePersona
          .getPersonas(this.cedula, this.nombre)
          .subscribe({
            next: (resp: any) => {
              console.log('resp ', resp);
              this.response = resp;
              this.personas = this.response.objectResponse;
              this.datas.data = this.personas
              if (this.personas != undefined || this.personas != null) {
                this.tablaMostrar = true;
                this.clases = 'content-two';
              } else {
                this.tablaMostrar = false;
                this.clases = 'content-one';
                this.message.mostrarMessage(MESSAGE_SERVICE.NO_EXISTE_VALOR, TYPE_ICON_SNACKBAR.WARN)
              }
              console.log(' this.personas ', this.personas);
            },
            error: (e) => {
              console.log('error ', e);
              this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
            }
          });
      }
    }
  }

  /**
   * Método que valida los campos de entrada del formulario, de esta manera no se ejecuta un método
   * innecesariamente, y permite evitar anomalias. 
   */
  validarCampos() {
    if ((this.nombre != undefined && this.nombre != '') || (this.cedula != undefined && this.cedula != '')) {
      return false;
    }
    return true;
  }

  /**
   * Método que abre un dialog, este permite obtener el(los) detalles asociados a una persona.
   */
  openDialogDetalleDePersona(sele: Persona): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "auto";

    dialogConfig.data = sele;
    const dialogRef = this.dialog.open(DialogGanadorComponent, dialogConfig,);

    dialogRef.afterClosed().subscribe({
      next: (result: any) => {
        console.log('The dialog was closed', result);
      },
      error: (e) => {
        console.log('error ', e);
        this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
      }
    });
  }
}
