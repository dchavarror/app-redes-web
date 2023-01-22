import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Response } from 'src/app/domain/Response';
import { DialogData } from '../../../domain/DialogData';
import { Premio } from '../../../domain/Premio';
import { PremioService } from '../../../servicios/premio.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent  {

  premios: Array<Premio> = new Array<Premio>();
  response: Response = new Response();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private premioService: PremioService
  ) {
    this.getPremios();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getPremios(){
    this.premioService.getPremio().subscribe(responsePremios =>{
      this.response = responsePremios;
      this.premios = this.response.objectResponse;
    })
  }

}
