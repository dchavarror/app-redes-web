import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ganador } from 'src/app/domain/Ganador';

@Component({
  selector: 'app-dialog-ganador',
  templateUrl: './dialog-ganador.component.html',
  styleUrls: ['./dialog-ganador.component.css']
})
export class DialogGanadorComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DialogGanadorComponent>, @Inject(MAT_DIALOG_DATA) public data: Ganador) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
