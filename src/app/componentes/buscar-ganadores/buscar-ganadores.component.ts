import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/domain/Response';
import { DialogGanadorComponent } from '../shared/dialog-ganador/dialog-ganador.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PersonaService } from '../../servicios/persona.service';
import { Persona } from 'src/app/domain/Persona';
import { MessageUtilsComponent } from '../shared/message-utils/message-utils.component';
import { MESSAGE_SERVICE, TYPE_ICON_SNACKBAR } from '../../../environments/enviroment.variables';

@Component({
  selector: 'app-buscar-ganadores',
  templateUrl: './buscar-ganadores.component.html',
  styleUrls: ['./buscar-ganadores.component.css'],
})
export class BuscarGanadoresComponent implements OnInit {

  displayedColumns: string[] = ['cedula', 'nombre', 'acciones'];
  personas: Array<Persona>;

  nombre = '';
  cedula = '';
  response: Response;
  clases: string = '';
  tablaMostrar = false;
  
  constructor(
    private servicePersona: PersonaService,
    public dialog: MatDialog,
    private personaService: PersonaService,
    private message: MessageUtilsComponent
  ) {
    this.response = new Response();
    this.personas = new Array<Persona>();
  }

  ngOnInit(): void {
    this.clases = 'content-one';
  }

  //Método que permite obtener una(s) persona(s) mediante el nombre o la cedula
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
              this.response = resp;
              this.personas = this.response.objectResponse;
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

  validarCampos() {
    if ((this.nombre != undefined && this.nombre != '') || (this.cedula != undefined && this.cedula != '')) {
      return false;
    }
    return true;
  }

  //Método que abre un dialog, este permite obtener el(los) detalles asociados a una persona
  openDialogDetalleDePersona(sele: Persona): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    dialogConfig.height = '600px'

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
