import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Componente que contiene los tabs (componentes) que hacen parte de administración.
 */

@Component({
  selector: 'app-menuadministracion',
  templateUrl: './menuadministracion.component.html',
  styleUrls: ['./menuadministracion.component.css']
})
export class MenuadministracionComponent implements OnInit {
  @Output() eventoEmit = new EventEmitter<any>();
  @Input('detectoCambio')  detectoCambio:boolean;

  /**
   * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
   * Usado para inicializar propiedades y dependencias.
   */
  constructor() { }

  /**
   * Método que se ejecuta cuando se hace llamada a la directiva del componente cuando se ha instanciado.
   */
  ngOnInit(): void {
  }

  /**
   * Método que emite un evento, este modifica el tab seleccionado por defecto.
   */
  emitirEvento(event:any){
    this.eventoEmit.emit(event);
  }

}
