import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../../../domain/DialogData';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from '../../../domain/Persona';
import { PersonaService } from '../../../servicios/persona.service';
import { Response } from '../../../domain/Response';
import { STATUS_SERVICE, MESSAGE_SERVICE, TYPE_ICON_SNACKBAR } from '../../../../environments/enviroment.variables';
import { MessageUtilsComponent } from '../message-utils/message-utils.component';

@Component({
  selector: 'app-dialog-personas-actualizar',
  templateUrl: './dialog-personas-actualizar.component.html',
  styleUrls: ['./dialog-personas-actualizar.component.css']
})
export class DialogPersonasActualizarComponent implements OnInit {

  persona: Persona;
  response: Response;
  fileName = '';
  base64 = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private message: MessageUtilsComponent,
    private personaService: PersonaService) {
    this.persona = new Persona();
    this.response = new Response();
  }

  ngOnInit(): void {
  }

  actualizar() {

    this.persona.id = this.data.id;
    this.persona.nombreCompleto = this.data.nombre;
    this.persona.cedula = this.data.cedula;
    this.persona.foto = this.base64 != undefined && this.base64 != null  && this.base64 != '' ? this.base64.substring(22)  :this.data.foto;
    this.persona.usuario = this.data.usuario;
    this.persona.usuarioModifica = String(localStorage.getItem(this.data.usuarioModifica));
    this.personaService.actualizarPersona(this.persona).subscribe((resp) => {
      this.response = resp;
      if (this.response.statusCode === STATUS_SERVICE.EXITOSO) {
        console.log("Si se actualizo");
        this.message.mostrarMessage(MESSAGE_SERVICE.ACTULIZADO_EXITO, TYPE_ICON_SNACKBAR.SUCCES);
      }
    });

  }

  onFileSelected(event: any) {
    console.log('event.target ', event.target);
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      console.log('FILE ', file);

      var reader = new FileReader();
      reader.onload = (e: any) => {
        console.log('Got here: ', e.target.result);
        this.base64 = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
