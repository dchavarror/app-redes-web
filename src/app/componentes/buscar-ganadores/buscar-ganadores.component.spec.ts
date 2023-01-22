import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarGanadoresComponent } from './buscar-ganadores.component';

describe('BuscarGanadoresComponent', () => {
  let component: BuscarGanadoresComponent;
  let fixture: ComponentFixture<BuscarGanadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarGanadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarGanadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
