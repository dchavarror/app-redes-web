import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Detalle } from '../../domain/Detalle';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TITULOS_MODALES, REDES, STATUS_SERVICE, TYPE_ICON_SNACKBAR, MESSAGE_SERVICE, TABS } from '../../../environments/enviroment.variables';
import { Promocion } from '../../domain/Promocion';
import { environment } from '../../../environments/environment';
import { PromocionService } from '../../servicios/promocion.service';
import { Response } from 'src/app/domain/Response';
import { MessageUtilsComponent } from '../shared/message-utils/message-utils.component';
import { DialogMessageComponent } from '../shared/dialog-message/dialog-message.component';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {
  @Output() evento = new EventEmitter<any>();

  red: string = '';
  idPremio: string = '';
  name: string = TITULOS_MODALES.TITULO_AGREGAR_RED;
  promocion: Promocion = new Promocion();
  indVisibilidadGuardar = true;
  detalle: Detalle = new Detalle();
  response: Response = new Response();

  promocionalesFormGroup: any;

  lstDetalles: Array<Detalle> = new Array<Detalle>();

  constructor(public dialog: MatDialog, private promocionService: PromocionService, private message: MessageUtilsComponent) {
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

  agregarDetallePromocion() {
    if (this.validarCampos()) {
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
    } else {
      console.log('promocion ', this.promocion);
      if (!this.validarPromocion()) {
        this.openDialog();
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { name: this.name, red: this.red, premio: this.idPremio },
    });

    dialogRef.afterClosed().subscribe({
      next: (result: any) => {
        console.log('The dialog was closed', result);
        if (result != undefined) {
          this.detalle = new Detalle();
          this.red = result;
          this.buscarRed(result.red);
          this.detalle.premio.id = result.premio;
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

  buscarRed(cadena: string) {

    let posicionUser = cadena.indexOf('.com/');
    let facebook = cadena.toUpperCase().indexOf(REDES.FACEBOOK);
    let instagram = cadena.toUpperCase().indexOf(REDES.INSTAGRAM);
    let tiktok = cadena.toUpperCase().indexOf(REDES.TIKTOK);
    let twitter = cadena.toUpperCase().indexOf(REDES.TWITTER);
    this.detalle.red = this.getRedAplica(facebook, instagram, tiktok, twitter);
    const date = new Date();
    let codigoPromocional = date.toISOString().substring(0, 10).replace('-', '').replace('-', '') + String(date.getHours()) + String(date.getMinutes()) + String(date.getSeconds()) + cadena.substring(posicionUser + 5, cadena.length);
    console.log('codigoPromocional ', codigoPromocional);
    this.detalle.codigoPromocional = codigoPromocional;
    this.detalle.link = environment.webUrl + codigoPromocional;
    this.detalle.persona.usuario = cadena.substring(posicionUser + 5, cadena.length);
  }

  getRedAplica(facebook: number, instagram: number, tiktok: number, twitter: number) {
    if (facebook != -1) {
      return REDES.FACEBOOK;
    }
    if (instagram != -1) {
      return REDES.INSTAGRAM;
    }
    if (tiktok != -1) {
      return REDES.TIKTOK;
    }
    if (twitter != -1) {
      return REDES.TWITTER;
    }
    return 'N/A';
  }

  onClickGuardar() {
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
            this.evento.emit(TABS.ADMINISTRACION);
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
