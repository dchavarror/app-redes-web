import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DATOS_TOKEN } from '../environments/enviroment.variables';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercetato');
    let token = String(sessionStorage.getItem(DATOS_TOKEN.APP_TOKEN));
    if(token != undefined && token !=''){

    }
    request = request.clone({
      setHeaders: {
        token: token != undefined && token !='' ? token :'' 
      }
    });

    return next.handle(request);
  }
}