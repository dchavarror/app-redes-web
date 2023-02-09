import { Component, OnInit } from '@angular/core';
import { MESSAGE_SERVICE, TYPE_ICON_SNACKBAR } from '../../../../environments/enviroment.variables';
import { PersonaService } from '../../../servicios/persona.service';
import { MessageUtilsComponent } from '../../shared/message-utils/message-utils.component';
import { Persona } from '../../../domain/Persona';
import { Response } from 'src/app/domain/Response';
import { MatDialog } from '@angular/material/dialog';
import { DialogPersonasActualizarComponent } from '../../shared/dialog-personas-actualizar/dialog-personas-actualizar.component';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  displayedColumns: string[] = ['cedula', 'nombre', 'acciones'];
  nombre = '';
  cedula = '';
  response: Response;
  personas: Array<Persona>;
  tablaMostrar = false;
  clases: string;

  constructor(
    private servicePersona: PersonaService,
    private message: MessageUtilsComponent, private dialog: MatDialog) {
    this.response = new Response();
    this.personas = new Array<Persona>();
  }

  ngOnInit(): void {
    this.clases = 'content-one';
  }

  //Método que permite obtener una(s) persona(s) mediante la cedula o nombre
  obtenerPersonas() {
    if (this.validarCampos()) {
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

  validarCampos() {
    if (this.cedula == '' && this.nombre == '') {
      return false;
    }
    return true
  }

  //Método que abre un dialog, este permitira actualizar una persona
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
