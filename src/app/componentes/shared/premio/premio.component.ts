import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PremioService } from '../../../servicios/premio.service';
import { Premio } from '../../../domain/Premio';
import { Response } from 'src/app/domain/Response';
import { MatDialog } from '@angular/material/dialog';
import { Detalle } from '../../../domain/Detalle';
import { Clipboard } from '@angular/cdk/clipboard';
import { MESSAGE_SERVICE, TYPE_ICON_SNACKBAR } from '../../../../environments/enviroment.variables';
import { MessageUtilsComponent } from '../message-utils/message-utils.component';
import { Utils } from '../../../utils/Utils';

@Component({
  selector: 'app-premio',
  templateUrl: './premio.component.html',
  styleUrls: ['./premio.component.css']
})
export class PremioComponent implements OnInit {
  @Input() detalle: Detalle = new Detalle();
  @Output() eventEliminar = new EventEmitter<any>();

  premios: Array<Premio> = new Array<Premio>();
  response: Response = new Response();

  constructor(private message: MessageUtilsComponent, private premioService: PremioService, public dialog: MatDialog, private utils: Utils) {
    this.getPremios();
    console.log('premio constructor', this.detalle);

  }

  ngOnInit(): void {
    console.log('premio ngOnInit ', this.detalle);
  }

  cambiarIcono() {

  }

  getPremios() {
    this.premioService.getPremio().subscribe({
      next: (responsePremios: any) => {
        this.response = responsePremios;
        this.premios = this.response.objectResponse;
        this.detalle.premio.descripcion = this.getDescrionPremio(this.detalle.premio.id);
      },
      error: (e) => {
        console.log('error ', e);
        this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
      }
    });
  }

  getDescrionPremio(idPremio: number) {
    for (let i = 0; i < this.premios.length; i++) {
      if (this.premios[i].id == idPremio) {
        console.log('premio ', this.premios[i]);
        return this.premios[i].descripcion;
      }
    }

    return '';
  }

  agregraPremio() {

  }

  onCopyLink() {
    this.utils.onCopyLink(this.detalle.link, -1);
  }

  onGenerarEvento() {
    console.log('eliminar ', this.detalle);
    this.eventEliminar.emit(this.detalle);
  }
}
