import { Component, OnInit } from '@angular/core';
import { Utils } from '../../utils/Utils';
import { TABS } from '../../../environments/enviroment.variables';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Componente que muestra el header de la página.
 */

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /**
   * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
   * Usado para inicializar propiedades y dependencias.
   */
  constructor(private utils: Utils) { }

  /**
   * Método que se ejecuta cuando se hace llamada a la directiva del componente cuando se ha instanciado.
   */
  ngOnInit(): void {
  }

  /**
   * Método que emite un evento, este evento modifica la posicion del tab.
   */
  evento(){
      this.utils.enviarEvento(TABS.ADMINISTRACION);
  }
}
