import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatAccordion } from '@angular/material/expansion';
import { AuthService } from '../../utils/AuthService';
import { TABS, ROLES } from '../../../environments/enviroment.variables';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  background: ThemePalette = undefined;
  roles: string;
  tabSeleccionado: number;
  lstRoles: string[];
  indAdmin = false;
  indConsulta = false;

  constructor(private serviceLogin: AuthService) {
    this.accordion = new MatAccordion();
    this.lstRoles = new Array<string>();
    this.roles = String(localStorage.getItem("roles"));
    this.tabSeleccionado = TABS.ADMINISTRACION;
  }

  ngOnInit(): void {
    this.validarRoles();
  }

  logout() {
    this.serviceLogin.logout();
  }

  actualizarTab(event: any) {
    console.log('actualizarTab ', event);
    this.tabSeleccionado = event;
    console.log('this.tabSeleccionado ' , this.tabSeleccionado);
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
  }

  onClickTabSeleccionado(event: any){
    this.tabSeleccionado = event;
  }

}
