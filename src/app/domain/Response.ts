import { Injectable } from "@angular/core";

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Clase que representa algunos de los datos del response de los servicios.
 */

@Injectable()
export class Response {
  statusCode=0;
  message= '';
  objectResponse: any;
}