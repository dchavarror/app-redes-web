import { Component, OnInit, Input, Inject } from '@angular/core';
import { FileDomain } from '../../../domain/FileDomain';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-imagen',
  templateUrl: './dialog-imagen.component.html',
  styleUrls: ['./dialog-imagen.component.css']
})
export class DialogImagenComponent implements OnInit {

  @Input() img: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FileDomain) { }

  ngOnInit(): void {
  }

}
