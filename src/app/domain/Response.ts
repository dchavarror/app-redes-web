import { Injectable } from "@angular/core";

@Injectable()
export class Response {
  statusCode=0;
  message= '';
  objectResponse: any;
}