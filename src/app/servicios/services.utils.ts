import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHeaderResponse } from '@angular/common/http';
import { concat, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceUtils {
  constructor(private http: HttpClient) { }
  private getHeader(): HttpHeaders{
    const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });

    return headers;
  }
  public post(endpoint: string, payload = {}): Observable<any> {
    const headers = this.getHeader();
    return this.http.post(environment.apiUrl  + endpoint, payload, { headers });
  }

  public get(endpoint: string, query: string): Observable<any> {
    const endpointFinal = endpoint + query;
    const headers = this.getHeader();
    return this.http.get(environment.apiUrl  + endpointFinal, { headers });
  }

}
