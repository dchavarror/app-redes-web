import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatAccordion } from '@angular/material/expansion';
import { AuthService } from '../../utils/AuthService';
import { TABS } from '../../../environments/enviroment.variables';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  background: ThemePalette = undefined;

  tabSeleccionado =TABS.PROMOCION;
  constructor(private serviceLogin: AuthService) { 
    this.accordion = new MatAccordion();
  }

  ngOnInit(): void {
  }

  logout(){
    this.serviceLogin.logout();
  }

  actualizarTab(event:any){
    this.tabSeleccionado = event;
  }

}
