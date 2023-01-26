import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabNav, MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';


import { LoginComponent } from './componentes/login/login.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { HomeComponent } from './componentes/home/home.component';
import { PromocionesComponent } from './componentes/promociones/promociones.component';
import { GanadorComponent } from './componentes/ganador/ganador.component';
import { BuscarGanadoresComponent } from './componentes/buscar-ganadores/buscar-ganadores.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from './domain/Usuario';
import { AutenticacionSave } from './utils/AutenticacionSave';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SnackbarComponent } from './componentes/shared/snackbar/snackbar.component';
import { MessageUtilsComponent } from './componentes/shared/message-utils/message-utils.component';
import { PremioComponent } from './componentes/shared/premio/premio.component';
import { DialogComponent } from './componentes/shared/dialog/dialog.component';
import { DialogMessageComponent } from './componentes/shared/dialog-message/dialog-message.component';
import { DialogGanadorComponent } from './componentes/shared/dialog-ganador/dialog-ganador.component';
import { DocumentoComponent } from './componentes/documento/documento.component';
import { DialogCondicionesComponent } from './componentes/shared/dialog-condiciones/dialog-condiciones.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const materialModules = [
  CdkTreeModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatTreeModule,
  OverlayModule,
  PortalModule,
  MatBadgeModule,
  MatGridListModule,
  MatRadioModule,
  MatDatepickerModule,
  MatTooltipModule,
  MatDialogModule,
  MatIconModule,
  MatNativeDateModule
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PromocionesComponent,
    GanadorComponent,
    BuscarGanadoresComponent,
    SnackbarComponent,
    MessageUtilsComponent,
    PremioComponent,
    DialogComponent,
    DialogMessageComponent,
    DialogGanadorComponent,
    DocumentoComponent,
    DialogCondicionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    materialModules,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [AutenticacionSave, Usuario, MessageUtilsComponent, MatTabNav],
  bootstrap: [AppComponent],
  entryComponents:[
    SnackbarComponent
  ]
})
export class AppModule { }
