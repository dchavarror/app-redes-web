import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Ganador } from 'src/app/domain/Ganador';
import { Persona } from 'src/app/domain/Persona';
import { Response } from 'src/app/domain/Response';
import { GanadorService } from 'src/app/servicios/ganador.service';
import { STATUS_SERVICE, TITULOS_MODALES } from '../../../../environments/enviroment.variables';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { VigenciaService } from '../../../servicios/vigencia.service';
import { Utils } from '../../../utils/Utils';

@Component({
  selector: 'app-dialog-ganador',
  templateUrl: './dialog-ganador.component.html',
  styleUrls: ['./dialog-ganador.component.css']
})
export class DialogGanadorComponent implements OnInit {
  displayedColumns: string[] = ['red', 'premio', 'promocion', 'acciones'];

  ganadores: Array<Ganador>;
  response: Response;
  constructor(private clipboard: Clipboard,private utils: Utils, public dialog: MatDialog, public dialogRef: MatDialogRef<DialogGanadorComponent>, @Inject(MAT_DIALOG_DATA) public data: Persona, private serviceGanador: GanadorService, private serviceVigencia: VigenciaService) {
    this.ganadores = new Array<Ganador>();
    this.response = new Response();
  }

  ngOnInit(): void {
    this.getGanadores();
  }

  valid() {
    if (this.data.nombreCompleto == '') {
      return false;
    }
    if (this.data.cedula == '') {
      return false;
    }
    return true;
  }

  getGanadores() {
    this.serviceGanador.getGanadores(this.data.id).subscribe(resp => {
      this.response = resp;
      if (this.response.statusCode == STATUS_SERVICE.EXITOSO) {
        this.ganadores = this.response.objectResponse;
      } else {
        this.openDialog(this.response.message);
      }
    });
  }

  openDialog(mensaje: string) {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      data: { titulo: TITULOS_MODALES.INFORMACION, contenido: mensaje },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(this.response.statusCode);
      console.log("modal cerrado");
    });


  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCopyLink(sele: Ganador) {
    this.utils.onCopyLink(sele.detallePremio.link, sele.detallePremio.vigencia.id)
  }

}
