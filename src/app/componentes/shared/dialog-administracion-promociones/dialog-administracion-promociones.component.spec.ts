import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdministracionPromocionesComponent } from './dialog-administracion-promociones.component';

describe('DialogAdministracionPromocionesComponent', () => {
  let component: DialogAdministracionPromocionesComponent;
  let fixture: ComponentFixture<DialogAdministracionPromocionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAdministracionPromocionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAdministracionPromocionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
