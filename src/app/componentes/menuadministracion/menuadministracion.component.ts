import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menuadministracion',
  templateUrl: './menuadministracion.component.html',
  styleUrls: ['./menuadministracion.component.css']
})
export class MenuadministracionComponent implements OnInit {
  @Output() eventoEmit = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  emitirEvento(event:any){
    this.eventoEmit.emit(event);
  }

}
