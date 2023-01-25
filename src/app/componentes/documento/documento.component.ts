import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../servicios/documento.service';
import { DOCUMENTO } from '../../../environments/enviroment.variables';
import { Response } from 'src/app/domain/Response';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {

  codigoPromocional =''
  response:Response;

  constructor( private serviceDocumento: DocumentoService) { 
    this.response= new Response();
  }

  ngOnInit(): void {
  }

  getDocumento(){
    this.serviceDocumento.getDocumento(this.codigoPromocional).subscribe(resp=>{
      console.log('resp ' , resp)
      this.response = resp;
      this.downloadPdf(this.response.objectResponse)
    })
  }

  downloadPdf(base64String:any) {
    const source = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64String}`;
    const link = document.createElement("a");
    
    link.href = source;
    link.download = DOCUMENTO.NOMBRE;
    link.click();
  }

}
