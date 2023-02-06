import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../domain/Usuario';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { MessageUtilsComponent } from '../shared/message-utils/message-utils.component';
import { MESSAGE_SERVICE, TYPE_ICON_SNACKBAR, STATUS_SERVICE } from '../../../environments/enviroment.variables';
import { Response } from 'src/app/domain/Response';
import { Router } from '@angular/router';
import { Rol } from '../../domain/Rol';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginFormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  usuario: Usuario;
  response: Response;
  lstRoles: Array<Rol>;

  constructor(private serviceUsuario:UsuarioService , private message: MessageUtilsComponent,  private router: Router) { 
    this.usuario = new Usuario();
    this.response = new Response();
    this.lstRoles = new Array<Rol>();
  }

  ngOnInit(): void {
  }

  autenticar(){
    if(!this.validarDatos()){
      this.usuario.nombre = String(this.loginFormGroup.get('username')?.value);
      this.usuario.password = String(this.loginFormGroup.get('password')?.value);
      this.serviceUsuario.validarUsuario(this.usuario).subscribe(data =>{
        console.log(data);
        this.response = data;
        if(this.response.statusCode === STATUS_SERVICE.CREACION || this.response.statusCode === STATUS_SERVICE.EXITOSO){
          localStorage.setItem('indLogeado', 'true');
          localStorage.setItem('usuario', this.usuario.nombre);
          this.lstRoles = this.response.objectResponse.lstRol;
          let roles='';
          for(let i=0;i<this.lstRoles.length;i++){
            if(i== this.lstRoles.length-1){
              roles += this.lstRoles[i].codigo;
            }else{
              roles += this.lstRoles[i].codigo + ',';
            }
            
          }
          localStorage.setItem('roles', roles);
          this.router.navigate( ['home']);
        }else{
          this.message.mostrarMessage(this.response.message, TYPE_ICON_SNACKBAR.ERROR);
        }
        
      });
      console.log('user ', this.loginFormGroup.get('username')?.value);
    }
    
  }

  validarDatos(){
    if(this.loginFormGroup.get('username')?.value ==undefined || this.loginFormGroup.get('username')?.value ==""){
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
      return true;
    }
    if(this.loginFormGroup.get('password')?.value ==undefined || this.loginFormGroup.get('password')?.value ==""){
      this.message.mostrarMessage(MESSAGE_SERVICE.DATOS_FALTANTES, TYPE_ICON_SNACKBAR.WARN);
      return true;
    }
    return false;
  }

}
