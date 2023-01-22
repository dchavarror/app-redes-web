import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Detalle } from '../../domain/Detalle';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TITULOS_MODALES, REDES, STATUS_SERVICE, TYPE_ICON_SNACKBAR } from '../../../environments/enviroment.variables';
import { Promocion } from '../../domain/Promocion';
import { environment } from '../../../environments/environment';
import { PromocionService } from '../../servicios/promocion.service';
import { Response } from 'src/app/domain/Response';
import { MessageUtilsComponent } from '../shared/message-utils/message-utils.component';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {
  red: string='';
  idPremio: string='';
  name: string=TITULOS_MODALES.TITULO_AGREGAR_RED;
  promocion:Promocion = new Promocion();
  indVisibilidadGuardar = false;
  detalle: Detalle=  new Detalle();
  response: Response = new Response();

  promocionalesFormGroup:any;

  lstDetalles: Array<Detalle> = new Array<Detalle>();

  constructor(public dialog: MatDialog, private promocionService: PromocionService, private message: MessageUtilsComponent) { 
  }

  ngOnInit(): void {
    this.inicializarComponente();
  }

  inicializarComponente(){
    this.promocionalesFormGroup = new FormGroup({
      npromocion: new FormControl('', Validators.required),
      cpromocion: new FormControl('', Validators.required),
      lpublicacion: new FormControl('', Validators.required),
      tcondiciones: new FormControl('', Validators.required),
    });
    this.promocion= new Promocion();
    this.detalle =  new Detalle();
    this.indVisibilidadGuardar = true;
    this.lstDetalles =  new Array<Detalle>();
  }

  agregarDetallePromocion(){
    console.log('promocion ' , this.promocion);
    if(!this.validarPromocion()){
      this.openDialog();
    }
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {name: this.name, red: this.red, premio: this.idPremio},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' , result);
      if(result != undefined){
        this.detalle = new Detalle();
        this.red = result;
        this.buscarRed(result.red);
        this.detalle.premio.id = result.premio;
        this.lstDetalles.push(this.detalle);
        this.indVisibilidadGuardar = false;
      }
     
    });
  }

  validarPromocion(){
    if(this.promocion != undefined){
      if(this.promocion.codigo == undefined || this.promocion.codigo == ''){
        return true
      }
      if(this.promocion.nombre == undefined || this.promocion.nombre == ''){
        return true
      }
      if(this.promocion.linkPublicacion == undefined || this.promocion.linkPublicacion == ''){
        return true
      }
      if(this.promocion.terminos == undefined || this.promocion.terminos == ''){
        return true
      }
    }
    return false;
  }

  buscarRed(cadena:string){

    let posicionUser = cadena.indexOf('.com/');
    let facebook = cadena.toUpperCase().indexOf(REDES.FACEBOOK);
    let instagram = cadena.toUpperCase().indexOf(REDES.INSTAGRAM);
    let tiktok = cadena.toUpperCase().indexOf(REDES.TIKTOK);
    this.detalle.red  = this.getRedAplica(facebook, instagram, tiktok);
    const date = new Date();
    let codigoPromocional = date.toISOString().substring(0,10).replace('-','').replace('-','')+  String(date.getHours()) + String(date.getMinutes()) + String(date.getSeconds()) + cadena.substring(posicionUser+5, cadena.length);
    console.log('codigoPromocional ' , codigoPromocional);
    this.detalle.codigoPromocional = codigoPromocional;
    this.detalle.link = environment.webUrl + codigoPromocional;
    this.detalle.persona.usuario =cadena.substring(posicionUser+5, cadena.length);
  }

  getRedAplica(facebook: number, instagram: number,tiktok: number){
    if(facebook != -1){
      return REDES.FACEBOOK;
    }
    if(instagram != -1){
      return REDES.INSTAGRAM;
    }
    if(tiktok != -1){
      return REDES.TIKTOK;
    }
    return 'N/A';
  }

  onClickGuardar(){
    this.promocion.lstDetalles = this.lstDetalles;
    this.promocion.activo= true;
    let user = localStorage.getItem("usuario") != undefined ? localStorage.getItem("usuario")?.toString():"";
    this.promocion.usuarioCreacion = String(user);
    this.promocionService.guardarPromocion(this.promocion).subscribe(resp =>{
      this.response = resp;
      if(this.response.statusCode === STATUS_SERVICE.CREACION || this.response.statusCode === STATUS_SERVICE.EXITOSO){
        this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.SUCCES);
        this.inicializarComponente();
      }else{
        this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.ERROR);
      }
    })
   
  }

}
