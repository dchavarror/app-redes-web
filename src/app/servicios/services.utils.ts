import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHeaderResponse } from '@angular/common/http';
import { concat, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * @author dchavarro & r
 * @version 1.0
 * 
 * Clase que contiene los métodos que consumen la API WS RestFull.
 * Cada método consume uno de los verbos que hacen parte del protocolo HTTP,
 * y así definir la operacion que se va a realizar.
 */

@Injectable({
  providedIn: 'root'
})
export class ServiceUtils {

  /**
   * Método constructor, este se invoca cuando se crea una instancia del componente (clase TS).
   * Usado para inicializar propiedades y dependencias.
   */
  constructor(private http: HttpClient) { }
  private getHeader(): HttpHeaders{
    const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });

    return headers;
  }

  /**
   * Método que permite crear un nuevo recurso.
   * Este trabaja con el verbo (POST(crear nuevos recursos)).
   */
  public post(endpoint: string, payload = {}): Observable<any> {
    const headers = this.getHeader();
    return this.http.post(environment.apiUrl  + endpoint, payload, { headers });
  }

  /**
   * Método que permite actualizar un recurso.
   * Este trabaja con el verbo (PUT(actualizar un recurso ya existente))
   */
  public put(endpoint: string, payload = {}): Observable<any> {
    const headers = this.getHeader();
    return this.http.put(environment.apiUrl  + endpoint, payload, { headers });
  }

  /**
   * Método que permite obtener un(os) recurso(s).
   * Este trabaja con el verbo (GET(obtener recurso(s)))
   */
  public get(endpoint: string, query: string): Observable<any> {
    const endpointFinal = endpoint + query;
    const headers = this.getHeader();
    return this.http.get(environment.apiUrl  + endpointFinal, { headers });
  }

}
