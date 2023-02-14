import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { MESSAGE_SERVICE, TYPE_ICON_SNACKBAR } from '../../../../environments/enviroment.variables';
import { PersonaService } from '../../../servicios/persona.service';
import { MessageUtilsComponent } from '../../shared/message-utils/message-utils.component';
import { Persona } from '../../../domain/Persona';
import { Response } from 'src/app/domain/Response';
import { MatDialog } from '@angular/material/dialog';
import { DialogPersonasActualizarComponent } from '../../shared/dialog-personas-actualizar/dialog-personas-actualizar.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Componente que permite administrar la información de una persona.
 * (obtener lista de personas asociadas a un filtro, actualizar una persona)
 */

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements AfterViewInit {

  displayedColumns: string[] = ['cedula', 'nombre', 'acciones'];
  nombre = '';
  cedula = '';
  response: Response;
  personas: Array<Persona>;
  tablaMostrar = false;
  clases: string;

  datas = new MatTableDataSource<Persona>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  /**
   * Detecta los cambios que le ocurren al paginador.
   * El paginador esta asociado a los datos (lista de personas).
   */
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
    private message: MessageUtilsComponent, private dialog: MatDialog, private cdRef: ChangeDetectorRef) {
    this.response = new Response();
    this.personas = new Array<Persona>();
  }

  /**
   * Método que se ejecuta cuando se hace llamada a la directiva del componente cuando se ha instanciado.
   */
  ngAfterViewInit(): void {
    this.datas.paginator = this.paginator;
    this.clases = 'content-one';
  }

  /**
   * Método que asigna el paginador de la lista al paginador de la pagina, para que la informacion coincida. 
   */
  asignarPaginador() {
    this.datas.paginator = this.paginator;
  }

  /**
   * Método que permite obtener una(s) persona(s) mediante la cedula o nombre.
   */
  obtenerPersonas() {
    if (!this.validarCampos()) {
      console.log("Nada")
      this.servicePersona
        .getPersonas(this.cedula, this.nombre)
        .subscribe({
          next: (resp: any) => {
            this.response = resp;
            this.personas = this.response.objectResponse;
            this.datas.data = this.personas
            if (this.personas != undefined || this.personas != null) {
              this.tablaMostrar = true;
              this.clases = 'content-two';
              this.asignarPaginador();
            } else {
              this.tablaMostrar = false;
              this.clases = 'content-one';
              this.message.mostrarMessage(MESSAGE_SERVICE.NO_EXISTE_VALOR, TYPE_ICON_SNACKBAR.WARN)
            }
          },
          error: (e) => {
            console.log('error ', e);
            this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
          }
        });
    } else {
      this.tablaMostrar = false;
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
    }
  }

  /**
   * Método que valida los campos de entrada del formulario, de esta manera no se ejecuta un método
   * innecesariamente, y permite evitar anomalias. 
   */
  validarCampos() {
    if (this.cedula == '' && this.nombre == '' || this.cedula == undefined && this.nombre == undefined) {
      return true;
    }
    return false;
  }

  /**
   * Método que abre un dialog, este permitira actualizar los datos de una persona.
   */
  actualizarPersonaDialog(persona: Persona) {
    const dialogRef = this.dialog.open(DialogPersonasActualizarComponent, {
      data: { id: persona.id, foto: persona.foto, nombre: persona.nombreCompleto, cedula: persona.cedula, usuario: persona.usuario, usuarioModifica: persona.usuarioModifica },
    });
    dialogRef.afterClosed().subscribe({
      next: (result: any) => {
        this.obtenerPersonas();
      },
      error: (e) => {
        console.log('error ', e);
        this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
      }
    });
  }

}
