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
import { PAGINAS, MESSAGE_SERVICE, TYPE_ICON_SNACKBAR, DATOS_TOKEN } from '../../../environments/enviroment.variables';
import { MessageUtilsComponent } from '../shared/message-utils/message-utils.component';
import { DialogPremioFisicoComponent } from '../shared/dialog-premio-fisico/dialog-premio-fisico.component';
import { AbstractControl, ValidatorFn, FormControl, Validators } from '@angular/forms';
import { FileDomain } from '../../domain/FileDomain';
import { Utils } from '../../utils/Utils';
import { DialogMessageServiceComponent } from '../shared/dialog-message-service/dialog-message-service.component';
import { DireccionService } from 'src/app/servicios/direccion.service';
import { Direccion } from 'src/app/domain/Direccion';
import { HttpClient } from '@angular/common/http';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Componente que contiene el formulario que se le muestra al ganador cuando va a reclamar un premio.
 */

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
  fileDomain: FileDomain;
  direccion: Direccion;
  dominios: any[] = [];
  indOcultoOtro = false;
  otroDominio ='';


  /**
   * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
   * Usado para inicializar propiedades y dependencias.
   */
  constructor(
    private detalleService: DetalleService,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog,
    private personaService: PersonaService,
    private ganadorService: GanadorService,
    private message: MessageUtilsComponent,
    private utils: Utils,
    private direccionService: DireccionService,
    private http: HttpClient
  ) {
    this.persona = new Persona();
    this.ganador = new Ganador();
    this.response = new Response();
    this.detalle = new Detalle();
    let codigo = this.activateRoute.snapshot.params['codigoPromocion'];
    this.getDetalleService(codigo);
    this.fileDomain = new FileDomain();
    this.direccion = new Direccion();
  }

  /**
   * Método que se ejecuta cuando se hace llamada a la directiva del componente cuando se ha instanciado.
   */
  ngOnInit(): void {
  }

  /**
   * Métodos que abren un dialogo el cual contiene información sobre los terminos, condiciones y tratamientos que debe aceptar el ganador.
   */
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

  /**
   * Método que abre un dialogo, este contiene información la cual puede variar.
   */
  openDialogGenerico(titulo: string, codigo: string) {
    const dialogRef = this.dialog.open(DialogCondicionesComponent, {
      data: {
        titulo: titulo,
        contenido: '',
        codigoInvocacion: codigo,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (result: any) => {
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
      },
      error: (e) => {
        console.log('error ', e);
        this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
      }
    });
  }

  /**
   * Método que abre un dialogo, este contiene información de posibles excepciones.
   */
  openDialog(mensaje: string) {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      data: { titulo: TITULOS_MODALES.INFORMACION, contenido: mensaje },
    });

    dialogRef.afterClosed().subscribe({
      next: (resp: any) => {
        console.log(this.response.statusCode);
        if (
          this.response.statusCode == STATUS_SERVICE.VENCIDO ||
          this.response.statusCode == STATUS_SERVICE.ACCEPTED
        ) {
          this.indMostrar = false;
        }
        window.location.replace(PAGINAS.URL_BETPLAY);
      },
      error: (e) => {
        console.log('error ', e);
        this.openDialogServiceMessage(e.message);
      }
    });
  }

  /**
   * Método que abre un dialog, este contiene información de posibles excepciones en los servicios o errores no controlados.
   */
  openDialogServiceMessage(mensaje: string) {
    const dialogRef = this.dialog.open(DialogMessageServiceComponent, {
      data: { titulo: TITULOS_MODALES.INFORMACION, contenido: mensaje },
    });

    dialogRef.afterClosed().subscribe({
      next: (resp: any) => {
        console.log(this.response.statusCode);
        if (
          this.response.statusCode == STATUS_SERVICE.VENCIDO ||
          this.response.statusCode == STATUS_SERVICE.ACCEPTED
        ) {
          this.indMostrar = false;
        }
        location.reload();
      },
      error: (e) => {
        console.log('error ', e);
        this.openDialogServiceMessage(e.message);
        location.reload();
      }
    });
  }

  /**
   * Método que permite obtener el detalle de un ganador.
   */
  getDetalleService(codigoPromocional: string) {
    this.detalleService.getDetallePremio(codigoPromocional).subscribe({
      next: (resp: any) => {
        this.response = resp;
        console.log('response ', this.response);
        if (this.response.statusCode == STATUS_SERVICE.VENCIDO) {
          this.openDialog(MENSAJE_MODALES.POR_FAVOR_VALIDAR_YA_SE_VENCIO_TIEMPO);
        }
        if (
          this.response.statusCode == STATUS_SERVICE.ACCEPTED) {
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
            this.fileDomain.imageSource = this.utils.leerImage(this.detalle.persona.foto);
          }
        } else if (this.response.statusCode != STATUS_SERVICE.VENCIDO && this.response.statusCode != STATUS_SERVICE.ACCEPTED) {
          this.openDialog(this.response.message);
        }
        console.log('ind ', this.indDisable);
      },
      error: (e) => {
        console.log('error ', e);
        this.openDialogServiceMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE_MESSAGE);
      }
    });
  }

  /**
   * Método que permite leer la imagen y de esta manera pueda ser mostrada al usuario.
   */
  verImagen() {
    this.utils.verImagen(this.fileDomain)
  }

  /**
   * Método que permite subir una imagen relacionada a un ganador.
   * Asigna la imagen al atributo que se pasara como dato (imagen) a un ganador.
   */
  onFileSelected(event: any) {
    this.fileDomain = this.utils.onFileSelected(event);
  }

  /**
   * Método el cual guarda la información de un ganador.
   */
  guardar() {
    if (!this.validarCampos()) {
      this.persona.id = this.detalle.persona.id;
      this.ganador.detallePremio.id = this.detalle.id;
      this.ganador.persona.id = this.detalle.persona.id;
      this.ganador.usuarioCreacion = String(sessionStorage.getItem(DATOS_TOKEN.APP_USUARIO));
      this.ganador.activo = true;
      this.persona.foto = this.fileDomain.base64 != undefined && this.fileDomain.base64 != '' ? this.fileDomain.base64 : this.detalle.persona.foto;
      this.persona.usuario = this.detalle.persona.usuario;
      this.persona.usuarioModifica = String(sessionStorage.getItem(DATOS_TOKEN.APP_USUARIO));
      this.persona.correo = this.persona.correo + (this.otroDominio !='' ? this.otroDominio : this.persona.dominio);
      this.personaService.actualizarPersona(this.persona).subscribe({
        next: (resp: any) => {
          this.response = resp;
          if (
            this.response.statusCode == STATUS_SERVICE.CREACION ||
            this.response.statusCode == STATUS_SERVICE.EXITOSO
          ) {
            this.ganadorService.guardarGanador(this.ganador).subscribe({
              next: (resp: any) => {
                this.response = resp;
                if (
                  this.response.statusCode == STATUS_SERVICE.CREACION ||
                  this.response.statusCode == STATUS_SERVICE.EXITOSO
                ) {
                  this.direccion.persona.id=this.detalle.persona.id;
                  this.direccion.usuarioCreacion = String(sessionStorage.getItem(DATOS_TOKEN.APP_USUARIO));
                  this.direccion.usuarioModifica = String(sessionStorage.getItem(DATOS_TOKEN.APP_USUARIO));
                  this.direccionService.guardarDireccion(this.direccion).subscribe({
                    next: (resp: any) => {
                      this.response = resp;
                      if (
                        this.response.statusCode == STATUS_SERVICE.CREACION ||
                        this.response.statusCode == STATUS_SERVICE.EXITOSO
                      ) {
                        this.persona = new Persona();
                        this.ganador = new Ganador();
                        this.direccion = new Direccion();
                        this.openDialog('Ganador guardado con exito!');
                      }else{
                        this.openDialog(this.response.message);
                      }
                    },
                    error: (e) => {
                      console.log('error ', e);
                      this.openDialogServiceMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE_MESSAGE);
                    }
                  })
                } else {
                  this.openDialog(this.response.message);
                }
              },
              error: (e) => {
                console.log('error ', e);
                this.openDialogServiceMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE_MESSAGE);
              }
            });
          } else {
            this.openDialog(this.response.message);
          }
        },
        error: (e) => {
          console.log('error ', e);
          this.openDialogServiceMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE_MESSAGE);
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
    if ((this.fileDomain.base64 == undefined || this.fileDomain.base64 == '') && (this.detalle.persona.foto == '' || this.detalle.persona.foto == undefined)) {
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
    if (
      this.direccion.descripcion == undefined ||
      this.direccion.descripcion == ''
    ) {
      return true;
    }
    if (
      this.direccion.adicionales == undefined ||
      this.direccion.adicionales == ''
    ) {
      return true;
    }
    if (
      this.direccion.ciudad == undefined ||
      this.direccion.ciudad == ''
    ) {
      return true;
    }
    if (
      this.persona.correo == undefined ||
      this.persona.correo == ''
    ) {
      return true;
    }
    return false;
  }

  /**
   * Método que abre un dialogo, este contiene información sobre la dirección de un ganador.
   */
  abrirDireccion() {
    const dialogRef = this.dialog.open(DialogPremioFisicoComponent, {
    });
    console.log("Agregar Dirección!!!")
  }

  onChangeDominio(valor:any){
    console.log('dominio', valor);
    if(valor.value =='otro'){
      this.indOcultoOtro = true;
    }else{
      this.indOcultoOtro = false;
      this.persona.dominio =valor.value;
      this.otroDominio ='';
    }
  }
}
