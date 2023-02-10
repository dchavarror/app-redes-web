import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Detalle } from '../../domain/Detalle';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TITULOS_MODALES, STATUS_SERVICE, TYPE_ICON_SNACKBAR, MESSAGE_SERVICE } from '../../../environments/enviroment.variables';
import { Promocion } from '../../domain/Promocion';
import { PromocionService } from '../../servicios/promocion.service';
import { Response } from 'src/app/domain/Response';
import { MessageUtilsComponent } from '../shared/message-utils/message-utils.component';
import { AdministradcionComponent } from '../administracion/administracion-promociones/administracion-promociones.component';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {

  @Output() evento = new EventEmitter<any>();
  @Output() eventoObtenerPromciones = new EventEmitter<any>();

  red: string = '';
  idPremio: string = '';
  name: string = TITULOS_MODALES.TITULO_AGREGAR_RED;
  promocion: Promocion = new Promocion();
  indVisibilidadGuardar = true;
  detalle: Detalle = new Detalle();
  response: Response = new Response();
  adminComponent: AdministradcionComponent;
  promocionalesFormGroup: any;
  lstDetalles: Array<Detalle> = new Array<Detalle>();

  constructor(public dialog: MatDialog, private promocionService: PromocionService,
    private message: MessageUtilsComponent, public dialogRef: MatDialogRef<PromocionesComponent>,) {

  }

  ngOnInit(): void {
    this.inicializarComponente();
  }

  inicializarComponente() {
    this.promocionalesFormGroup = new FormGroup({
      npromocion: new FormControl('', Validators.required),
      cpromocion: new FormControl('', Validators.required),
      lpublicacion: new FormControl('', Validators.required),
      tcondiciones: new FormControl('', Validators.required),
    });
    this.promocion = new Promocion();
    this.detalle = new Detalle();
    this.indVisibilidadGuardar = true;
    this.lstDetalles = new Array<Detalle>();
  }

  emitirEvento() {
    this.eventoObtenerPromciones.emit(true);
  }

  agregarDetallePromocion() {
    if (this.validarCampos()) {
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
    } else {
      console.log('promocion ', this.promocion);
      if (!this.validarPromocion()) {
        this.openDialogPromocion();
      }
    }
  }

  //Método que abre un dialog, este permite agregar un detalle a una promocion
  openDialogPromocion(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { name: this.name, red: this.red, premio: this.idPremio },
    });

    dialogRef.afterClosed().subscribe({
      next: (result: any) => {
        console.log('Informacion', result);
        if (result != undefined) {
          this.detalle = new Detalle();
          this.detalle.premio.id = result.premio;
          this.detalle.red = result.red;
          this.detalle.link = result.link;
          this.detalle.codigoPromocional = result.codigoPromocional;
          this.detalle.persona.usuario = result.usuario;
          this.lstDetalles.push(this.detalle);
          this.indVisibilidadGuardar = false;
          this.red = '';
        }
      },
      error: (e) => {
        console.log('error ', e);
        this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
      }
    });
  }

  validarPromocion() {
    if (this.promocion.codigo == undefined || this.promocion.codigo == '') {
      return true
    }
    if (this.promocion.nombre == undefined || this.promocion.nombre == '') {
      return true
    }
    if (this.promocion.linkPublicacion == undefined || this.promocion.linkPublicacion == '') {
      return true
    }
    if (this.promocion.terminos == undefined || this.promocion.terminos == '') {
      return true
    }

    return false;
  }


  //Método encargado de guardar una promocion
  onClickGuardarPromocion() {
    if (!this.validarCampos()) {
      this.promocion.lstDetalles = this.lstDetalles;
      this.promocion.activo = true;
      let user = localStorage.getItem("usuario") != undefined ? localStorage.getItem("usuario")?.toString() : "";
      this.promocion.usuarioCreacion = String(user);
      this.promocionService.guardarPromocion(this.promocion).subscribe({
        next: (resp: any) => {
          this.response = resp;
          console.log('this.response ', this.response);
          if (this.response.statusCode == STATUS_SERVICE.CREACION || this.response.statusCode == STATUS_SERVICE.EXITOSO) {
            this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.SUCCES);
            this.inicializarComponente();
            console.log('emit ADMINISTRACION');
            this.eventoObtenerPromciones.emit(true);
            this.dialogRef.close();
          } else {
            this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.WARN);
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

  validarCodigoPromocion() {
    this.promocionService.getValidarPromocion(this.promocion.codigo).subscribe({
      next: (resp: any) => {
        this.response = resp;
        if (this.response.statusCode === STATUS_SERVICE.RECET_CONTENT) {
          this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.WARN);
          this.promocion.codigo = '';
          return false;
        } else {
          return true;
        }
      },
      error: (e) => {
        console.log('error ', e);
        this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
      }
    });
    return true;
  }

  validarCampos() {
    if (this.promocion.nombre == undefined || this.promocion.nombre == '') {
      return true;
    }
    if (this.promocion.codigo == undefined || this.promocion.codigo == '') {
      return true;
    }
    if (this.promocion.linkPublicacion == undefined || this.promocion.linkPublicacion == '') {
      return true;
    }
    if (this.promocion.terminos == undefined || this.promocion.terminos == '') {
      return true;
    }
    return false;
  }

  eliminarPremio(e: any) {
    console.log('e ', e)
    for (let i = 0; this.lstDetalles.length; i++) {
      console.log('this.lstDetalles[i] ', e);
      if (this.lstDetalles[i].link == e.link) {
        this.lstDetalles.splice(i, 1);
        break;
      }
    }
  }

}
