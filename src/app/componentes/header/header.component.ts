import { Component, OnInit } from '@angular/core';
import { Utils } from '../../utils/Utils';
import { TABS } from '../../../environments/enviroment.variables';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private utils: Utils) { }

  ngOnInit(): void {
  }

  evento(){
      this.utils.enviarEvento(TABS.ADMINISTRACION);
  }
}
