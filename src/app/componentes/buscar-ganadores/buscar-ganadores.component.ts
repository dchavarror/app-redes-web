import { Component, OnInit } from '@angular/core';
import { Ganador } from 'src/app/domain/Ganador';
import { Response } from 'src/app/domain/Response';
import { GanadorService } from '../../servicios/ganador.service';
import { DialogGanadorComponent } from '../shared/dialog-ganador/dialog-ganador.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PersonaService } from '../../servicios/persona.service';
import { Persona } from 'src/app/domain/Persona';
import { MessageUtilsComponent } from '../shared/message-utils/message-utils.component';
import { MESSAGE_SERVICE, TYPE_ICON_SNACKBAR } from '../../../environments/enviroment.variables';

@Component({
  selector: 'app-buscar-ganadores',
  templateUrl: './buscar-ganadores.component.html',
  styleUrls: ['./buscar-ganadores.component.css'],
})
export class BuscarGanadoresComponent implements OnInit {
  displayedColumns: string[] = ['cedula', 'nombre', 'acciones'];
  nombre = '';
  cedula = '';
  response: Response;
  personas: Array<Persona>;
  clases: string = '';
  tablaMostrar = false;
  constructor(
    private servicePersona: PersonaService,
    public dialog: MatDialog,
    private personaService: PersonaService,
    private message:MessageUtilsComponent
  ) {
    this.response = new Response();
    this.personas = new Array<Persona>();
  }

  ngOnInit(): void {
    this.clases = 'content-one';
  }

  getPersonas() {
    if (this.validarCampos()) {
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
    } else {
      console.log('getPersonas');
      if (!this.validarCampos()) {
        this.servicePersona
          .getPersonas(this.cedula, this.nombre)
          .subscribe((resp) => {
            this.response = resp;
            this.personas = this.response.objectResponse;
            this.tablaMostrar = true;
            this.clases = 'content-two';
            console.log(' this.personas ', this.personas);
          });
      }
    }
  }

  validarCampos() {
    if (this.nombre == undefined || this.nombre == '') {
      return true;
    }
    if (this.cedula == undefined || this.cedula == '') {
      return true;
    }
    return false;
  }

  seleccionado(sele: any) {
    console.log('Sele ', sele);
    this.openDialog(sele);
  }

  openDialog(sele: any): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '60%';

    dialogConfig.data = sele;
    const dialogRef = this.dialog.open(DialogGanadorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result != undefined) {
        this.personaService.actualizarPersona(result).subscribe((resp) => {
          console.log('resp ', resp);
        });
      }
    });
  }
}
