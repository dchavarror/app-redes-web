import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../../domain/DialogData';
import { TERMINOS } from '../../../../environments/enviroment.variables';

@Component({
  selector: 'app-dialog-condiciones',
  templateUrl: './dialog-condiciones.component.html',
  styleUrls: ['./dialog-condiciones.component.css']
})
export class DialogCondicionesComponent implements OnInit {

  tratamiento = false;
  terminos = false;
  condiciones = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    if(this.data.codigoInvocacion == TERMINOS.CODIGO_TERMINOS){
      this.terminos = true;
    }
    if(this.data.codigoInvocacion == TERMINOS.CODIGO_CONDICIONES){
      this.condiciones = true;
    }
    if(this.data.codigoInvocacion == TERMINOS.CODIGO_TRATAMIENTOS){
      this.tratamiento = true;
    }
  }

}
