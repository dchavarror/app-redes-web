import { Component, OnInit, Input, Inject } from '@angular/core';
import { FileDomain } from '../../../domain/FileDomain';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Componente que permite ver la imagen, este se comporta como un dialog.
 */

@Component({
  selector: 'app-dialog-imagen',
  templateUrl: './dialog-imagen.component.html',
  styleUrls: ['./dialog-imagen.component.css']
})
export class DialogImagenComponent implements OnInit {

  @Input() img: any;

  /**
     * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
     * Usado para inicializar propiedades y dependencias.
     */
  constructor(@Inject(MAT_DIALOG_DATA) public data: FileDomain) { }

  /**
   * Método que se ejecuta cuando se hace llamada a la directiva del componente cuando se ha instanciado.
   */
  ngOnInit(): void {
  }

}
