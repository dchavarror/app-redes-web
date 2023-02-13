import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { AuthService } from '../../utils/AuthService';
import { TABS, ROLES } from '../../../environments/enviroment.variables';
import { Utils } from '../../utils/Utils';

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


  constructor(private serviceLogin: AuthService, private utils: Utils) {
    this.accordion = new MatAccordion();
    this.lstRoles = new Array<string>();
    this.roles = String(localStorage.getItem("roles"));

  }

  ngOnInit(): void {
    this.validarRoles();
    this.utils.evento.subscribe((data) => {
      this.tabSeleccionado = data;
    });
  }

  logout() {
    this.serviceLogin.logout();
  }

  actualizarTab(event: any) {
    this.tabSeleccionado = event;
    this.detectoCambio = !this.detectoCambio;
  }

  obtenerPromociones(event: any) {
    this.obtenerPromciones = event;
  }

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

  onClickTabSeleccionado(event: any) {
    this.tabSeleccionado = event;
  }

}
