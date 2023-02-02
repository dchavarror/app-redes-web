import { Component, OnInit } from '@angular/core';
import { Persona } from '../../domain/Persona';
import { Ganador } from '../../domain/Ganador';
import { DetalleService } from '../../servicios/detalle.service';
import { Response } from 'src/app/domain/Response';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../shared/dialog-message/dialog-message.component';
import {
  TITULOS_MODALES,
  MENSAJE_MODALES,
  STATUS_SERVICE,
  TERMINOS,
} from '../../../environments/enviroment.variables';
import { Detalle } from '../../domain/Detalle';
import { PersonaService } from '../../servicios/persona.service';
import { GanadorService } from '../../servicios/ganador.service';
import { DialogCondicionesComponent } from '../shared/dialog-condiciones/dialog-condiciones.component';
import { PAGINAS, MESSAGE_SERVICE, TYPE_ICON_SNACKBAR} from '../../../environments/enviroment.variables';
import { MessageUtilsComponent } from '../shared/message-utils/message-utils.component';
import { DialogPremioFisicoComponent } from '../shared/dialog-premio-fisico/dialog-premio-fisico.component';

@Component({
  selector: 'app-ganador',
  templateUrl: './ganador.component.html',
  styleUrls: ['./ganador.component.css'],
})
export class GanadorComponent implements OnInit {
  persona: Persona;
  ganador: Ganador;
  detalle: Detalle;
  response: Response;
  indMostrar = true;
  indDisable = false;
  indDisablePersona = false;

  fileName = '';
  base64 = '';

  constructor(
    private detalleService: DetalleService,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog,
    private personaService: PersonaService,
    private ganadorService: GanadorService,
    private message: MessageUtilsComponent
  ) {
    this.persona = new Persona();
    this.ganador = new Ganador();
    this.response = new Response();
    this.detalle = new Detalle();
    let codigo = this.activateRoute.snapshot.params['codigoPromocion'];
    this.getDetalleService(codigo);
  }

  ngOnInit(): void { }

  openDialogTerminos() {
    this.ganador.aceptoTerminos = false;
    this.openDialogGenerico(TERMINOS.TITULO_TERMINOS, TERMINOS.CODIGO_TERMINOS);
  }
  openDialogCondiciones() {
    this.ganador.aceptacionPremio = false;
    this.openDialogGenerico(TERMINOS.TITULO_CONDICIONES, TERMINOS.CODIGO_CONDICIONES);
  }
  openDialogTratamiento() {
    this.ganador.tratamientoDatos = false;
    this.openDialogGenerico(TERMINOS.TITULO_TRATAMIENTOS, TERMINOS.CODIGO_TRATAMIENTOS);
  }

  openDialogGenerico(titulo: string, codigo: string) {
    const dialogRef = this.dialog.open(DialogCondicionesComponent, {
      data: {
        titulo: titulo,
        contenido: '',
        codigoInvocacion: codigo,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == TERMINOS.CODIGO_TERMINOS) {
          this.ganador.aceptoTerminos = true;
        }
        if (result == TERMINOS.CODIGO_CONDICIONES) {
          this.ganador.aceptacionPremio = true;
        }
        if (result == TERMINOS.CODIGO_TRATAMIENTOS) {
          this.ganador.tratamientoDatos = true;
        }
      }

      console.log('modal cerrado');
    });
  }

  openDialog(mensaje: string) {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      data: { titulo: TITULOS_MODALES.INFORMACION, contenido: mensaje },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(this.response.statusCode);
      if (
        this.response.statusCode == STATUS_SERVICE.VENCIDO ||
        this.response.statusCode == STATUS_SERVICE.ACCEPTED
      ) {
        this.indMostrar = false; 
      } 
      console.log('modal cerrado');
    });
  }

  getDetalleService(codigoPromocional: string) {
    this.detalleService.getDetallePremio(codigoPromocional).subscribe(
      (resp) => {
        this.response = resp;
        console.log('response ', this.response);
        if (this.response.statusCode == STATUS_SERVICE.VENCIDO) {
          this.openDialog(
            MENSAJE_MODALES.POR_FAVOR_VALIDAR_YA_SE_VENCIO_TIEMPO
          );
        }
        if (
          this.response.statusCode != STATUS_SERVICE.EXITOSO &&
          this.response.statusCode != STATUS_SERVICE.VENCIDO
        ) {
          this.indDisable = true;
          this.openDialog(this.response.message);
        }
        if (this.response.statusCode == STATUS_SERVICE.EXITOSO) {
          this.detalle = this.response.objectResponse;
          if (
            this.detalle.persona.cedula != undefined &&
            this.detalle.persona.cedula != ''
          ) {
            this.indDisablePersona = true;
            this.persona.nombreCompleto =
              this.detalle.persona.nombreCompleto.toUpperCase();
            this.persona.cedula = this.detalle.persona.cedula;
            this.base64 = 'YA EXISTE';
          }
        }
        console.log('ind ', this.indDisable);
      },
      (error) => {
        console.log('error ', error);
        this.openDialog(error.message);
      }
    );
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

  guardar() {
    if (!this.validarCampos()) {
      this.persona.id = this.detalle.persona.id;
      this.ganador.detallePremio.id = this.detalle.id;
      this.ganador.persona.id = this.detalle.persona.id;
      this.ganador.usuarioCreacion = String(localStorage.getItem('usuario'));
      this.ganador.activo = true;

      this.persona.foto = this.base64.substring(22);
      this.persona.usuario = this.detalle.persona.usuario;
      this.persona.usuarioModifica = String(localStorage.getItem('usuario'));
      console.log('Guardar persona ', this.persona);
      console.log('Guardar ganador ', this.ganador);
      console.log('doc', this.base64.indexOf(','));
      console.log('doc', this.base64.substring(22));
      this.personaService.actualizarPersona(this.persona).subscribe((resp) => {
        this.response = resp;
        if (
          this.response.statusCode == STATUS_SERVICE.CREACION ||
          this.response.statusCode == STATUS_SERVICE.EXITOSO
        ) {
          this.ganadorService.guardarGanador(this.ganador).subscribe((resp) => {
            this.response = resp;
            if (
              this.response.statusCode == STATUS_SERVICE.CREACION ||
              this.response.statusCode == STATUS_SERVICE.EXITOSO
            ) {
              this.persona = new Persona();
              this.ganador = new Ganador();
              window.location.replace(PAGINAS.URL_BETPLAY);
            }else{
              this.openDialog(this.response.message);
            }
          });
        } else {
          this.openDialog(this.response.message);
        }
      });
    } else {
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
    }
  }

  validarCampos() {
    if (this.persona.cedula == undefined || this.persona.cedula == '') {
      return true;
    }
    if (
      this.persona.nombreCompleto == undefined ||
      this.persona.nombreCompleto == ''
    ) {
      return true;
    }
    if (this.base64 == undefined || this.base64 == '') {
      return true;
    }
    if (
      this.ganador.aceptacionPremio == undefined ||
      this.ganador.aceptacionPremio == false
    ) {
      return true;
    }
    if (
      this.ganador.aceptoTerminos == undefined ||
      this.ganador.aceptoTerminos == false
    ) {
      return true;
    }
    if (
      this.ganador.tratamientoDatos == undefined ||
      this.ganador.tratamientoDatos == false
    ) {
      return true;
    }
    return false;
  }

  abrirDireccion(){
    const dialogRef = this.dialog.open(DialogPremioFisicoComponent, {
    });
    console.log("Agregar Dirección!!!")
  }
}
