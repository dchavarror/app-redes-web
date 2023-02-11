import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../../../domain/DialogData';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Persona } from '../../../domain/Persona';
import { PersonaService } from '../../../servicios/persona.service';
import { Response } from '../../../domain/Response';
import { STATUS_SERVICE, MESSAGE_SERVICE, TYPE_ICON_SNACKBAR, MENSAJE_MODALES, TYPE_IMG } from '../../../../environments/enviroment.variables';
import { MessageUtilsComponent } from '../message-utils/message-utils.component';
import { Utils } from '../../../utils/Utils';
import { FileDomain } from '../../../domain/FileDomain';
import { Observable, Observer } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog-personas-actualizar',
  templateUrl: './dialog-personas-actualizar.component.html',
  styleUrls: ['./dialog-personas-actualizar.component.css']
})
export class DialogPersonasActualizarComponent implements OnInit {

  persona: Persona;
  response: Response;
  fileDomain: FileDomain;
  imageSource: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private message: MessageUtilsComponent,
    private personaService: PersonaService, public dialogRef: MatDialogRef<DialogPersonasActualizarComponent>, private utils: Utils) {
    this.persona = new Persona();
    this.response = new Response();
    this.fileDomain = new FileDomain();
  }

  ngOnInit(): void {
    this.fileDomain.imageSource = this.utils.leerImage(this.data.foto);
  }

  actualizarPersona() {
    if (this.validar()) {
      this.persona.id = this.data.id;
      this.persona.nombreCompleto = this.data.nombre;
      this.persona.cedula = this.data.cedula;
      this.persona.foto = this.fileDomain.base64;
      this.persona.usuario = this.data.usuario;
      this.persona.usuarioModifica = String(localStorage.getItem(this.data.usuarioModifica));
      this.personaService.actualizarPersona(this.persona).subscribe({
        next: (resp: any) => {
          this.response = resp;
          if (this.response.statusCode === STATUS_SERVICE.EXITOSO) {
            console.log("Si se actualizo");
            this.message.mostrarMessage(MESSAGE_SERVICE.ACTULIZADO_EXITO, TYPE_ICON_SNACKBAR.SUCCES);
            this.dialogRef.close();
          } else {
            this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.ERROR);
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

  validar() {
    if (this.data.nombre == '' || this.data.cedula == '') {
      return false;
    }
    return true;
  }

  onFileSelected(event: any) {
    this.fileDomain = this.utils.onFileSelected(event);
  }

  verImagen() {
    this.utils.verImagen(this.fileDomain)
  }
}
