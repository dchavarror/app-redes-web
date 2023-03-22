import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { AuthService } from '../../utils/AuthService';
import { TABS, ROLES } from '../../../environments/enviroment.variables';
import { Utils } from '../../utils/Utils';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Componente que contiene las vistas principales de la app.
 * (buscar ganadores, reporte, administración y cerrar sesión)
 */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  roles: string;
  tabSeleccionado: number;
  obtenerPromciones: boolean;
  lstRoles: string[];
  indAdmin = false;
  indConsulta = false;
  detectoCambio: boolean;

  /**
   * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
   * Usado para inicializar propiedades y dependencias.
   */
  constructor(private serviceLogin: AuthService, private utils: Utils) {
    this.accordion = new MatAccordion();
    this.lstRoles = new Array<string>();
    this.roles = String(localStorage.getItem("roles"));
    this.serviceLogin.isAutenticado();
  }

  /**
   * Método que se ejecuta cuando se hace llamada a la directiva del componente cuando se ha instanciado.
   */
  ngOnInit(): void {
    this.validarRoles();
    this.utils.evento.subscribe((data) => {
      this.tabSeleccionado = data;
    });
  }

  /**
   * Método que permite cerrar sesión en la app.
   */
  logout() {
    this.serviceLogin.logout();
  }

  /**
   * Método que actualiza la posicion en la cual se encuentra el tab.
   */
  actualizarTab(event: any) {
    this.tabSeleccionado = event;
    this.detectoCambio = !this.detectoCambio;
  }

  /**
   * Método que valida los roles y de esta manera se cargan los componentes.
   */
  validarRoles() {
    this.lstRoles = this.roles.split(',');
    for (let i = 0; i < this.lstRoles?.length; i++) {
      if (this.lstRoles[i] == ROLES.ROL_ADM) {
        this.indAdmin = true;
      } else if (this.lstRoles[i] == ROLES.ROL_CONS) {
        this.indConsulta = true;
      }
      console.log('this.lstRoles codigo ', this.lstRoles[i]);
    }

    if (this.indConsulta && !this.indAdmin) {
      this.tabSeleccionado = TABS.PROMOCION;
    } else if (this.indAdmin) {
      this.tabSeleccionado = TABS.ADMINISTRACION;
    }
  }

  /**
   * Método que mofica el tab seleccionado por defecto, esto para cambiar de componente cuando ocurra un evento.
   */
  onClickTabSeleccionado(event: any) {
    this.tabSeleccionado = event;
  }

}
