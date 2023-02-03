import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogActualizarPremioComponent } from './dialog-actualizar-premio.component';

describe('DialogActualizarPremioComponent', () => {
  let component: DialogActualizarPremioComponent;
  let fixture: ComponentFixture<DialogActualizarPremioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogActualizarPremioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogActualizarPremioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
