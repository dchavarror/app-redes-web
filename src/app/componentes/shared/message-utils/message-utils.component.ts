import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-message-utils',
  templateUrl: './message-utils.component.html',
  styleUrls: ['./message-utils.component.css']
})
export class MessageUtilsComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  mostrarMessage(message: string, type: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: { message: message, snackType: type },
      panelClass: 'snackBar'
    });
  }

}
