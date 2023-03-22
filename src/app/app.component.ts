import { Component } from '@angular/core';
import { AuthService } from './utils/AuthService';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Clase principal de la app.
 * Muestra las vistas generales de la app.
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app-redes-web';
  constructor(private serviceAutenticacion :AuthService){
    this.serviceAutenticacion.isAutenticado();
  }
}
