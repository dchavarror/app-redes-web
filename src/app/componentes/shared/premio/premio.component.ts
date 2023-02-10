import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PremioService } from '../../../servicios/premio.service';
import { Premio } from '../../../domain/Premio';
import { Response } from 'src/app/domain/Response';
import { MatDialog } from '@angular/material/dialog';
import { Detalle } from '../../../domain/Detalle';
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
    this.obtenerTodosPremios();
    console.log('premio constructor', this.detalle);

  }

  ngOnInit(): void {
    console.log('premio ngOnInit ', this.detalle);
  }

  cambiarIcono() {

  }

  //Método encargado de obtener el listado de premios que existe (activos)
  obtenerTodosPremios() {
    this.premioService.getPremio().subscribe({
      next: (responsePremios: any) => {
        this.response = responsePremios;
        this.premios = this.response.objectResponse;
        this.detalle.premio.descripcion = this.obtenerDescripcionPremio(this.detalle.premio.id);
      },
      error: (e) => {
        console.log('error ', e);
        this.message.mostrarMessage(MESSAGE_SERVICE.SIN_RESPONSE_SERVICE, TYPE_ICON_SNACKBAR.WARN);
      }
    });
  }

  //Método que permite obtener la descripcion de un premio en especifico
  obtenerDescripcionPremio(idPremio: number) {
    for (let i = 0; i < this.premios.length; i++) {
      if (this.premios[i].id == idPremio) {
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
    this.eventEliminar.emit(this.detalle);
  }
}
