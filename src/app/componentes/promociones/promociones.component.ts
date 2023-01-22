import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {
  promocionalesFormGroup = new FormGroup({
    npromocion: new FormControl('', Validators.required),
    cpromocion: new FormControl('', Validators.required),
    lpublicacion: new FormControl('', Validators.required),
    tcondiciones: new FormControl('', Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
