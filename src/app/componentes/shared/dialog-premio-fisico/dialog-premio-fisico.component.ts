import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../../../domain/DialogData';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-premio-fisico',
  templateUrl: './dialog-premio-fisico.component.html',
  styleUrls: ['./dialog-premio-fisico.component.css']
})
export class DialogPremioFisicoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
