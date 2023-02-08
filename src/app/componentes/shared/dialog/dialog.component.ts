import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Response } from 'src/app/domain/Response';
import { DialogData } from '../../../domain/DialogData';
import { Premio } from '../../../domain/Premio';
import { PremioService } from '../../../servicios/premio.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Detalle } from '../../../domain/Detalle';
import { DetalleService } from '../../../servicios/detalle.service';
import { Utils } from 'src/app/utils/Utils';
import { STATUS_SERVICE, TYPE_ICON_SNACKBAR, MENSAJE_MODALES, MESSAGE_SERVICE } from '../../../../environments/enviroment.variables';
import { MessageUtilsComponent } from '../message-utils/message-utils.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  premios: Array<Premio> = new Array<Premio>();
  response: Response = new Response();
  ganadorFormGroup: any;
  detalle: Detalle = new Detalle();

  constructor(private message: MessageUtilsComponent,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private premioService: PremioService, private serviceDetalle: DetalleService, private utils: Utils
  ) {
  }

  ngOnInit(): void {
    this.getPremios();
    this.inicializarComponente();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getPremios() {
    this.premioService.getPremio().subscribe({
      next: (responsePremios: any) => {
        this.response = responsePremios;
        this.premios = this.response.objectResponse;
      },
      error: (e) => {
        console.log('error ', e);
        this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
      }
    });
  }

  inicializarComponente() {
    this.ganadorFormGroup = new FormGroup({
      fred: new FormControl('', Validators.required),
      fpremio: new FormControl('', Validators.required),
    });
  }

  guardarDetalle() {
    console.log('dddffggdd');
    if (this.validar()) {
      this.detalle = this.utils.buscarRed(this.data.red);
      if (!this.redValida(this.detalle.red)) {
        this.detalle.premio.id = Number(this.data.premio);
        this.detalle.promocion.id = this.data.idPromocion;
        let user = localStorage.getItem("usuario") != undefined ? localStorage.getItem("usuario")?.toString() : "";
        this.detalle.usuarioCreacion = String(user);
        this.serviceDetalle.postDetallePremio(this.detalle).subscribe({
          next: (resp: any) => {
            this.response = resp;
            if (this.response.statusCode == STATUS_SERVICE.CREACION) {
              this.dialogRef.close();
              this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.SUCCES);
            } else {
              this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.WARN);
            }
          },
          error: (e) => {
            console.log('error ', e);
            this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
          }
        });
      }
    } else {
      this.message.mostrarMessage(MENSAJE_MODALES.POR_FAVOR_VALIDAR_DATOS_INCOMPLETOS, TYPE_ICON_SNACKBAR.WARN);
    }

  }

  redValida(red: string) {
    if (red == 'NA') {
      return true;
    }
    return false;
  }

  onClickGuardar() {
    if (this.validar()) {
      this.detalle = this.utils.buscarRed(this.data.red);
      this.data.link= this.detalle.link;
      this.data.codigoPromocional = this.detalle.codigoPromocional;
      this.data.usuario = this.detalle.persona.usuario;
      if (!this.redValida(this.detalle.red)) {
        this.inicializarComponente();
        this.dialogRef.close(this.data);
      }
    } else {
      this.message.mostrarMessage(MENSAJE_MODALES.POR_FAVOR_VALIDAR_DATOS_INCOMPLETOS, TYPE_ICON_SNACKBAR.WARN);
    }

  }

  validar() {
    if (this.data.red == undefined || this.data.red == '') {
      return false;
    }
    if (this.data.premio == undefined || this.data.premio == '') {
      return false;
    }
    return true;
  }

}
