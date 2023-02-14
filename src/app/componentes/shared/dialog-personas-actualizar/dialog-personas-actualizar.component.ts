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

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Componente que permite actualizar los datos de una persona, este se comporta como un dialog.
 */

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

  /**
     * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
     * Usado para inicializar propiedades y dependencias.
     */
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private message: MessageUtilsComponent,
    private personaService: PersonaService, public dialogRef: MatDialogRef<DialogPersonasActualizarComponent>, private utils: Utils) {
    this.persona = new Persona();
    this.response = new Response();
    this.fileDomain = new FileDomain();
  }

  /**
   * Método que se ejecuta cuando se hace llamada a la directiva del componente cuando se ha instanciado.
   */
  ngOnInit(): void {
    this.fileDomain.imageSource = this.utils.leerImage(this.data.foto);
  }

  /**
   * Método que se encarga de actualizar los datos de una persona.
   */
  actualizarPersona() {
    if (this.validar()) {
      this.persona.id = this.data.id;
      this.persona.nombreCompleto = this.data.nombre;
      this.persona.cedula = this.data.cedula;
      this.persona.foto = this.fileDomain.base64 != undefined && this.fileDomain.base64 != '' ? this.fileDomain.base64 : this.data.foto;
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

  /**
   * Método que valida los campos de entrada del formulario, de esta manera no se ejecuta un método
   * innecesariamente, y permite evitar anomalias. 
   */
  validar() {
    if (this.data.nombre == '' || this.data.cedula == '') {
      return false;
    }
    return true;
  }

  /**
   * Método que permite subir una imagen relacionada a un ganador.
   * Asigna la imagen al atributo que se pasara como dato (imagen) a la persona (ganador).
   */
  onFileSelected(event: any) {
    this.fileDomain = this.utils.onFileSelected(event);
  }

  /**
   * Método que lee los metadatos de la imagen y permite mostrarla de manera correcta al usuario.
   */
  verImagen() {
    this.utils.verImagen(this.fileDomain)
  }
}
