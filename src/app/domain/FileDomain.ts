import { Injectable } from "@angular/core";

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Clase que representa los metadatos de la imagen.
 */


@Injectable()
export class FileDomain {
    nombre = '';
    base64: any;
    imageSource: any;
}