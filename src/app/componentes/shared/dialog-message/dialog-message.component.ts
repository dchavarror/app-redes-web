import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../../../domain/DialogData';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PAGINAS } from '../../../../environments/enviroment.variables';

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css']
})
export class DialogMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  cerrarDialog() {
    setTimeout(() => {
      window.location.replace(PAGINAS.URL_BETPLAY);
    }, 1000);
  }

}
