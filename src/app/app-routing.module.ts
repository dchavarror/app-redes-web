import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { AutenticacionSave } from './utils/AutenticacionSave';
import { HomeComponent } from './componentes/home/home.component';
import { GanadorComponent } from './componentes/ganador/ganador.component';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Archivo ts contiene la configuración de rutas de la app.
 */

/**
 * Constante que contiene la configuracion de las rutas de la app.
 */
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AutenticacionSave]},
  { path: ':codigoPromocion', component: GanadorComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
