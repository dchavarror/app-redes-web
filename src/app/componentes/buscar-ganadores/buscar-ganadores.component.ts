import { Component, OnInit } from '@angular/core';
import { Ganador } from 'src/app/domain/Ganador';
import { Response } from 'src/app/domain/Response';
import { GanadorService } from '../../servicios/ganador.service';
import { DialogGanadorComponent } from '../shared/dialog-ganador/dialog-ganador.component';
import { MatDialog } from '@angular/material/dialog';
import { PersonaService } from '../../servicios/persona.service';
import { Persona } from 'src/app/domain/Persona';

@Component({
  selector: 'app-buscar-ganadores',
  templateUrl: './buscar-ganadores.component.html',
  styleUrls: ['./buscar-ganadores.component.css']
})
export class BuscarGanadoresComponent implements OnInit {
  displayedColumns: string[] = ['cedula', 'nombre', 'acciones'];
  nombre ='';
  cedula ='';
  response: Response;
  personas : Array<Persona>;
  constructor(private servicePersona: PersonaService, public dialog: MatDialog, private personaService: PersonaService) { 
    this.response=new Response();
    this.personas = new Array<Persona>()
  }

  ngOnInit(): void {
  }

  getPersonas(){
    console.log('getPersonas');
    if(!this.validarCampos()){
      this.servicePersona.getPersonas(this.cedula, this.nombre).subscribe(resp=> {
        this.response=resp;
        this.personas =this.response.objectResponse;
        console.log(' this.personas ' ,  this.personas);
      })
    }
    
  }

  validarCampos(){
    if(this.nombre == undefined || this.nombre == '' ){
      return true;
    }
    if(this.cedula == undefined || this.cedula == '' ){
      return true;
    }
    return false;
  }

  seleccionado(sele:any){
   console.log('Sele ' , sele);
   this.openDialog(sele);
  }

  openDialog(sele:any): void {
    const dialogRef = this.dialog.open(DialogGanadorComponent, {
      data:sele,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' , result);
      if(result != undefined){
        this.personaService.actualizarPersona(result).subscribe(resp=>{
          console.log('resp ' , resp);
        })
      }
      
     
    });
  }

}
