import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../../../domain/DialogData';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-message-service',
  templateUrl: './dialog-message-service.component.html',
  styleUrls: ['./dialog-message-service.component.css']
})
export class DialogMessageServiceComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  cerrar() {
    location.reload();
  }

}
